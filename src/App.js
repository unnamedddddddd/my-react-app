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
    const newTask = {id: Date.now(), text: document.getElementById('inputTask').value.trim()};
    setTasks([...tasks, newTask]);
    console.log(newTask)
    document.getElementById('inputTask').value = '';
  }
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
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
          <ul id='tasksList'>{tasks.map(task => <Task text={task.text} id={task.id} onDelete={() => deleteTask(task.id)}></Task>)}</ul>
        </form>
     </div>
    </>
  );
}

export default App;
