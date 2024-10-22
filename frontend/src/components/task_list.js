
import React, { useEffect, useState } from 'react';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('/tasks/all')
            .then(response => response.json())
            .then(data => setTasks(data));
    }, []);

    return (
        <div>
            <h1>Task List</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.title}: {task.description}</li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
