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
      { id: `${id}-system`,  position: Position.Left,  y: '60%' },
      { id: `${id}-prompt`,  position: Position.Left,  y: '80%' },
    ],
    sources: [
      { id: `${id}-response`, position: Position.Right, y: '60%' },
    ],
  };

  return (
    <BaseNode id={id} title="LLM" handles={handles}>
      <label className="flex flex-col text-xs font text-purple-900 dark:text-purple-100 mb-1">
        Model
        <select
          className="
            mt-1 px-2 py-1 rounded-md
            bg-white/70 dark:bg-white/20
            border border-purple-300/40 dark:border-purple-400/40
            text-purple-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-purple-400
            shadow-[0_0_6px_0_rgba(127,63,255,0.06)] dark:shadow-[0_0_6px_0_rgba(127,63,255,0.13)]
            transition
          "
          value={model}
          onChange={onModelChange}
        >
          <option value="gpt-3.5">GPT-o3</option>
          <option value="gpt-4">GPT-4.1-nano</option>
          <option value="gpt-3.5">Gemini-2.5-pro</option>
          <option value="gpt-4">Claude-3.7-sonnet</option>
        </select>
      </label>
      <p className="text-xs mt-1 italic text-purple-400 dark:text-purple-300 opacity-80">
        Two inputs (system &amp; prompt) → single response
      </p>
    </BaseNode>
  );
};
