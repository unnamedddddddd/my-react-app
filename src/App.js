import { useEffect, useState } from 'react';
import './App.css';
import Button from './components/Button';
import Task from './components/Task';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('todoTasks');
    return saved ? JSON.parse(saved) : [];
  });

  const addTask = () => {
    if (document.getElementById('inputTask').value.trim() === '') {
      alert('Поле пустое');
      return;
    }
    for (const task of tasks) {
      if (task.text.toLowerCase() === document.getElementById('inputTask').value.trim().toLowerCase()) {
        alert('Такая задача уже есть');
        return false;
      }
    }
    const time = new Date();
    const newTask = {
      id: Date.now(),
      text: document.getElementById('inputTask').value.trim(),
      time: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}, ${time.toLocaleDateString()} `
    };
    setTasks([...tasks, newTask]);
    console.table(tasks)
    document.getElementById('inputTask').value = '';
  }

  const deleteTask = taskId => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const editTask = taskId => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newText = prompt('Введите новую задачу', task.text);
        if (newText === null) {
          return task;
        }
        return { ...task, text: newText };
      }
      return task
    }));
  }

  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <header>To-Do with React</header>
      <div style={{ width: "100%" }} className='form-container'>
        <form id='formAdd' >
          <div className="input-task" style={{ gap: 32 }}>
            <input type="text" className="text-task" id="inputTask" placeholder="Введите задачу" />
            <Button variant='add' onClick={addTask}>Добавить задачу</Button>
          </div>
        </form>
        <div style={{
          backgroundColor: '#fff',
          borderRadius: 12,
          padding: 32,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderWidth: 1,
          borderColor: "#e2e8f0"
        }} id='formTacks'>
          <text id='labelTasks'>Ваши задачи</text>
          <ul id='tasksList'>{tasks.map(task =>
            <Task
              text={task.text}
              time={task.time}
              id={task.id}
              onEdit={() => editTask(task.id)}
              onDelete={() => deleteTask(task.id)}
            />
          )}</ul>
        </div>
      </div>
    </>
  );
}

export default App;
