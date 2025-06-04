import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export function Webhook({ id, data }) {
  const [url, setUrl] = useState(data?.url || 'https://vectorshift.ai');

  const notifyChange = (nextUrl) => {
    data && data.onUpdate && data.onUpdate({ url: nextUrl });
  };

  const handleUrl = (e) => {
    const next = e.target.value;
    setUrl(next);
    notifyChange(next);
  };

  return (
    <BaseNode
      id={id}
      title="Webhook"
      handles={{
        targets: [
          { id: 'in', position: Position.Left, y: '65%' },
        ],
        sources: [],
      }}
    >
      <label className="flex flex-col text-xs font text-purple-900 dark:text-purple-100">
        <span>POST to</span>
        <input
          type="text"
          value={url}
          onChange={handleUrl}
          className="
            mt-1 px-2 py-1 rounded-md
            bg-white/70 dark:bg-white/20
            border border-purple-300/40 dark:border-purple-400/40
            text-purple-900 dark:text-white
            placeholder:text-purple-300 dark:placeholder:text-purple-200
            focus:outline-none focus:ring-2 focus:ring-purple-400
            shadow-[0_0_6px_0_rgba(127,63,255,0.07)] dark:shadow-[0_0_6px_0_rgba(127,63,255,0.14)]
            transition
            w-full
          "
          placeholder="Pasete your webhook URL here"
        />
      </label>
    </BaseNode>
  );
}
