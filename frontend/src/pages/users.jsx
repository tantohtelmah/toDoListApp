import axios from 'axios';
import React, { useState } from 'react';
import UserProfile from './user_profile';

const AddUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Handling...")
      if (!email || !password || !first_name || !last_name) {
        alert('Please fill in all required fields.');
        return;
      }
      const user = { email, password, first_name, last_name };
    await axios.post('http://localhost:5000/users/add', user, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(user => {
        console.log('Success:', user);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <><div>
    <h1>Add User</h1>
    <form onSubmit={handleSubmit}>
      <label>Email:</label><br />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
      <label>Password:</label><br />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
      <label>First Name:</label><br />
      <input type="text" value={first_name} onChange={(e) => setFirst_name(e.target.value)} /><br />
      <label>last Name:</label><br />
      <input type="text" value={last_name} onChange={(e) => setLast_name(e.target.value)} /><br />
      <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
    </form>
    </div></>


  );
};

export default AddUser;
