# Nodes
_A drag-and-drop pipeline builder powered by React Flow, Tailwind CSS, and a FastAPI backend_

---

## 1 · What it is & why it matters
This repo is a **mini-clone** of VS's visual pipeline editor.  
It demonstrates four focus areas:

| # | Focus | What you’ll see |
|---|-------|-----------------|
| **1** | **Node Abstraction** | A single `BaseNode` component guarantees consistent layout & dark-mode glass styling. Creating a new node now takes ≈ 20 lines of code. |
| **2** | **Unified Styling** | Tailwind classes give every element the same purple-glass aesthetic, with instant dark ↔ light mode switching. |
| **3** | **Dynamic Text Node** | The Text node auto-resizes as you type and spawns / prunes handles when you add or remove `{{variables}}`. |
| **4** | **Backend Integration** | One click submits the current graph to FastAPI, which returns `{num_nodes, num_edges, is_dag}`. A glass-toast summarizes the result. |

---

## 2 · Project Structure

```

frontend/
├─ src/
│   ├─ nodes/          # all custom node definitions
│   │   ├─ BaseNode.jsx
│   │   ├─ InputNode.js
│   │   ├─ TextNode.js
│   │   ├─ Delay.jsx           ···
│   │   └─ (extra demo nodes)
│   ├─ store.js        # Zustand state (nodes, edges)
│   ├─ ui.js           # ReactFlow canvas + grid
│   ├─ toolbar.js      # draggable node palette
│   ├─ submit.js       # POST pipeline → backend
│   └─ App.js          # dark-mode toggle & layout
├─ tailwind.config.js
└─ index.css

backend/
├─ main.py             # FastAPI app with /pipelines/parse
└─ requirements.txt

````

---

## 3 · Quick Start

### 3.1 Prerequisites

| Tool | Version |
|------|---------|
| **Node.js** | ≥ 18 |
| **Python** | ≥ 3.9 |
| **npm** or **pnpm** | |

### 3.2 Install

cd backend
uvicorn main:app --reload   → http://localhost:8000


cd frontend
npm start          → http://localhost:3000


---

## 4 · Using the Editor

1. **Drag** nodes from the toolbar onto the canvas.
2. **Connect** handles (ports) by dragging arrows.
3. In a **Text** node:

   * Type `Hello {{name}}` – a new “name” handle appears.
   * Delete the braces – handle & arrow disappear.
4. Click **Submit Pipeline**.

   * Green toast shows counts & DAG status returned by FastAPI.
5. Hit the ⏻ button to toggle dark mode.

---


## 5 · Backend Details

* **Endpoint:** `POST /pipelines/parse`
* **Body:** `{ "nodes": [...], "edges": [...] }`
- Counts total nodes and edges from the pipeline.
- Uses Kahn’s algorithm to detect cycles and determine if the graph is a DAG.
* **Response:** `{ "num_nodes": 7, "num_edges": 6, "is_dag": true }`

---

> Made with 💜 by Ishaan.
