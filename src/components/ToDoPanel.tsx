// src/components/TodoPanel.tsx
import React, { useEffect, useRef, useState } from "react";

type Task = { id: string; text: string; done: boolean; createdAt: number };
const STORAGE_KEY = "deskpet.tasks.v1";
const MAX_LEN = 120;

const load = (): Task[] => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
};
const save = (tasks: Task[]) => localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

export default function TodoPanel() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setTasks(load()); }, []);
  useEffect(() => { save(tasks); }, [tasks]);

  const canAdd = text.trim().length > 0 && text.length <= MAX_LEN;

  function addTask() {
    if (!canAdd) return;
    const t: Task = { id: String(Date.now()), text: text.trim(), done: false, createdAt: Date.now() };
    setTasks((prev) => [t, ...prev]);
    setText("");
  }
  function toggleDone(id: string) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }
  function removeTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="todo-panel clickable" style={{
      position: "absolute", bottom: 8, left: 8, width: 240, padding: 12,
      borderRadius: 12, backdropFilter: "blur(6px)", background: "rgba(20,20,20,0.55)",
      color: "white", boxShadow: "0 8px 24px rgba(0,0,0,0.35)"
    }}>
      {/* input row */}
      <div style={{ display: "flex", gap: 8 }}>
        <input
          ref={inputRef}
          className="clickable"
          placeholder={`New task (≤ ${MAX_LEN} chars)…`}
          value={text}
          maxLength={MAX_LEN}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          style={{
            flex: 1, padding: "8px 10px", borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.08)", color: "white"
          }}
        />
        <button
          className="clickable"
          onClick={addTask}
          disabled={!canAdd}
          style={{
            padding: "8px 10px", borderRadius: 10, border: "none",
            background: canAdd ? "white" : "rgba(255,255,255,0.25)",
            color: canAdd ? "black" : "rgba(0,0,0,0.7)", fontWeight: 600, cursor: canAdd ? "pointer" : "not-allowed"
          }}
          title={canAdd ? "Add task" : "Type something ≤ char limit"}
        >
          Save
        </button>
      </div>

      {/* char counter */}
      <div style={{ fontSize: 11, opacity: 0.8, marginTop: 6, textAlign: "right" }}>
        {MAX_LEN - text.length} chars left
      </div>

      {/* list */}
      <div style={{ marginTop: 10, maxHeight: 220, overflowY: "auto", paddingRight: 4 }}>
        {tasks.map((t) => (
          <div key={t.id} className="clickable" style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "8px 8px", marginBottom: 6, borderRadius: 10,
            background: "rgba(255,255,255,0.06)"
          }}>
            <input type="checkbox" checked={t.done} onChange={() => toggleDone(t.id)} className="clickable" />
            <div style={{
              flex: 1, wordBreak: "break-word",
              textDecoration: t.done ? "line-through" : "none", opacity: t.done ? 0.6 : 1
            }}>
              {t.text}
            </div>
            <button onClick={() => removeTask(t.id)} className="clickable"
              style={{ border: "none", background: "transparent", color: "rgba(255,255,255,0.8)", cursor: "pointer" }}>
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
