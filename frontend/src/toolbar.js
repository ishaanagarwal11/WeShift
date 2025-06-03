import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <nav
      className="
        w-full
        px-6
        py-3
        flex
        gap-4
        items-center
        bg-white/70 dark:bg-white/10
        backdrop-blur-md
        shadow-[0_0_40px_10px_rgba(167,98,255,0.16)]
        border-b border-purple-200/40 dark:border-purple-900/40
        fixed top-0 left-0 z-30
        transition-all
      "
      style={{
        WebkitBackdropFilter: 'blur(16px)',
        backdropFilter: 'blur(16px)'
      }}
    >
      <span className="font-bold text-purple-900 dark:text-purple-100 text-base tracking-wide pr-3 select-none opacity-80">
        VectorShift
      </span>
      <DraggableNode type='inputNode' label='Input' />
      <DraggableNode type='textNode' label='Text' />
      <DraggableNode type='outputNode' label='Output' />
      <DraggableNode type='llmNode' label='LLM' />
      <DraggableNode type='MathAdd' label='Math' />
      <DraggableNode type='Delay' label='Delay' />
      <DraggableNode type='Filter' label='Filter' />
      <DraggableNode type='Logger' label='Logger' />
      <DraggableNode type='Webhook' label='Webhook' />
    </nav>
  );
};
