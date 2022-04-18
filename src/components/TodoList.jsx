import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';

import './TodoList.css'

const TodoList = ({ todoList, updateTodoList, removeTodo, taskToUpdate, togglePopup }) => {

    const taskComplete = async (task) => {
        try {

            const res = await axios.put(`https://to2s.herokuapp.com/api/tasks/${task._id}`, {
                _id: task._id,
                todo: task.todo,
                isCompleted: !task.isCompleted
            });

            updateTodoList(res.data);

        } catch (error) {
            console.log(error);
        }


    };


    const removeTask = async (id) => {
        try {

            const res = await axios.delete(`https://to2s.herokuapp.com/api/tasks/${id}`);

            removeTodo(res.data);
        } catch (error) {
            console.log(error);
        }

    };



    const todos = todoList.map((task, index) => (

        <li key={index}>
            <div style={{ display: 'flex', alignItems: 'center' }} >
                    <CheckIcon className={task.isCompleted ? 'isCompleted' : 'checkicon'} />
                <p className={task.isCompleted ? 'taskcomplete' : ''} onClick={() => {
                    taskComplete(task)
                }}>{task.todo}</p>
            </div>
            <div>
                <IconButton onClick={() => { taskToUpdate(task); togglePopup() }}>
                    <EditIcon className='edit' />
                </IconButton>
                <IconButton onClick={() => removeTask(task._id)} >
                    <CloseIcon className='close' />
                </IconButton>
            </div>
        </li>
    ));

    return (
        <div className="tasklist" >
            <ul>
                {todos}
            </ul>
        </div>
    )
}

export default TodoList