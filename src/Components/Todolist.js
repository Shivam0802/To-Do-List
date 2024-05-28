import React, { useState, useEffect } from 'react';
import { HiBadgeCheck } from "react-icons/hi";
import './TodoListStyles.css';

function TodoList() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    } else {
      return [];
    }
  });
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (event) => {
    event.preventDefault();
    if (input.trim() !== '') {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const filterTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed;
    } else if (filter === 'incompleted') {
      return !task.completed;
    } else {
      return true;
    }
  });

  const sortedTasks = [...filterTasks].sort((a, b) => a.text.localeCompare(b.text));
  return (
    <div className='todo-container'>
      <h1>Todo List</h1>
      <div className='todo-box'>
        <form onSubmit={addTask}>
          <div className='todo-form'>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Add your task here ......' />
            <button type="submit">Add Task</button>
          </div>
        </form>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incompleted">Incomplete</option>
        </select>
      </div>
      {sortedTasks.map((task, index) => (
        <div key={index} className='tasks'>
          <span>{task.text}{task.completed ? <HiBadgeCheck style={{color:'green',fontSize:'20px'}}/>:' '}</span>
          <div className='icons'>
            <button onClick={() => toggleTask(index)}>{task.completed ? 'Unmark' : 'Complete'}</button>
            <button onClick={() => removeTask(index)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;