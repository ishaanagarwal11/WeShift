import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

const COMPLETE_VAR_REGEX = /\{\{\s*([A-Za-z_$][\w$]*)\s*\}\}/g;
const PARTIAL_VAR_REGEX = /\{\{\s*([A-Za-z_$][\w$]*)$/;

export const TextNode = ({ id, data }) => {
  const { updateNodeField, nodes, onConnect, edges, setEdges } = useStore();
  const [text, setText] = useState(data?.text || '');
  const [vars, setVars] = useState(() => extractVars(data?.text || ''));
  const [suggestions, setSuggestions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [boxSize, setBoxSize] = useState({ w: 220, h: 110 });
  const textareaRef = useRef(null);

  function extractVars(str) {
    const found = new Set();
    let match;
    while ((match = COMPLETE_VAR_REGEX.exec(str))) {
      found.add(match[1]);
    }
    return Array.from(found);
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
  }, [text]);

  useEffect(() => {
    const newVars = extractVars(text);
    setVars(newVars);

    if (JSON.stringify(data?.variables) !== JSON.stringify(newVars)) {
      updateNodeField(id, 'variables', newVars);
      updateNodeField(id, 'text', text);
    }
  }, [text, id, data?.variables, updateNodeField]);

  useEffect(() => {
    const validHandles = vars.map((v) => `${id}-${v}`);
    const filteredEdges = edges.filter(
      (e) =>
        !(e.target === id && !validHandles.includes(e.targetHandle))
    );
    if (filteredEdges.length !== edges.length) {
      setEdges(filteredEdges);
    }

    vars.forEach((varName) => {
      const inputNode = nodes.find(
        (n) => n.type === 'inputNode' && n.data.inputName === varName
      );
      if (inputNode) {
        const alreadyConnected = edges.some(
          (e) =>
            e.source === inputNode.id &&
            e.target === id &&
            e.targetHandle === `${id}-${varName}`
        );
        if (!alreadyConnected) {
          onConnect({
            source: inputNode.id,
            sourceHandle: `${inputNode.id}-value`,
            target: id,
            targetHandle: `${id}-${varName}`,
          });
        }
      }
    });
  }, [vars, nodes, edges, id, onConnect, setEdges]);

  const onChange = useCallback(
    (e) => {
      const v = e.target.value;
      setText(v);

      const caret = e.target.selectionStart;
      const sub = v.slice(0, caret);
      const match = PARTIAL_VAR_REGEX.exec(sub);
      if (match) {
        const part = match[1].toLowerCase();
        const matches = nodes
          .filter((n) => n.type === 'inputNode' && n.data.inputName)
          .map((n) => ({ nodeId: n.id, inputName: n.data.inputName }))
          .filter((item) =>
            item.inputName.toLowerCase().startsWith(part)
          );
        setSuggestions(matches);
        setDropdownOpen(matches.length > 0);
      } else {
        setDropdownOpen(false);
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
  const before = prefix.slice(0, idx + 2); // up to {{
  const after = suffix;

  const newText = before + inputName + '}}' + after;

  setText(newText);
  updateNodeField(id, 'text', newText);

  const newPos = (before + inputName + '}}').length;
  setTimeout(() => {
    el.focus();
    el.setSelectionRange(newPos, newPos);
  }, 0);

  onConnect({
    source: nodeId,
    sourceHandle: `${nodeId}-value`,
    target: id,
    targetHandle: `${id}-${inputName}`,
  });

  setDropdownOpen(false);
  setSuggestions([]);
};

  const handles = {
    targets: vars.map((v, i) => ({
      id: `${id}-${v}`,
      position: Position.Left,
      y: `${((i + 1) * 100) / (vars.length + 1)}%`,
      label: v,
    })),
    sources: [{ id: `${id}-output`, position: Position.Right, y: '50%' }],
  };
  const containerRef = useRef(null);


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
          className="
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
          "
          placeholder="Type here  {{var}}"
          value={text}
          onChange={onChange}
        />
      </BaseNode>

      {dropdownOpen && (
        <ul className="absolute z-20 left-0 top-full mt-2 w-[180px] bg-white/90 dark:bg-[#26115a] border border-purple-300/50 dark:border-purple-700/50 rounded-lg shadow-xl p-1 text-xs text-purple-800 dark:text-purple-100">
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
