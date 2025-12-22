import './App.css';

function App() {
  return (
    <>
      <div className='form-container'>
        <form id='formAdd'>
          <div>
            <input type='text' id='inputTask' placeholder='Введите задачу'/>
            <button id='btnAdd' type='button'>Добавить задачу</button>
          </div>
        </form>
        <form id='formTacks'>
          <label for='formTacks' id='labelTasks'Ваши задачи></label>
          <ul id='tasksList'></ul>
        </form>
      </div>
    </>
  );
}

export default App;
