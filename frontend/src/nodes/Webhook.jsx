// /src/nodes/Webhook.jsx
import React, { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export function Webhook({ id, data  }) {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com/endpoint');

  const notifyChange = (nextUrl) => {
    data && data.onUpdate && data.onUpdate({ url: nextUrl });
  };

  const handleUrl = (e) => {
    const next = e.target.value;
    setUrl(next);
    notifyChange(next);
  };

  const body = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <span>POST to:</span>
      <input
        type="text"
        value={url}
        onChange={handleUrl}
        style={{ width: '100%' }}
      />
    </div>
  );

  return (
    <BaseNode
      id={id}
      title="Webhook"

      handles={{
        targets: [
          { id: 'in', position: Position.Left, y: '50%' },
        ],
        sources: [
        ],
      }}
    >
      {body}
    </BaseNode>
  );
}
