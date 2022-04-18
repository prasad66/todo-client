import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Addtask from './components/Addtask';
import TodoList from './components/TodoList';
import UpdateTask from './components/UpdateTask';

function App() {

  const [todoList, setTodoList] = useState([]);
  const [taskToUpdate, setTaskToUpdate] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {

    const fetchTasks = async () => {

      try {
        const tasks = await axios.get('https://to2s.herokuapp.com/api/tasks');

        setTodoList(tasks.data);

      } catch (error) {
        console.log(error);
      }

    };

    fetchTasks();
  }, []);

  const addTodoTask = (newTask) => {
    setTodoList([...todoList, newTask]);
  }

  const updateTodoList = (task) => {
    const newList = [...todoList];

    newList.forEach((item, index) => {
      if (item._id === task._id) {
        item.isCompleted = task.isCompleted
      }
    });

    setTodoList(newList);

  };

  const removeTodo = (task) => {
    const newList = todoList.filter(item => item._id !== task._id);

    setTodoList(newList);
  };

  const updateTask = (task) => {
    const newList = [...todoList];

    newList.forEach((item, index) => {
      if (item._id === task._id) {
        item.todo = task.todo
      }
    });

    setTodoList(newList);

  };

  return (
    <>
      <Addtask addTodoTask={addTodoTask} />
      <TodoList todoList={todoList} updateTodoList={updateTodoList} removeTodo={removeTodo} taskToUpdate={task => setTaskToUpdate(task)} togglePopup={() => setShowPopup(!showPopup)} />
      {
        showPopup && <UpdateTask task={taskToUpdate} updateTask={updateTask} togglePopup={() => setShowPopup(!showPopup)} />
      }
    </>
  );
}

export default App;
