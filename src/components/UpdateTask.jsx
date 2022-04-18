import { useState } from 'react'
import axios from 'axios'
import './UpdateTask.css'


const UpdateTask = ({ task, updateTask, togglePopup }) => {

    const [updatedtask, setUpdatedTask] = useState(task.todo);

    const taskUpdation = async () => {
        if (updatedtask.trim() === '' || task.todo === task) return;

        try {
            const response = await axios.put(`https://to2s.herokuapp.com/api/tasks/${task._id}`, {
                _id: task._id,
                todo: updatedtask,
                isCompleted: task.isCompleted
            })

            togglePopup();
            updateTask(response.data);

            console.log(response.data);
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='popup'>

            <div className="popup-content">
                <input type="text" placeholder="Update Task" value={updatedtask} onChange={(e) => setUpdatedTask(e.target.value)} />
                <div className="buttons">
                <button onClick={() => taskUpdation()} >Update</button>
                <button onClick={() => togglePopup()} >Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateTask