import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Routes
import Navbar from './components/navigation';
import Home from './pages/home';
import AddUser from './pages/users';
import AddTask from './pages/tasks';
import TaskList from './pages/task_list'
import Tips from './pages/tips'
import AddTag from './pages/tags';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import CSS styles
import { UserProvider } from './components/user_context';

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks/add" element={<AddTask />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/tasks/all" element={<TaskList />} />
          <Route path="/tags/add" element={<AddTag />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/calendar" element={<Calendar />} />
          {/* <Route path="*" element={<NotFound />} /> New */}
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;