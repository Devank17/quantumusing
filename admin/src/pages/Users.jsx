import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import { motion } from 'framer-motion';

const Users = () => {
  // State to store the list of users
  const [users, setUsers] = useState([]);

  // Fetch users from the API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetching users from the backend API
        const response = await fetch('http://localhost:4000/api/admin/users');
        const data = await response.json();
        setUsers(data); // Update the state with fetched users
      } catch (error) {
        console.error('Error fetching users:', error); // Log any errors
      }
    };

    fetchUsers(); // Call the fetch function
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-["Inter"] flex'>
      {/* Sidebar menu */}
      <Menu />
      <div className='flex-1 py-8 px-6 lg:px-12'>
        {/* Page title with animation */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-4xl lg:text-5xl font-extrabold text-white mb-10'
        >
          Users
        </motion.h1>

        {/* Display message if no users are found */}
        {users.length === 0 ? (
          <p className="text-white">No users found.</p>
        ) : (
          // Display users in a responsive grid
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {users.map((user, index) => (
              <motion.div
                key={user._id || index} // Use unique key for each user
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }} // Stagger animation for each user
                className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-cyan-400/40 transition-all duration-300 transform hover:-translate-y-1'
              >
                {/* User name */}
                <h3 className='text-xl font-bold'>{user.name}</h3>
                {/* User email */}
                <p className='text-sm text-gray-300 mt-2'>
                  <strong>Email:</strong> {user.email}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
