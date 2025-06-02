// /frontend/src/nodes/llmNode.js


import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const LLMNode = ({ id, data }) => {
  const { updateNodeField } = useStore();
  const [model, setModel] = useState(data?.model || 'gpt-3.5');

  const onModelChange = (e) => {
    const v = e.target.value;
    setModel(v);
    updateNodeField(id, 'model', v);
  };

  const handles = {
    targets: [
      { id: `${id}-system`,  position: Position.Left,  y: '33%' },
      { id: `${id}-prompt`,  position: Position.Left,  y: '66%' },
    ],
    sources: [
      { id: `${id}-response`, position: Position.Right, y: '50%' },
    ],
  };

  return (
    <BaseNode id={id} title="LLM" handles={handles}>
      <label className="node-field">
        Model
        <select className="node-input" value={model} onChange={onModelChange}>
          <option value="gpt-3.5">GPT-3.5-Turbo</option>
          <option value="gpt-4">GPT-4</option>
        </select>
      </label>
      <p className="node-hint">
        Two inputs (system &amp; prompt) → single response
      </p>
    </BaseNode>
  );
};
