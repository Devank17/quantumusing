import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  // State variables for email, password, and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if email and password fields are filled
    if (!email || !password) {
      setError('All fields are required!');
      return;
    }

    // Basic validation for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Ensure password meets minimum length requirement
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    // Prepare payload for API request
    const payload = { email, password };
    console.log('sending req to backend');
    try {
      console.log('Payload:', payload); // Debugging payload
      // Send login request to backend
      const response = await axios.post('http://localhost:4000/api/admin/login', payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // Include credentials (e.g., cookies)
      });
      console.log('Response:', response);

      // Handle unauthorized response
      if (response.status === 401) {
        setError('Unauthorized: Please check your email and password.');
        return;
      }

      // If login is successful, store token and admin data in localStorage
      if (response.data.token) {
        console.log('Login successful');
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('admin', JSON.stringify(response.data.admin));
        navigate('/'); // Redirect to home page
      }
    } catch (err) {
      // Handle errors and display appropriate error message
      setError(err.response?.data?.error || 'Login failed. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 shadow-2xl rounded-lg p-8 w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold text-gray-100 text-center mb-8">Admin Login</h2>

        {/* Display error message if any */}
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              className="w-full p-3 bg-gray-900 text-gray-100 border border-gray-700 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              className="w-full p-3 bg-gray-900 text-gray-100 border border-gray-700 rounded-lg"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;