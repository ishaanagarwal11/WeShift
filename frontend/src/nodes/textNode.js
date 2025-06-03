import { useState, useEffect, useRef, useCallback } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

const VAR_REGEX = /\{\{\s*([A-Za-z_$][\w$]*)$/;

export const TextNode = ({ id, data }) => {
  const { updateNodeField, nodes, onConnect } = useStore();
  const [text, setText] = useState(data?.text || '');
  const [vars, setVars] = useState(() => extractAllVars(text));
  const [partial, setPartial] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const textareaRef = useRef(null);
  const containerRef = useRef(null);
  const [boxSize, setBoxSize] = useState({ w: 220, h: 110 });

  function extractAllVars(str) {
    const all = new Set();
    const REG = /\{\{\s*([A-Za-z_$][\w$]*)\s*\}\}/g;
    let m;
    while ((m = REG.exec(str))) {
      all.add(m[1]);
    }
    return Array.from(all);
  }

  useEffect(() => {
    if (textareaRef.current) {
      const el = textareaRef.current;
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
      const newWidth = Math.min(Math.max(220, el.scrollWidth + 30), 400);
      const newHeight = Math.min(Math.max(110, el.scrollHeight + 60), 300);
      setBoxSize({ w: newWidth, h: newHeight });
    }
    const allCompleteVars = extractAllVars(text);
    setVars(allCompleteVars);
    updateNodeField(id, 'variables', allCompleteVars);
    updateNodeField(id, 'text', text);
  }, [text, id, updateNodeField]);

  const onChange = useCallback(
    (e) => {
      const v = e.target.value;
      setText(v);
      const caret = e.target.selectionStart;
      const sub = v.slice(0, caret);
      const match = VAR_REGEX.exec(sub);
      if (match) {
        const part = match[1];
        setPartial(part);
        const lower = part.toLowerCase();
        const matches = nodes
          .filter((n) => n.type === 'inputNode' && n.data.inputName)
          .map((n) => ({ nodeId: n.id, inputName: n.data.inputName }))
          .filter((item) => item.inputName.toLowerCase().startsWith(lower));
        setSuggestions(matches);
        setDropdownOpen(matches.length > 0);
      } else {
        setDropdownOpen(false);
        setSuggestions([]);
      }
    },
    [nodes]
  );

  const pickSuggestion = (nodeId, inputName) => {
    if (!textareaRef.current) return;
    const el = textareaRef.current;
    const fullText = el.value;
    const caret = el.selectionStart;
    const prefix = fullText.slice(0, caret);
    const suffix = fullText.slice(caret);
    const idx = prefix.lastIndexOf('{{');
    const before = prefix.slice(0, idx + 2);
    const afterPartial = suffix;
    const newText = before + inputName + '}}' + afterPartial;
    setText(newText);
    setDropdownOpen(false);
    setSuggestions([]);
    const newPos = (before + inputName + '}}').length;
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(newPos, newPos);
    }, 0);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        onConnect({
          source: nodeId,
          sourceHandle: `${nodeId}-value`,
          target: id,
          targetHandle: `${id}-${inputName}`,
        });
      });
    });
  };

  const handles = {
    targets: vars.map((v, i) => ({
      id: `${id}-${v}`,
      position: Position.Left,
      y: `${((i + 1) * 100) / (vars.length + 0.5)}%`,
      label: v,
    })),
    sources: [
      { id: `${id}-output`, position: Position.Right, y: '50%' }
    ],
  };

  return (
    <div style={{ position: 'relative' }} ref={containerRef}>
      <BaseNode
        id={id}
        title="Text"
        handles={handles}
        style={{ width: boxSize.w, height: boxSize.h }}
      >
        <textarea
        ref={textareaRef}
        className={`
          w-full min-h-[56px] resize-none
          rounded-md
          bg-white/70 dark:bg-white/20
          border border-purple-300/40 dark:border-purple-400/40
          text-purple-900 dark:text-white
          placeholder:text-purple-300 dark:placeholder:text-purple-200
          font-mono text-[0.98em]
          focus:outline-none focus:ring-2 focus:ring-purple-400
          shadow-[0_0_6px_0_rgba(127,63,255,0.08)] dark:shadow-[0_0_6px_0_rgba(127,63,255,0.16)]
          p-2
          transition
          overflow-hidden       
          scrollbar-none      
        `}
        placeholder="Type here  {{var}}"
        value={text}
        onChange={onChange}
      />
      </BaseNode>
      {dropdownOpen && (
        <ul className="absolute z-20 left-0 top-full mt-2 w-[180px] bg-white/90 dark:bg-[#26115a] border border-purple-300/50 dark:border-purple-700/50 rounded-lg shadow-xl p-1 text-xs font-semibold text-purple-800 dark:text-purple-100">
          {suggestions.map((s) => (
            <li
              key={s.nodeId}
              className="px-3 py-2 hover:bg-purple-100/60 dark:hover:bg-purple-900/50 rounded cursor-pointer transition"
              onClick={() => pickSuggestion(s.nodeId, s.inputName)}
            >
              {s.inputName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
