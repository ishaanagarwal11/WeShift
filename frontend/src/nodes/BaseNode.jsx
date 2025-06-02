// /frontend/src/nodes/BaseNode.jsx


import React from 'react';
import { Handle } from 'reactflow';
import './BaseNode.css';          

export const BaseNode = ({
  id,
  title = 'Node',
  width = 200,
  height = 110,
  handles = { targets: [], sources: [] },
  children,
}) => {
  return (
    <div
      className="base-node"
      style={{ width, minHeight: height }}
    >
      <div className="base-node__title">{title}</div>

      <div className="base-node__body">{children}</div>

      {handles.targets.map((h) => (
        <Handle
          key={h.id}
          type="target"
          position={h.position}
          id={h.id}
          style={{ top: h.y }}
        />
      ))}

      {handles.sources.map((h) => (
        <Handle
          key={h.id}
          type="source"
          position={h.position}
          id={h.id}
          style={{ top: h.y }}
        />
      ))}
    </div>
  );
};
