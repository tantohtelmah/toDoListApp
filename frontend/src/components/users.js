import axios from 'axios';
import React, { useState } from 'react';

const AddUser = () => {
    const [email, setName] = useState('');
    const [password, setTitle] = useState('');
    const [first_name, setDescription] = useState('');
    const [last_name, setDueDate] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Handling...")
      if (!email || password || first_name || last_name) {
        alert('Please fill in all required fields.');
        return;
      }
      const data = { email, password, first_name, last_name };
    await axios.post('http://localhost:5000/user/add', data, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Add User</h1>
      <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" />
      <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" />
      <input type="text" name="first_name" value={user.first_name} onChange={handleChange} placeholder="First Name" />
      <input type="text" name="last_name" value={user.last_name} onChange={handleChange} placeholder="Last Name" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddUser;
