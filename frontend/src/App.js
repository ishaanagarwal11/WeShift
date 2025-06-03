// App.js
import { useState, useEffect } from 'react';
import { PipelineToolbar } from './toolbar';
import { PipelineUI }      from './ui';
import { SubmitButton }    from './submit';

function App() {
  const [dark, setDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className="min-h-screen w-full relative bg-gradient-to-tr from-[#edeafd] via-[#d6d1f5] to-[#b5b6eb] dark:from-[#1a1436] dark:via-[#311F70] dark:to-[#381279] transition-colors duration-300">
      {/* Vignette/Glow overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-radial from-purple-400/50 via-transparent to-transparent dark:from-purple-800/60" />
      {/* Light/Dark toggle button */}
      <div className="fixed top-4 right-6 z-40">
        <button
          className="px-4 py-2 rounded-full bg-white/60 dark:bg-black/30 border border-purple-300/30 text-purple-900 dark:text-purple-200 font-semibold shadow-md hover:bg-white/80 dark:hover:bg-black/50 transition"
          onClick={() => setDark((d) => !d)}
        >
          {dark ? '⏻' : '⏻'}
        </button>
      </div>
      {/* Toolbar at top */}
      <PipelineToolbar />
      <main className="pt-[64px] flex flex-col items-center justify-start min-h-[calc(100vh-64px)] relative z-10">
        <PipelineUI />
        <div className="mt-8">
          <SubmitButton />
        </div>
      </main>
    </div>
  );
}

export default App;
