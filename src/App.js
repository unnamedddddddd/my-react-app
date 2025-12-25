import { useEffect, useState } from 'react';
import './App.css';
import Button from './Button';
import Task from './Task';

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
      time: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}, ${time.getDay()}/${time.getMonth()}/${time.getFullYear()}`};
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
        return {...task, text: newText };
      }
      return task
    }));
  }  
  useEffect(() => { 
    localStorage.setItem('todoTsks', JSON.stringify(tasks));
  }, [tasks]);
  return (
    <>
    <header>To-Do with React</header>
      <div className='form-container'>
        <form id='formAdd' >
          <div className="input-task">
            <input type="text" className="text-task" id="inputTask" placeholder="Введите задачу"/>
            <Button variant='add' onClick={addTask}>Добавить задачу</Button>
          </div>
        </form>
        <form id='formTacks'>
          <label id='labelTasks'>Ваши задачи</label>
          <ul id='tasksList'>{tasks.map(task => 
            <Task 
              text={task.text} 
              time={task.time}
              id={task.id} 
              onEdit={() => editTask(task.id)} 
              onDelete={() => deleteTask(task.id)}/>
            )}
          </ul>
        </form>
     </div>
    </>
  );
}

export default App;
