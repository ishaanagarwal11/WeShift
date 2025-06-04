import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export function Delay({ id, data }) {
  const [ms, setMs] = useState(data?.ms || 100);

  const notifyChange = (newMs) => {
    data && data.onUpdate && data.onUpdate({ ms: newMs });
  };

  const handleMs = (e) => {
    const next = Number(e.target.value);
    setMs(next);
    notifyChange(next);
  };

  return (
    <BaseNode
      id={id}
      title="Delay"
      handles={{
        targets: [
          { id: 'in',  position: Position.Left,  y: '60%' },
        ],
        sources: [
          { id: 'out', position: Position.Right, y: '60%' },
        ],
      }}
    >
      <div className="flex items-center text-purple-900 dark:text-purple-100 font">
        <span></span>
        <input
          type="number"
          value={ms}
          min={0}
          onChange={handleMs}
          className="
            ml-2 px-2 py-1 w-[70px]
            rounded-md
            bg-white/70 dark:bg-white/20
            border border-purple-300/40 dark:border-purple-400/40
            text-purple-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-purple-400
            shadow-[0_0_6px_0_rgba(127,63,255,0.08)] dark:shadow-[0_0_6px_0_rgba(127,63,255,0.16)]
            transition
            placeholder:text-purple-300 dark:placeholder:text-purple-200
          "
          placeholder="ms"
        />
        <span className="ml-2 text-xs text-purple-400 dark:text-purple-200 font-normal">ms</span>
      </div>
    </BaseNode>
  );
}
