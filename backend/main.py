from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from collections import defaultdict, deque

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str


class Edge(BaseModel):
    source: str
    target: str


class PipelineData(BaseModel):
    nodes: List[Node]
    edges: List[Edge]


@app.get("/")
def read_root() -> dict:
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(data: PipelineData) -> dict:
    """Return node/edge counts and whether the graph is a DAG."""
    num_nodes = len(data.nodes)
    num_edges = len(data.edges)

    # Build adjacency list and in-degree table
    adjacency = defaultdict(list)
    in_degree = {node.id: 0 for node in data.nodes}

    for edge in data.edges:
        adjacency[edge.source].append(edge.target)
        in_degree[edge.target] += 1

    # Kahn’s algorithm for DAG detection
    queue = deque([nid for nid, deg in in_degree.items() if deg == 0])
    visited = 0

    while queue:
        current = queue.popleft()
        visited += 1
        for neighbor in adjacency[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    is_dag = visited == num_nodes

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag,
    }
