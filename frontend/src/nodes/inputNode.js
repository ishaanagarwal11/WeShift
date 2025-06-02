// /frontend/src/nodes/inputNode.js


import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';          
import { useStore } from '../store';           

export const InputNode = ({ id, data }) => {
  const { updateNodeField } = useStore();
  const [name, setName]   = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [type, setType]   = useState(data?.inputType || 'Text');

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
      { id: `${id}-value`, position: Position.Right, y: '50%' },
    ],
  };

  return (
    <BaseNode id={id} title="Input" handles={handles}>
      <label className="node-field">
        Name
        <input
          className="node-input"
          type="text"
          value={name}
          onChange={onNameChange}
        />
      </label>

      <label className="node-field">
        Type
        <select className="node-input" value={type} onChange={onTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};
