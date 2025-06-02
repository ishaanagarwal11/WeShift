// /src/nodes/Filter.jsx
import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export function Filter({ id, data /*, selected, xPos, yPos, isConnectable */ }) {
  const [keyword, setKeyword] = useState(data?.keyword || '');

  const notifyChange = (newKw) => {
    data && data.onUpdate && data.onUpdate({ keyword: newKw });
  };

  const handleChange = (e) => {
    const next = e.target.value;
    setKeyword(next);
    notifyChange(next);
  };

  const body = (
    <div>
      <span>Keep if contains:</span>
      <input
        type="text"
        value={keyword}
        onChange={handleChange}
        placeholder="e.g. apple"
        style={{ width: '100%', marginTop: '4px' }}
      />
    </div>
  );

  return (
    <BaseNode
      id={id}
      title="Filter"
      handles={{
        targets: [
          { id: 'in',  position: Position.Left,  y: '50%' },
        ],
        sources: [
          { id: 'out', position: Position.Right, y: '50%' },
        ],
      }}
    >
      {body}
    </BaseNode>
  );
}
