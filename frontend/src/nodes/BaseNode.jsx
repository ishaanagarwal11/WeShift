import React from 'react';
import { Handle } from 'reactflow';

export const BaseNode = ({
  id,
  title = 'Node',
  width = 210,
  height = 150,
  handles = { targets: [], sources: [] },
  children,
}) => {
  return (
    <div
      style={{
        width,
        minHeight: height,
      }}
      className={`
        rounded-2xl
        border
        bg-gradient-to-b
        from-white/80 to-purple-100/70
        dark:from-[#4316db] dark:to-[#8057e4]
        border-purple-200/50
        dark:border-purple-400/60
        shadow-[0_8px_36px_8px_rgba(127,63,255,0.14),0_1.5px_4px_1.5px_rgba(160,64,255,0.08)]
        dark:shadow-[0_8px_36px_8px_rgba(127,63,255,0.25),0_1.5px_4px_1.5px_rgba(160,64,255,0.14)]
        relative
        flex flex-col
        transition-all duration-300
        z-10
        backdrop-blur-sm
        ring-1 ring-purple-400/20 dark:ring-purple-700/40
        overflow-hidden
      `}
    >
      <div className="
        w-full text-center text-base font
        text-purple-900 dark:text-white
        py-3
        bg-white/70 dark:bg-[#3a24a7]/50
        drop-shadow-[0_2px_8px_rgba(160,64,255,0.18)]
        dark:drop-shadow-[0_2px_8px_rgba(160,64,255,0.33)]
      ">
        {title}
      </div>
      <div className="w-full border-b border-purple-200/60 dark:border-purple-400/40" />
      <div className="flex-1 p-4">{children}</div>

      {handles.targets.map((h) => (
        <Handle
          key={h.id}
          type="target"
          position={h.position}
          id={h.id}
          style={{ top: h.y }}
          className="
          !w-3 !h-4
            !bg-[#b7aaff] !border-2 !border-purple-300/80 !shadow-[0_0_8px_2px_rgba(160,64,255,0.21)] 
            dark:!bg-[#7f5fff] dark:!border-purple-200/80 dark:!shadow-[0_0_12px_2px_rgba(160,64,255,0.5)]
          "
        />
      ))}
      {handles.sources.map((h) => (
        <Handle
          key={h.id}
          type="source"
          position={h.position}
          id={h.id}
          style={{ top: h.y }}
          className="
                    !w-3 !h-4

            !bg-[#b7aaff] !border-2 !border-purple-300/80 !shadow-[0_0_8px_2px_rgba(160,64,255,0.21)] 
            dark:!bg-[#7f5fff] dark:!border-purple-200/80 dark:!shadow-[0_0_12px_2px_rgba(160,64,255,0.5)]
          "
        />
      ))}
    </div>
  );
};
