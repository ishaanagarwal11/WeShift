// /src/nodes/Logger.jsx
import React from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export function Logger({ id, data /*, selected, xPos, yPos, isConnectable */ }) {
  const message = data?.message || 'Log message…';

  const body = (
    <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.9em', color: '#444' }}>
      {message}
    </div>
  );

  return (
    <BaseNode
      id={id}
      title="Logger"
      handles={{
        targets: [
          { id: 'in',  position: Position.Left,  y: '50%' },
        ],
        sources: [
          /* no output handle for Logger */
        ],
      }}
    >
      {body}
    </BaseNode>
  );
}
