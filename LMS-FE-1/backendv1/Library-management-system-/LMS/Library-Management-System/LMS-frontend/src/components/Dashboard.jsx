import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // Logout handler
  const handleLogout = () => {
    // Clear local storage or remove authentication tokens
    localStorage.removeItem('authToken');
    navigate('/login'); // Redirect to login page after logging out
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  // Close dropdown if clicking outside
  const handleOutsideClick = (e) => {
    if (isDropdownVisible && !e.target.closest('.dropdown-container')) {
      setDropdownVisible(false);
    }
  };

  // Add event listener for outside clicks
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isDropdownVisible]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      {/* Header */}
      <div className="w-full bg-gray-800 p-5 flex justify-between items-center">
        <div className="text-3xl font-bold">Logo Here</div>

        {/* Profile Section with Dropdown */}
        <div className="relative dropdown-container">
          <div 
            className="bg-gray-700 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
            onClick={toggleDropdown}
          >
            <span className="text-sm">Profile</span>
          </div>
          
          {/* Dropdown Menu */}
          {isDropdownVisible && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg">
              
              {/* <button
                onClick={() => navigate('/profile')} // Redirect to profile page
                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                View Profile
              </button> */}
              <button
                onClick={handleLogout} // Log out functionality
                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="flex flex-grow items-center justify-center gap-6 mt-10">
        <div 
          className="bg-gray-800 p-10 rounded-lg w-64 h-48 flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-all"
          onClick={() => navigate('/available-books')}
        >
          <span className="text-center text-lg font-semibold">Show Available Books</span>
        </div>

        <div 
          className="bg-gray-800 p-10 rounded-lg w-64 h-48 flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-all"
          onClick={() => navigate('/borrowed-books')}
        >
          <span className="text-center text-lg font-semibold">Show Borrowed Books</span>
        </div>

        <div 
          className="bg-gray-800 p-10 rounded-lg w-64 h-48 flex items-center justify-center hover:bg-gray-700 cursor-pointer transition-all"
          onClick={() => navigate('/borrow-return')}
        >
          <span className="text-center text-lg font-semibold">Borrow or Return Books</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
