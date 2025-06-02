// /frontend/src/nodes/TextNode.jsx


import { useState, useEffect, useRef, useCallback } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';
import './TextNode.css'; 

const VAR_REGEX = /\{\{\s*([A-Za-z_$][\w$]*)$/; 


export const TextNode = ({ id, data }) => {
  const { updateNodeField, nodes, onConnect } = useStore();
  // Local state
  const [text, setText] = useState(data?.text || '');
  const [vars, setVars] = useState(() => extractAllVars(text));


  const [partial, setPartial] = useState('');
  const [suggestions, setSuggestions] = useState([]); // array of { nodeId, inputName }

  // track whether dropdown is open
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // keep track of the cursor position so we can place dropdown
  const textareaRef = useRef(null);
  const containerRef = useRef(null);

  const [boxSize, setBoxSize] = useState({ w: 220, h: 110 });

  // Helper: extract ALL variables from the entire text (as before)
  function extractAllVars(str) {
    const all = new Set();
    const REG = /\{\{\s*([A-Za-z_$][\w$]*)\s*\}\}/g;
    let m;
    while ((m = REG.exec(str))) {
      all.add(m[1]);
    }
    return Array.from(all);
  }

  // When the `text` changes, auto‐resize & update handles/vars
  useEffect(() => {
    // 1) Auto‐resize textarea
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
    // 3) Also push the “raw text” into node.data so backend can read.
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
        console.log("All nodes in TextNode:", nodes);
        const matches = nodes
          .filter((n) => n.type === 'inputNode' && n.data.inputName)
          .map((n) => ({ nodeId: n.id, inputName: n.data.inputName }))
          .filter((item) => item.inputName.toLowerCase().startsWith(lower));

                  console.log("Partial match:", part);
        console.log("Suggestions:", matches);
        setSuggestions(matches);
        setDropdownOpen(matches.length > 0);
      } else {
        // no active “{{… }}” in progress
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
  setText(newText); // This triggers re-render and mounts the handle

  setDropdownOpen(false);
  setSuggestions([]);

  const newPos = (before + inputName + '}}').length;
  setTimeout(() => {
    el.focus();
    el.setSelectionRange(newPos, newPos);
  }, 0);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      console.log("Connecting from", `${nodeId}-value`, "to", `${id}-${inputName}`);
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
      y: `${((i + 1) * 100) / (vars.length + 1)}%`,
      label: v,
    })),
    sources: [
      { id: `${id}-output`, position: Position.Right, y: '50%' }
    ],
  };

 
  return (
    <div style={{ position: 'relative' }} ref={containerRef}>
      <BaseNode id={id} title="Text" handles={handles} style={{ width: boxSize.w, height: boxSize.h }}>
        <textarea
          ref={textareaRef}
          className="node-textarea"
          placeholder="Type here…  {{variable}}  …"
          value={text}
          onChange={onChange}
        />
      </BaseNode>

      {dropdownOpen && (
        <ul className="textnode-dropdown">
          {suggestions.map((s) => (
            <li
              key={s.nodeId}
              className="textnode-dropdown-item"
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
