import pet from "./assets/pet.png";
import stressedPet0 from "./assets/stressedpet0.png";
import stressedPet1 from "./assets/stressedpet1.png";
import stressedPet2 from "./assets/stressedpet2.png";
import stressedPet3 from "./assets/stressedpet3.png";
import stressedPet4 from "./assets/stressedpet4.png";

import { useState } from "react";
import "./App.css";
import "./index.css";
import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
import TaskList from "./components/TaskList.tsx";
import TaskButton from "./components/TaskButton";
import AutoResizeWrapper from "./components/AutoResizeWrapper.tsx";

const win = getCurrentWebviewWindow();

function App() {
  const [tasks, setTasks] = useState<string[]>([]);


  const handleDrag = async (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    try {
      await win.startDragging();
    } catch (err) {
        console.error("Drag failed:", err);
      }
    };

    const handleAddTask = (task: string) => {
      setTasks((prev) => [...prev, task]);
    };

    const taskCount = tasks.length;
let bearImage = pet;
if (taskCount > 10) bearImage = stressedPet4;
else if (taskCount > 8) bearImage = stressedPet3;
else if (taskCount > 6) bearImage = stressedPet2;
else if (taskCount > 4) bearImage = stressedPet1;
else if (taskCount > 2) bearImage = stressedPet0;

    
  return (
    <AutoResizeWrapper>
    <div
      style={{
        width: "100%",
        background: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "20px",
        height: "100%",
      }}
    >
      <TaskList tasks={tasks} onRemove={(index) =>
    setTasks((prev) => prev.filter((_, i) => i !== index))
  }/>
      <img
        src={bearImage}
        alt="pet"
        draggable={false}
        className={
          taskCount > 10 ? "stressedpet4" :
          taskCount > 8  ? "stressedpet3" :
          taskCount > 6  ? "stressedpet2" :
          taskCount > 4  ? "stressedpet1" :
          taskCount > 2  ? "stressedpet0" :
          "pet"
        }
        onMouseDown={handleDrag}
      />
      <TaskButton onAdd={handleAddTask} />
    </div>
    </AutoResizeWrapper>
  );
}

export default App;