
import React, { useEffect, useState } from 'react';

function TagList() {
    const [tasks, setTag] = useState([]);

    useEffect(() => {
        fetch('/tags/all')
            .then(response => response.json())
            .then(data => setTasks(data));
    }, []);

    return (
        <div>
            <h1>Task List</h1>
            <ul>
                {tasks.map(task => (
                    <li key={tag.id}>{task.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default TagList;
