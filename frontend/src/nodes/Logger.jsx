import React from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export function Logger({ id, data }) {
  const message = data?.message || 'Loading Logs';

  return (
    <BaseNode
      id={id}
      title="Logger"
      handles={{
        targets: [
          { id: 'in', position: Position.Left, y: '55%' },
        ],
        sources: [
        ],
      }}
    >
      <div
        className="
          w-full min-h-[38px] px-3 py-2 rounded-md
          bg-white/70 dark:bg-white/10
          border border-purple-200/30 dark:border-purple-400/20
          font-mono text-[0.92em]
          text-purple-800 dark:text-purple-100
          whitespace-pre-wrap
          shadow-[0_0_4px_0_rgba(160,64,255,0.08)] dark:shadow-[0_0_8px_0_rgba(160,64,255,0.16)]
          transition
        "
      >
        {message}
      </div>
    </BaseNode>
  );
}
