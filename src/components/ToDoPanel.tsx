import React, { useRef, useState } from "react";
import { useTasks } from "../state/tasks";
const MAX_LEN = 120;

export default function TodoPanel() {
  const { tasks, addTask, toggleDone, removeTask } = useTasks();
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const canAdd = text.trim().length > 0 && text.length <= MAX_LEN;

  function onAdd() {
    if (!canAdd) return;
    addTask(text);
    setText("");
  }

  return (
    <div className="clickable"
      style={{
        position: "absolute", bottom: 8, left: 8, width: 260, padding: 12,
        borderRadius: 12, backdropFilter: "blur(6px)", background: "rgba(20,20,20,0.55)",
        color: "white", boxShadow: "0 8px 24px rgba(0,0,0,.35)", zIndex: 3
      }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          ref={inputRef}
          placeholder={`New task (≤ ${MAX_LEN})…`}
          value={text}
          maxLength={MAX_LEN}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onAdd()}
          className="clickable"
          style={{
            flex: 1, padding: "8px 10px", borderRadius: 10,
            border: "1px solid rgba(255,255,255,.18)", background: "rgba(255,255,255,.08)", color: "white"
          }}
        />
        <button
          onClick={onAdd}
          disabled={!canAdd}
          className="clickable"
          style={{
            padding: "8px 10px", borderRadius: 10, border: "none",
            background: canAdd ? "white" : "rgba(255,255,255,.25)", color: canAdd ? "black" : "rgba(0,0,0,.7)",
            fontWeight: 600, cursor: canAdd ? "pointer" : "not-allowed"
          }}>
          Save
        </button>
      </div>

      <div style={{ fontSize: 11, opacity: .8, marginTop: 6, textAlign: "right" }}>
        {MAX_LEN - text.length} chars left
      </div>

      <div style={{ marginTop: 10, maxHeight: 200, overflowY: "auto", paddingRight: 4 }}>
        {tasks.map((t) => (
          <div key={t.id} className="clickable" style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "8px", marginBottom: 6, borderRadius: 10, background: "rgba(255,255,255,.06)"
          }}>
            <input type="checkbox" checked={t.done} onChange={() => toggleDone(t.id)} className="clickable" />
            <div style={{ flex: 1, wordBreak: "break-word", textDecoration: t.done ? "line-through" : "none", opacity: t.done ? .6 : 1 }}>
              {t.text}
            </div>
            <button onClick={() => removeTask(t.id)} className="clickable"
              style={{ border: "none", background: "transparent", color: "rgba(255,255,255,.9)", cursor: "pointer" }}>
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
