
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddTask() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');
  // const history = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Handling...")
      if (!name || !title || !description || !dueDate) {
        alert('Please fill in all required fields.');
        return;
      }
      const data = { name, title, description, due_date: dueDate, status };

      try {
        const response = await axios.post('http://localhost:5000/tasks/add', data, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
          });
          console.log("Handling here...");
    
          if (response.status === 201) {
              alert('Task added successfully!');
          } else {
            alert('Failed to add task.');
          }
        
      } catch (error) {
            console.error('There was an error!', error);
            alert('Failed to add data.');
      }
    };

    return (
        <div>
            <h1>Add Task</h1>
            <form onSubmit={handleSubmit}>
                <label>Name:</label><br />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /><br />
                <label>Title:</label><br />
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required /><br />
                <label>Description:</label><br />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required /><br />
                <label>Due Date:</label><br />
                <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /><br />
                <label>Status:</label><br />
                <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} /><br /><br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddTask;

