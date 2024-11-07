import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

function TodoApp() {
 // Récupérer les tâches depuis localStorage
 let storedTasks = [];
 try {
  storedTasks = JSON.parse(localStorage.getItem("tasks"));
  // Vérifie si les données stockées sont bien un tableau
  if (!Array(storedTasks))
 {
  storedTasks = []; // Si ce n'est pas un tableau, réinitialiser à un tableu vide
 } 
} catch (error) {
  console.error("Erreur lors de la récupération des tâches depuis localStorage:", error);
  storedTasks = []; // Si une erreur se produit, on utilise un tableau vide par défaut
}

  const [tasks, setTasks] = useState(storedTasks);
  const [filter, setFilter] = useState("all");

  // Sauvegarder les tâches dans le localStorage à chaque mise à jour des tâches
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
 
  //Ajoute les 
  const addTask = (task) => {
    const newTask = { text: task, isCompleted: false };
    setTasks([...tasks, newTask]);
  };
  // Supprime les tâches
  const removeTask = (index) => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer cette tâche ?"
    );
    if (confirmDelete) {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  // Marquer une tâche comme complétée ou non
  const toggleTaskCompletion = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  // Déplacer une tâche vers le haut
  const moveTaskUp = (index) => {
    if (index ===0) return;
    const newTasks = [...tasks];
    const [removed] = newTasks.splice(index, 1);
    newTasks.splice(index - 1, 0, removed);
    setTasks(newTasks);
  };

  // Déplacer une tâche vers le bas
  const moveTaskDown = (index) => {
    if (index === tasks.length - 1) return;
    const newTasks = [...tasks];
    const [removed] = newTasks.splice(index, 1);
    newTasks.splice(index + 1, 0, removed); 
    setTasks(newTasks);
  }

  // Filtrer les tâches
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.isCompleted;
    if (filter === "incomplete") return !task.isCompleted;
    return true;
  });

  // Modifier une tâches
  const onEditTask = (index, newText) => {
    setTasks(
      tasks.map((task, i) => (i === index ? { ...task, text: newText } : task))
    );
  };

  return (
    <div>
      <h1>Ma liste de tâches</h1>
      <TodoForm onAddTask={addTask} />

      <div>
        <button onClick={() => setFilter("all")}>Toutes</button>
        <button onClick={() => setFilter("completed")}>Complètes</button>
        <button onClick={() => setFilter("incomplete")}>Non complètes</button>
      </div>

      <TodoList
        tasks={filteredTasks}
        onRemoveTask={removeTask}
        onToggleTask={toggleTaskCompletion}
        onEditTask={onEditTask}
        onMoveTaskUp={moveTaskUp}
        onMoveTaskDown={moveTaskDown}
      />
    </div>
  );
}

export default TodoApp;
