// /src/nodes/MathAdd.jsx
import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export function MathAdd({ id, data }) {
  const [a, setA] = useState(data?.a || 0);
  const [b, setB] = useState(data?.b || 0);

  const notifyChange = (newA, newB) => {
    data && data.onUpdate && data.onUpdate({ a: newA, b: newB });
  };

  const handleA = (e) => {
    const next = Number(e.target.value);
    setA(next);
    notifyChange(next, b);
  };
  const handleB = (e) => {
    const next = Number(e.target.value);
    setB(next);
    notifyChange(a, next);
  };

  const body = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <label>
        A:&nbsp;
        <input
          type="number"
          value={a}
          onChange={handleA}
          style={{ width: '60px' }}
        />
      </label>
      <label>
        B:&nbsp;
        <input
          type="number"
          value={b}
          onChange={handleB}
          style={{ width: '60px' }}
        />
      </label>
    </div>
  );

  return (
    <BaseNode
      id={id}
      title="Math"
      handles={{
        targets: [
          { id: 'inA', position: Position.Left,  y: '50%' },
          { id: 'inB', position: Position.Left,  y: '75%' },
        ],
        sources: [
          { id: 'sum', position: Position.Right, y: '50%' },
        ],
      }}
    >
      {body}
    </BaseNode>
  );
}
