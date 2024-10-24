import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';


function Home() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/', { replace: true });
  };

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/tasks/all')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);


  return (
    <div className="flex flex-col max-w-md mx-auto bg-gray-500 rounded-xl shadow-md overflow-hidden md:max-w-2xl m-8 p-10 mt-2 h-1/2">
      <div className="flex flex-col">
        <div className="flex flex-col md:flex">
          <div className="p-8">
            <h1 className="text-3xl font-bold">Welcome Tantoh</h1>
          </div>
          <div className="p-8">
            <h1 className="text-xl font-bold">Tuesday, 15th October 2024 <br /> 16:00pm</h1>
          </div>
          <div>
            <div className="md:flex flex flex-col">
              <div className="flex flex-col m-4 mt-1 p-6 ">
                <h1 className="text-2xl font-bold">Upcoming Tasks</h1>
                <div className="text-neutral-500">
                  <div className="flex justify-left items-center max-w-2xl rounded-md bg-white shadow-md m-4 p-6 hover:bg-amber-400 hover:m-2">
                    <h1>
                    <p>
                      <b>
                        Task: 
                        {tasks.map((task) => (
                          <span key={task.id}>{task.title}</span>
                        ))}
                      </b>
                      <br />
                      Description: 
                      {tasks.map((task) => (
                          <span key={task.id}>{task.description}</span>
                        ))} <br />
                    </p>
                      
                      Due date: 
                      {tasks.map((task) => (
                          <span key={task.id}>{task.due_date}</span>
                        ))} <br />
                      Status: 
                      {tasks.map((task) => (
                          <span key={task.id}>{task.status}</span>
                        ))}
                    </h1>
                  </div>
                  <div className="flex justify-left items-center max-w-2xl rounded-md bg-white shadow-md m-4 p-6 hover:bg-amber-400 hover:m-2">
                    <h1>
                      <b>Task: Visit Lum</b> <br />
                      Description: Sort the giveaway for the children's fair in church <br />
                      Due date: 24/10/2024 <br />
                      Status: Pending
                    </h1>
                  </div>
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