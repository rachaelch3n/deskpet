import { useState } from "react";

interface TaskButtonProps {
  onAdd: (task: string) => void;
}

export default function TaskButton({ onAdd }: TaskButtonProps) {
  const [showInput, setShowInput] = useState(false);
  const [task, setTask] = useState("");

  const handleAddClick = () => setShowInput(true);

  const handleSaveClick = () => {
    if (task.trim() !== "") {
      onAdd(task.trim());
      setTask("");
      setShowInput(false);
    }
  };

  return (
    <div>
      {!showInput ? (
        <button
            className="button"
          onClick={handleAddClick}
        >
          Add Task
        </button>
      ) : (
        <>
          <input
            className="input"
            type="text"
            value={task}
            placeholder="Enter a task..."
            onChange={(e) => setTask(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
          <button
            className="button"
            onClick={handleSaveClick}
          >
            Save
          </button>
        </>
      )}
    </div>
  );
}
