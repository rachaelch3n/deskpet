import { useMemo } from "react";
import { useTasks } from "../state/tasks";

const MAX_SHOW = 3;
const BAR_WIDTH = 220;

export default function TaskBars() {
  const tasks = useTasks((s) => s.tasks);
  const pending = useMemo(() => tasks.filter((t) => !t.done), [tasks]);
  const top = pending.slice(0, MAX_SHOW);

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        left: "50%",
        bottom: 170,
        transform: "translateX(-50%)",
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      {top.map((t) => (
        <div
          key={t.id}
          style={{
            position: "relative",
            width: BAR_WIDTH,
            marginBottom: 8,
          }}
        >
          <img
            src="/images/pet/bar.PNG"
            alt=""
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,.25))",
            }}
          />
          <div
            className="bar-text"
            style={{
              position: "absolute",
              left: 18,
              top: "50%",
              transform: "translateY(-50%)",
              width: BAR_WIDTH - 36,
              fontSize: 14,
              color: "#3a2b2b",
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {t.text}
          </div>
        </div>
      ))}
    </div>
  );
}
