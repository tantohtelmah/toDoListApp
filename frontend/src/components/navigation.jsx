import React from 'react';
import { Link } from 'react-router-dom';
// import { useContext } from 'react';
// import { AuthContext } from './auth-context';

const Navbar = () => {

  // const { user, isLoggedIn } = useContext(AuthContext);

  return (
    <nav id="navbar" className="navbar bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center py-4">
            <div className="flex justify-between sm:ml-6 sm:flex sm:space-x-8 items-center">
              {/* Left side of Navbar */}
              <div className='flex items-center'>
                <Link to="/" className="flex-shrink-0 items-center">
                  <img src="./images/to-do-list.png" className="h-8 w-8 object-contain" alt="Logo" />
                </Link>
                <Link to="/" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                <Link to="/tasksList" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Tasks</Link>
                <Link to="/tagsList" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Tags</Link>
                <Link to="/tips" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Tips</Link>
                <Link to="/calender" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Calender</Link>
                <Link to="/user" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Tasks</Link>
              </div>
              {/* Right side of Navbar */}
              <div className='flex items-center'>
                <Link to="/users/add" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Sign Up</Link>
              </div>
                {/* {isLoggedIn ? (
                  <span className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                    {user.name}
                  </span>
                ) : (
                  <Link to="/signup" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Sign Up</Link>
                )} */}
                {/* ... */}
            </div>
          </div>
          {/* ... */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;