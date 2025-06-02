// /src/toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: '10px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
            <DraggableNode type='inputNode' label='Input' />
        <DraggableNode type='textNode' label='Text' />
        <DraggableNode type='outputNode' label='Output' />
        <DraggableNode type='llmNode' label='LLM' />
            <DraggableNode type='MathAdd' label='Math' />
            <DraggableNode type='Delay'   label='Delay' />
            <DraggableNode type='Filter'  label='Filter' />
            <DraggableNode type='Logger'  label='Logger' />
            <DraggableNode type='Webhook' label='Webhook' />
      </div>      
    </div>
  );
};
