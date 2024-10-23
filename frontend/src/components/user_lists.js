
import React, { useEffect, useState } from 'react';

function UserList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('/tasks/all')
            .then(response => response.json())
            .then(data => setTasks(data));
    }, []);

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {tasks.map(task => (
                    <div>
						<li key={user.id}>{user.email}{user.password}{user.first_name}{user.last_name}</li>
					</div>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
