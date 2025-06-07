import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
  const { nodes, edges } = useStore();
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const showResult = (res) => {
    setResult(res);
    setError(null);
    setTimeout(() => setResult(null), 5000);
  };
  const showError = (err) => {
    setResult(null);
    setError(err);
    setTimeout(() => setError(null), 5000);
  };

  const handleSubmit = async () => {
    setError(null);
    setResult(null);
    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges })
      });
      if (!response.ok) throw new Error("Submission failed");
      const data = await response.json();
      showResult({
        isDAG: data.is_dag,
        numNodes: data.num_nodes,
        numEdges: data.num_edges
      });
    } catch (err) {
      showError(err.message || "Unknown error.");
    }
  };



  return (
    <div className="w-full flex flex-col items-center mt-8 relative">
      <button
        onClick={handleSubmit}
        className="
          w-full max-w-xl
          px-7 py-3
          rounded-xl
          bg-gradient-to-br from-purple-400/80 to-purple-700/80
          dark:from-[#4316db]/90 dark:to-[#8057e4]/90
          text-white font text-base
          shadow-[0_2px_24px_0_rgba(127,63,255,0.24)]
          hover:scale-[1.02] hover:shadow-[0_0_36px_10px_rgba(167,98,255,0.24)]
          active:scale-95
          transition-all
          border border-purple-200/50 dark:border-purple-400/50
          backdrop-blur-md
          focus:outline-none focus:ring-2 focus:ring-purple-400
        "
        style={{ letterSpacing: "0.02em" }}
      >
        Submit Pipeline
      </button>

      {(result || error) && (
        <div
          className={`
            fixed left-1/2 bottom-12 z-50
            -translate-x-1/2
            max-w-[98vw] w-[360px] sm:w-[400px]
            rounded-3xl
            shadow-2xl
            bg-white/60 dark:bg-[#23134b]/80
            backdrop-blur-[16px]
            transition
            p-0 flex flex-col items-stretch
          `}
          style={{
            boxShadow: "0 4px 36px 8px rgba(127,63,255,0.13), 0 2px 8px 0 rgba(30,20,50,0.10)",
            fontWeight: 500,
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)"
          }}
        >
          <div className="text-lg sm:text-xl font-medium text-center py-5 rounded-t-3xl
                          bg-white/70 dark:bg-[#221c35]/70
                          border-b border-purple-200/40 dark:border-purple-900/30">
            {error
              ? <span className="text-red-700 dark:text-red-300">Submission Error</span>
              : result && result.isDAG
                ? "It’s a Directed Acyclic Graph"
                : "Cycle Detected (Not a DAG)"
            }
          </div>
          <div className="flex flex-row divide-x divide-purple-200/60 dark:divide-purple-900/40">
            <div className="flex-1 flex flex-col items-center py-6">
              <span className="text-lg sm:text-xl mb-2 opacity-70">Nodes</span>
              <span className="text-4xl font tracking-wider text-purple-900 dark:text-purple-200">
                {result ? result.numNodes : "--"}
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center py-6">
              <span className="text-lg sm:text-xl mb-2 opacity-70">Edges</span>
              <span className="text-4xl font tracking-wider text-purple-900 dark:text-purple-200">
                {result ? result.numEdges : "--"}
              </span>
            </div>
          </div>
          {error && (
            <div className="p-4 text-center text-red-700 dark:text-red-300 text-base font-normal">
              {error}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
