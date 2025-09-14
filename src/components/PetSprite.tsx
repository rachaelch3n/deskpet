import { useMemo } from "react";
import { useTasks } from "../state/tasks";

function spriteForPending(pending: number) {
  // tweak thresholds as you like
  if (pending <= 0) return "/images/pet/standing.PNG";
  if (pending <= 2) return "/images/pet/standing_cute.PNG";
  if (pending <= 4) return "/images/pet/stressed.PNG";
  if (pending <= 6) return "/images/pet/kneeling_stressed.PNG";
  if (pending <= 8) return "/images/pet/sitting_crying.PNG";
  return "/images/pet/dead.PNG";
}

export default function PetSprite() {
  const tasks = useTasks((s) => s.tasks);
  const pending = useMemo(() => tasks.filter((t) => !t.done).length, [tasks]);
  const src = spriteForPending(pending);

  // small squish based on pending
  const maxSink = 30;
  const yOffset = Math.min(maxSink, pending * 4);
  const scaleY = 1 - Math.min(0.18, pending * 0.02);
  const scaleX = 1 + (1 - scaleY) * 0.45;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0 + yOffset,
        left: "50%",
        transform: `translateX(-50%) scale(${scaleX}, ${Math.max(0.9, scaleY)})`,
        transformOrigin: "bottom center",
        width: 200,
        height: 200,
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      <img src={src} alt="pet" style={{ position: "absolute", left: "50%", bottom: 6, transform: "translateX(-50%)", width: 180, height: "auto" }} />
    </div>
  );
}
