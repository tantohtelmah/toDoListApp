import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddTask() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(false);

  const addTask = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/tasks/add', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        console.log("okay here");
        console.log(response.data.id);
        return response.data.id;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw error;
    }
  };


  const assignTaskToUser = async (userId, taskId) => {
    try {
      const response = await axios.put('http://localhost:5000/users/${userId}/tasks', {
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
      const taskId = await addTask(data);
      console.log(taskId);
      if (taskId) {
        console.log(taskId);
        await assignTaskToUser(1, taskId); // Replace with actual user ID
        alert('Task added and assigned successfully!');
        navigate('/tasks'); // Redirect to tasks page
      } else {
        console.log(taskId);
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
    <div>
      <h1>Add Task</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label><br />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br />
        <label>Title:</label><br />
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
        <label>Description:</label><br />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
        <label>Due Date:</label><br />
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /><br />
        <label>Status:</label><br />
        <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} /><br /><br />
        <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
      </form>
    </div>
  );
}

export default AddTask;