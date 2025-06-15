import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLogOut } from "react-icons/io5";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      navigate('/login');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="relative flex items-center pl-5 pb-5 text-gray-300 hover:text-red-500 hover:bg-gray-700 rounded-lg transition-colors duration-200 group scale-150"
    >
      <IoLogOut className="text-xl" />
      <span
        className="absolute left-full ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transform -translate-x-2 transition-all duration-300 text-sm"
      >
        Logout
      </span>
    </button>
  );
};

export default Logout;