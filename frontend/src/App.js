import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Routes
import Navbar from './components/navigation';
import Home from './pages/home';
import AddUser from './pages/users';
import AddTask from './pages/tasks';

import AddTag from './pages/tags';
import TaskList from './pages/task_list'
import { Link } from 'react-router-dom';
import TagList from './pages/tag_lists';
import UserList from './pages/user_profile';


const App = () => {
	return (
	  <Router>
		<Navbar />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/tasks/add" element={<AddTask />} />
			<Route path="/users/add" element={<AddUser />} />
		</Routes>
	  </Router>
	);
  }

export default App;
