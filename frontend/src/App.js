import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddTag from './components/tags';
import AddTask from './components/tasks';
import TaskList from './components/task_list'
import AddUser from './components/users';
// import Home from './components/home';
import { Link } from 'react-router-dom';
import TagList from './components/tag_lists';
import UserList from './components/user_lists';


const App = () => {
  return (
    <Router>
        <div>
          <h1>Data Management</h1>
          
          <AddTag />
          <AddUser />
          <TaskList />
          <TagList />
          <UserList />
      </div>
    </Router>
)
};

export default App;
