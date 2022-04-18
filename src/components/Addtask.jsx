import axios from 'axios';
import { useState } from 'react'
import './Addtask.css'

const Addtask = ({ addTodoTask }) => {

    const [task, setTask] = useState('');


    const addTask = async (e) => {

        e.preventDefault();

        if (task.trim() === '') return

        try {

            const response = await axios.post('https://to2s.herokuapp.com/api/tasks', {
                todo: task,
                isCompleted: false
            });
            setTask('');
            addTodoTask(response.data);

        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div className="addtask" >
            <form onSubmit={addTask}>
                <input type="text" placeholder="Add Task..." value={task} onChange={e => setTask(e.target.value)} />
                <button type="submit" >Add Task</button>
            </form>
        </div>
    )
}

export default Addtask