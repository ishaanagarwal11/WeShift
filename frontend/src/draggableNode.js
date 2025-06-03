export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`
        select-none
        flex flex-col items-center justify-center
        min-w-[90px] h-[48px]
        rounded-xl
        font-semibold
        text-sm
        cursor-grab
        transition-all duration-200
        border
        shadow-[0_2px_16px_0_rgba(127,63,255,0.14),0_0_12px_2px_rgba(130,0,255,0.10)]
        backdrop-blur-[3px]

        /* Light mode */
        bg-gradient-to-b from-white/70 to-purple-100/70
        border-purple-300/50
        text-purple-900
        hover:scale-105
        hover:border-purple-400
        hover:shadow-[0_0_32px_8px_rgba(167,98,255,0.18)]
        active:scale-95

        /* Dark mode */
        dark:bg-gradient-to-b dark:from-[#4316db]/90 dark:to-[#8057e4]/90
        dark:border-purple-400/60
        dark:text-white
        dark:shadow-[0_2px_16px_0_rgba(127,63,255,0.23),0_0_8px_2px_rgba(130,0,255,0.17)]
        dark:hover:border-purple-300
        dark:hover:shadow-[0_0_32px_8px_rgba(167,98,255,0.34)]
      `}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      <span className="drop-shadow-[0_2px_6px_rgba(160,64,255,0.30)]">{label}</span>
    </div>
  );
};
