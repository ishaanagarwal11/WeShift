// /frontend/src/nodes/outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const { updateNodeField } = useStore();
  const [name, setName]   = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [type, setType]   = useState(data?.outputType || 'Text');

  const onNameChange = (e) => {
    const v = e.target.value;
    setName(v);
    updateNodeField(id, 'outputName', v);
  };

  const onTypeChange = (e) => {
    const v = e.target.value;
    setType(v);
    updateNodeField(id, 'outputType', v);
  };

  const handles = {
    targets: [
      { id: `${id}-value`, position: Position.Left, y: '50%' },
    ],
    sources: [],
  };

  return (
    <BaseNode id={id} title="Output" handles={handles}>
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
          <option value="File">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};
