import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserContext } from '../components/user_context';
import { useContext } from 'react';

function Home() {
  const navigate = useNavigate();
  const [date] = useState(new Date());
  const context = useContext(UserContext);
  const { user, setUser } = context;

  const handleNavigate = () => {
    navigate('/', { replace: true });
  };

  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch('/tasks/all')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const formatDate = (date) => {
    const day = date.toLocaleString('en-us', { weekday: 'long' });
    const dateString = date.toLocaleDateString('en-GB');
    const time = date.toLocaleTimeString('en-GB');

    return `${day}, ${dateString} ${time}`;
  };


  return (
    <div className="flex flex-col max-w-md mx-auto bg-gray-500 rounded-xl shadow-md overflow-hidden md:max-w-2xl m-8 p-10 mt-2 h-1/2">
      <div className="flex flex-col">
        <div className="flex flex-col md:flex">
          <div className="p-8 pb-4">
            <h1 className="text-3xl font-bold">Welcome, {user && user.last_name}</h1>
          </div>
          <div className="p-8">
            <h1 className="text-xl font-bold">{formatDate(date)}</h1>
          </div>
          <div>
            <div className="md:flex flex flex-col">
              <div className="flex flex-col m-4 mt-1 p-6 ">
                <h1 className="text-2xl font-bold">Upcoming Tasks</h1>
                <div className="text-neutral-500">
                  {tasks.length === 0 ? (
                    <p>No tasks</p>
                  ) : (
                    tasks.slice(0, 2).map((task) => (
                      <div key={task.id} className="flex justify-left items-center max-w-2xl rounded-md bg-white shadow-md m-4 p-6 hover:bg-amber-400 hover:m-2">
                        <h1>
                          <b>Task: {task.title}</b> <br />
                          Description: {task.description} <br />
                          Due date: {task.due_date} <br />
                          Status: {task.status}
                        </h1>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center m-4">
        <Link to="/tasks/add">
          <button className="bg-amber-400 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded">
            Add Task
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
