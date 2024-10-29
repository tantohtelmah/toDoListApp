import axios from 'axios';
import React, { useState, createContext } from 'react';
import { UserContext } from '../components/user_context';
import { useContext } from 'react';
import AddTask from './tasks';
import { useEffect } from 'react';

// useContext usage
//import { createContext } from 'react';

const AddUser = () => {
    const { user, setUser } = useContext(UserContext); // Get user from context
    const [localUser, setLocalUser] = useState({ // Rename local user state
        email: '',
        password: '',
        first_name: '',
        last_name: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [userCreated, setUserCreated] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalUser((prevUser) => ({ ...prevUser, [name]: value }));
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!localUser.email || !localUser.password || !localUser.first_name || !localUser.last_name) {
        setErrors((prevErrors) => ({
            ...prevErrors,
            email: !localUser.email ? 'Required' : '',
            password: !localUser.password ? 'Required' : '',
            first_name: !localUser.first_name ? 'Required' : '',
            last_name: !localUser.last_name ? 'Required' : '',
        }));
        return;
        }    
        setLoading(true);
        const data = { email: localUser.email, password: localUser.password, first_name: localUser.first_name, last_name: localUser.last_name };
        try {
        const response = await axios.post('http://localhost:5000/users/add', data);
        if (response.status === 201) {
            const newUser = response.data;
            console.log('Created user: ', newUser, newUser.id)
            setUser(newUser); // Update user context
            alert('User created successfully!');
            setUserCreated(true);
        } else {
            throw new Error(response.data.message);
        }
        } catch (error) {
        if (error.response) {
            console.error('Server Response:', error.response.data);
        } else {
            console.error('Axios Error:', error.message);
        }
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className='flex flex-col max-w-md mx-auto bg-gray-500 rounded-xl shadow-md overflow-hidden md:max-w-2xl m-8 p-10 mt-2 h-1/2'>
            <div className='flex flex-col m-4 p-4'>
                <div>
                    <h1 className='font-bold text-l'>Add User</h1><br />
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>Email:</label><br />
                        <input className='rounded-md m-2 p-2 w-1/2' type="email" name="email" value={user.email} onChange={handleChange} /><br />
                        <label>Password:</label><br />
                        <input className='rounded-md m-2 p-2 w-1/2' type="password" name="password" value={user.password} onChange={handleChange} /><br />
                        <label>First Name:</label><br />
                        <input className='rounded-md m-2 p-2 w-1/2' type="text" name="first_name" value={user.first_name} onChange={handleChange} /><br />
                        <label>Last Name:</label><br />
                        <input className='rounded-md m-2 p-2 w-1/2' type="text" name="last_name" value={user.last_name} onChange={handleChange} /><br />
                        <div className='flex justify-center items-center m-4'>
                            <button className='rounded-xl m-2 p-2 w-1/3 bg-amber-400 hover:bg-amber-700 text-white font-bold' type="submit" disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
