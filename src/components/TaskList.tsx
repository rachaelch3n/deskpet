import React from "react";
import XBox from "./XBox";

interface TaskListProps {
    tasks: string[];
    onRemove: (index:number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onRemove }) => {
    return (
        <div style={{ marginBottom: "10px", display: "flex",
        flexDirection: "column-reverse",
        alignItems: "center",
        justifyContent: "flex-end",
         }}>
          
          {tasks.map((task, index) => (
            <div
            className="task"
              key={index}
              style={{
                display: "flex",           // row container
                alignItems: "center",
                marginBottom: "4px",
              }}
            >
              <div
            className="task"
          >
            {task}
          </div>
          <XBox onClick={() => onRemove(index)} />
              </div>
          ))}
        </div>
      );
    }
    
    export default TaskList;