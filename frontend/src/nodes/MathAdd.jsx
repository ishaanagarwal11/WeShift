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

  return (
    <BaseNode
      id={id}
      title="Math"
      handles={{
        targets: [
          { id: 'inA', position: Position.Left, y: '55%' },
          { id: 'inB', position: Position.Left, y: '75%' },
        ],
        sources: [
          { id: 'sum', position: Position.Right, y: '60%' },
        ],
      }}
    >
      <div className="flex flex-col gap-2">
        <label className="flex items-center text-xs font text-purple-900 dark:text-purple-100">
          A:&nbsp;
          <input
            type="number"
            value={a}
            onChange={handleA}
            className="
              ml-1 px-2 py-1 w-[60px]
              rounded-md
              bg-white/70 dark:bg-white/20
              border border-purple-300/40 dark:border-purple-400/40
              text-purple-900 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-purple-400
              shadow-[0_0_6px_0_rgba(127,63,255,0.09)] dark:shadow-[0_0_6px_0_rgba(127,63,255,0.18)]
              transition
              placeholder:text-purple-300 dark:placeholder:text-purple-200
            "
            placeholder="A"
          />
        </label>
        <label className="flex items-center text-xs font-semibold text-purple-900 dark:text-purple-100">
          B:&nbsp;
          <input
            type="number"
            value={b}
            onChange={handleB}
            className="
              ml-1 px-2 py-1 w-[60px]
              rounded-md
              bg-white/70 dark:bg-white/20
              border border-purple-300/40 dark:border-purple-400/40
              text-purple-900 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-purple-400
              shadow-[0_0_6px_0_rgba(127,63,255,0.09)] dark:shadow-[0_0_6px_0_rgba(127,63,255,0.18)]
              transition
              placeholder:text-purple-300 dark:placeholder:text-purple-200
            "
            placeholder="B"
          />
        </label>
      </div>
    </BaseNode>
  );
}
