// /src/nodes/Delay.jsx
import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export function Delay({ id, data, /* selected, xPos, yPos, isConnectable */ }) {
  const [ms, setMs] = useState(data?.ms || 1000);

  const notifyChange = (newMs) => {
    data && data.onUpdate && data.onUpdate({ ms: newMs });
  };

  const handleMs = (e) => {
    const next = Number(e.target.value);
    setMs(next);
    notifyChange(next);
  };

  const body = (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span>Delay:</span>
      <input
        type="number"
        value={ms}
        onChange={handleMs}
        style={{ width: '70px', marginLeft: '6px' }}
      />{' '}
      ms
    </div>
  );

  return (
    <BaseNode
      id={id}
      title="Delay"
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
