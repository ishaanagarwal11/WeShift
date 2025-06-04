import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export function Filter({ id, data }) {
  const [keyword, setKeyword] = useState(data?.keyword || '');

  const notifyChange = (newKw) => {
    data && data.onUpdate && data.onUpdate({ keyword: newKw });
  };

  const handleChange = (e) => {
    const next = e.target.value;
    setKeyword(next);
    notifyChange(next);
  };

  return (
    <BaseNode
      id={id}
      title="Filter"
      handles={{
        targets: [
          { id: 'in',  position: Position.Left,  y: '65%' },
        ],
        sources: [
          { id: 'out', position: Position.Right, y: '65%' },
        ],
      }}
    >
      <label className="flex flex-col text-xs font text-purple-900 dark:text-purple-100">
        <span>Keep if contains</span>
        <input
          type="text"
          value={keyword}
          onChange={handleChange}
          placeholder="filter_by_word"
          className="
            mt-1 px-2 py-1 rounded-md
            bg-white/70 dark:bg-white/20
            border border-purple-300/40 dark:border-purple-400/40
            text-purple-900 dark:text-white
            placeholder:text-purple-300 dark:placeholder:text-purple-200
            focus:outline-none focus:ring-2 focus:ring-purple-400
            shadow-[0_0_6px_0_rgba(127,63,255,0.06)] dark:shadow-[0_0_6px_0_rgba(127,63,255,0.11)]
            transition
            w-full
          "
        />
      </label>
    </BaseNode>
  );
}
