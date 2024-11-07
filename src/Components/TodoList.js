import React, { useState } from "react";

function TodoList({ tasks, onRemoveTask, onToggleTask, onEditTask, onMoveTaskUp, onMoveTaskDown }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [newText, setNewText] = useState("");

  const handleEditClick = (index, currentText) => {
    setEditingIndex(index);
    setNewText(currentText);
  };

  const handleSaveEdit = (index) => {
    onEditTask(index, newText);
    setEditingIndex(null);
    setNewText("");
  };

  return (
    <div>
      {tasks.map((task, index) => (
        <div key={index}>
          {editingIndex === index ? (
            <div>
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
              />
              <button onClick={() => handleSaveEdit(index)}>Sauvegarder</button>
            </div>
          ) : (
            <>
              <p
                style={{
                  textDecoration: task.isCompleted ? "line-through" : "none",
                }}
              >
                {task.text}
              </p>
              <button onClick={() => onToggleTask(index)}>
                {task.isCompleted
                  ? "Marquer comme non fait"
                  : "Marquer comme fait"}
              </button>
              <button onClick={() => onRemoveTask(index)}>Supprimer</button>
              <button onClick={() => handleEditClick(index, task.text)}>Modifier</button>

              <button onClick={()=> onMoveTaskUp(index)}>↑</button>
              <button onClick={()=> onMoveTaskDown(index)}>↓</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default TodoList;
