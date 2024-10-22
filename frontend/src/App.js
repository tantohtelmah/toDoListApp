import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddTag from './components/tags';
import AddTask from './components/tasks';
import TaskList from './components/task_list'
import AddUser from './components/users';
// import Home from './components/home';
import { Link } from 'react-router-dom';
import TagList from './components/tag_lists';


const App = () => {
  return (
    <Router>
        {/* <div>
            <nav className="bg-gray-800 p-4">
                <div className="flex justify-between items-center">
                    <div className="text-white font-bold">Task Manager</div>
                    <div>
                        <Link to="/" className="text-white mr-4">Home</Link>
                        <Link to="/add-task" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Task</Link>
                    </div>
                </div>
            </nav>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/add-task" component={AddTask} />
            </Switch>
        </div> */}
        <div>
          <h1>Data Management</h1>
          <AddTask />
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
