// store.js

import { createWithEqualityFn } from 'zustand/traditional';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

export const useStore = createWithEqualityFn((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},

  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },

  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

onConnect: ({ source, sourceHandle, target, targetHandle }) => {
  const edgeId = `${sourceHandle}-${targetHandle}`;
  set({
    edges: addEdge({
      id: edgeId,
      source,
      sourceHandle,
      target,
      targetHandle,
      type: "smoothstep",
      animated: true,
      style: { stroke: "#a855f7", strokeWidth: 1 },
      markerEnd: {
        type: "arrowclosed",
        width: 20,
        height: 20,
        color: "#a855f7",}
    }, get().edges),
  });
},

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }
        return node;
      }),
    });
  },
}));

if (typeof window !== "undefined") {
  window.store = useStore;
}
