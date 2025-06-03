import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const { updateNodeField } = useStore();
  const [name, setName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [type, setType] = useState(data?.inputType || 'Text');

  const onNameChange = (e) => {
    const v = e.target.value;
    setName(v);
    updateNodeField(id, 'inputName', v);
  };

  const onTypeChange = (e) => {
    const v = e.target.value;
    setType(v);
    updateNodeField(id, 'inputType', v);
  };

  const handles = {
    targets: [],
    sources: [
      { id: `${id}-value`, position: Position.Right, y: '55%' },
    ],
  };

  return (
    <BaseNode id={id} title="Input" handles={handles}>
      <label className="flex flex-col text-xs font-semibold mb-2 text-purple-900 dark:text-purple-100">
        Name
        <input
          className="
            mt-1 px-2 py-1 rounded-md
            bg-white/70 dark:bg-white/20
            border border-purple-300/40 dark:border-purple-400/40
            text-purple-900 dark:text-white
            placeholder:text-purple-300 dark:placeholder:text-purple-200
            focus:outline-none focus:ring-2 focus:ring-purple-400
            shadow-[0_0_6px_0_rgba(127,63,255,0.10)] dark:shadow-[0_0_6px_0_rgba(127,63,255,0.18)]
            transition
          "
          type="text"
          value={name}
          onChange={onNameChange}
          placeholder="Input name"
        />
      </label>
      <label className="flex flex-col text-xs font-semibold text-purple-900 dark:text-purple-100">
        Type
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
          value={type}
          onChange={onTypeChange}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};
