import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../components/user_context';
import { useContext } from 'react';


function AddTask() {

  const { user } = useContext(UserContext);
  useEffect(() => {
    console.log('User in AddTask:', user, user.id);
  }, [user]); // Log user changes

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});


  const addTask = async (data) => {
    const handleRedirect = () => {
      alert('Please login to use your ToDo List app');
      navigate('/users/add', { replace: true });
    };

    if (!user || !user.id) {
      handleRedirect();
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/tasks/add', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        const taskId = response.data.id;
        await assignTaskToUser(taskId);
        return taskId;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw error;
    }
  };


  const assignTaskToUser = async (taskId) => {
    try {
      console.log(user.id)
      const response = await axios.put(`http://localhost:5000/users/${user.id}/tasks`, {
        task_id: taskId,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        console.log("okay here")
        return true;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    if (!name || !title || !description || !dueDate) {
      alert('Please fill in all required fields.');
      setLoading(false);
      return;
    }
    const data = { name, title, description, due_date: dueDate, status };

    try {
      const taskAdded = await addTask(data);
      if (taskAdded) {
        alert('Task added and assigned successfully!');
      } else {
        alert('Failed to add task.');
      }
    } catch (error) {
      console.error('There was an error!', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col max-w-md mx-auto bg-gray-500 rounded-xl shadow-md overflow-hidden md:max-w-2xl m-8 p-10 mt-2 h-1/2'>
        <div className='flex flex-col m-4 p-4'>
          <div>
            <h1 className='font-bold text-l'>Add Task</h1>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <label>Name:</label><br />
              <input className='rounded-md m-2 p-2 w-1/2' type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
              <label>Title:</label><br />
              <input className='rounded-md m-2 p-2 w-1/2' type="text" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
              <label>Description:</label><br />
              <input className='rounded-md m-2 p-2 w-1/2' type="text" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
              <label>Due Date:</label><br />
              <input className='rounded-md m-2 p-2 w-1/2' type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /><br />
              <label>Status:</label><br />
              <input className='rounded-md m-2 p-2 w-1/2' type="text" value={status} onChange={(e) => setStatus(e.target.value)} /><br /><br />
              <div className='flex justify-center items-center m-4'>
                <button className='roundrd-l m-2 p-2 w-1/3 bg-amber-400 hover:bg-amber-700 text-white font-bold' type="submit" disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
              </div>
            </form>
          </div>
      </div>
    </div>
  );
}

export default AddTask;
