import React, { useState } from 'react';
import './ToDoListComponent.css';

const ToDoListComponent = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const editTask = (index) => {
    setIsEditing(true);
    setNewTask(tasks[index].text);
    setCurrentTaskIndex(index);
  };

  const updateTask = () => {
    const updatedTasks = tasks.map((task, index) => 
      index === currentTaskIndex ? { ...task, text: newTask } : task
    );
    setTasks(updatedTasks);
    setNewTask('');
    setIsEditing(false);
    setCurrentTaskIndex(null);
  };

  const removeTask = (index) => {
    const filteredTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(filteredTasks);
  };

  return (
    <div className="todo-list-container">
      <div className="todo-list">
        <h1>Todo List</h1>
        <div className="input-container">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a task"
          />
          {isEditing ? (
            <button onClick={updateTask} className="add-task-button">Update Task</button>
          ) : (
            <button onClick={addTask} className="add-task-button">Add Task</button>
          )}
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task.text}
              <div className="task-buttons">
                <button className="edit" onClick={() => editTask(index)}>Edit</button>
                <button className="remove" onClick={() => removeTask(index)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoListComponent;