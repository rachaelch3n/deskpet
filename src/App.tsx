import "./App.css";
import TodoPanel from "./components/ToDoPanel";
import PetSprite from "./components/PetSprite";
import TaskBars from "./components/TaskBars";

export default function App() {
  return (
    <main style={{ position: "relative", width: 340, height: 360, overflow: "hidden", background: "transparent" }}>
      {/* Drag overlay only if you’re using window dragging elsewhere */}
      {/* <div className="drag-overlay" /> */}

      {/* Bars first so they appear above the head */}
      <TaskBars />
      {/* The pet itself */}
      <PetSprite />
      {/* Input/list panel */}
      <TodoPanel />
    </main>
  );
}
