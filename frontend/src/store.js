import { createWithEqualityFn } from 'zustand/traditional';
import {
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

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
    set({ nodes: [...get().nodes, node] });
  },

  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },

  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  setEdges: (newEdges) => {
    set({ edges: newEdges });
  },

  onConnect: ({ source, sourceHandle, target, targetHandle }) => {
    const edgeId = `${sourceHandle}-${targetHandle}`;

    const newEdge = {
      id: edgeId,
      source,
      sourceHandle,
      target,
      targetHandle,
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#a855f7', strokeWidth: 1 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: '#a855f7',
      },
    };

    const existingEdge = get().edges.find((e) => e.id === edgeId);

    if (!existingEdge) {
      set({ edges: [...get().edges, newEdge] });
    }
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              [fieldName]: fieldValue,
            },
          };
        }
        return node;
      }),
    });
  },
}));

if (typeof window !== 'undefined') {
  window.store = useStore;
}
