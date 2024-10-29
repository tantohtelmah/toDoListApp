import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [checkedTasks, setCheckedTasks] = useState([]);
    const [alert, setAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    var tasksCounter = 1;

    useEffect(() => {
        const fetchTasks = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/tasks/all`);
                const data = await response.json();
                setTasks(data);
                tasksCounter++
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTasks();
    }, []);

    const handleCheck = (taskId) => {
        const updatedCheckedTasks = checkedTasks.includes(taskId) 
          ? checkedTasks.filter((id) => id !== taskId) 
          : [...checkedTasks, taskId];
        setCheckedTasks(updatedCheckedTasks);
      };
    
      const handleDelete = async () => {
        if (checkedTasks.length === 0) return;
    
        const confirmDelete = window.confirm('Are you sure you want to delete?');
        if (confirmDelete) {
          await Promise.all(checkedTasks.map((taskId) => fetch(`/tasks/delete/${taskId}`, { method: 'DELETE' })));
          setTasks(tasks.filter((task) => !checkedTasks.includes(task.id)));
          setCheckedTasks([]);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='flex flex-col max-w-md mx-auto bg-gray-500 rounded-xl shadow-md overflow-hidden md:max-w-2xl m-8 p-10 mt-2 h-1/2'>
            <div>
                {alert && <p style={{ color: 'red' }}>Deleted successfully!</p>}
                <table className='table-auto border-separate border-spacing-2 border border-slate-500 hover:m-1 md:border-spacing-4'>
                    <thead>
                    <tr>
                        <th>Select</th>
                        <th>Task Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                        <td>
                            <input
                            type="checkbox"
                            checked={checkedTasks.includes(task.id)}
                            onChange={() => handleCheck(task.id)}
                            />
                        </td>
                        <td>{task.name}</td>
                        <td>{task.description}</td>
                        <td>
                            <Link to={`/tasks/edit/${task.id}`}>Edit</Link>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className='flex justify-center items-center m-4'>
                    <button className='rounded-xl m-2 p-2 w-1/3 bg-amber-400 hover:bg-amber-700 text-white font-bold' onClick={handleDelete}>Delete Selected</button>
                </div>
                </div>
        </div>
    );
}

export default TaskList;
