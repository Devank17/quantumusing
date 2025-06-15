import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';

const Admins = () => {
    // State to store the list of admins
    const [admins, setAdmins] = useState([]);
    // State to store the currently logged-in admin
    const [currentAdmin, setCurrentAdmin] = useState(null);
    // State to store the new admin details
    const [newAdmin, setNewAdmin] = useState({ 
        name: '', 
        email: '', 
        password: '' 
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Function to fetch the list of admins from the server
        const fetchAdmins = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/admin/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch admins');
                }

                const data = await response.json();
                // Ensure the data is an array before setting it
                setAdmins(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching admins:', error);
                alert(error.message);
            }
        };

        // Decode the token to get the current admin's details
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            setCurrentAdmin(decoded);
        }

        // Fetch admins on component mount
        fetchAdmins();
    }, []);

    // Handle input changes for the new admin form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAdmin(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission to add a new admin
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate that all fields are filled
        if (!newAdmin.name || !newAdmin.email || !newAdmin.password) {
            alert('Please fill out all fields.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:4000/api/admin/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(newAdmin),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }
    
            const data = await response.json();
            // Add the new admin to the list of admins
            setAdmins([...admins, { 
                id: data.id, 
                name: data.name, 
                email: data.email 
            }]);
            
            // Reset the form fields
            setNewAdmin({ name: '', email: '', password: '' });
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="min-h-fit min-w-fit bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-['Inter'] flex ">
            <Menu />
            <div className="flex-1 flex flex-col px-6 py-8">
                
                {/* Welcome Header */}
                <h1 className="text-3xl lg:text-5xl font-bold text-white mb-6">Welcome...</h1>

                {/* Admin Profile Card */}
                <div className="flex flex-col lg:flex-row lg:gap-8 justify-between mb-12">
                    <div className="flex flex-col items-center lg:w-1/2 bg-gray-700 p-6 rounded-lg shadow-lg">
                        <FaUserCircle size={50} className="text-gray-400" />
                        <h1 className="text-white mt-4 text-xl lg:text-2xl">
                            {currentAdmin ? currentAdmin.name : 'Loading...'}
                        </h1>
                        <p className="text-sm text-gray-300 mt-2">Currently logged-in admin</p>
                    </div>

                    {/* Add New Admin Form */}
                    <div className="lg:w-1/2 mt-8 lg:mt-0">
                        <h1 className="text-2xl lg:text-3xl text-white mb-4 font-extrabold">Add a New Admin</h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="text-white text-sm lg:text-xl" htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={newAdmin.name}
                                    onChange={handleChange}
                                    className="p-3 w-full bg-gray-800 text-white border border-gray-600 rounded"
                                    placeholder="Enter admin name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-white text-sm lg:text-xl" htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={newAdmin.email}
                                    onChange={handleChange}
                                    className="p-3 w-full bg-gray-800 text-white border border-gray-600 rounded"
                                    placeholder="Enter admin email"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-white text-sm lg:text-xl" htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={newAdmin.password}
                                    onChange={handleChange}
                                    className="p-3 w-full bg-gray-800 text-white border border-gray-600 rounded"
                                    placeholder="Enter password"
                                    required
                                />
                            </div>
                            <button type="submit" className="p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-200">
                                Add Admin
                            </button>
                        </form>
                    </div>
                </div>

                {/* Admins Table */}
                <div>
                    <h1 className="text-3xl lg:text-5xl font-bold mb-6 text-white">Admins</h1>
                    <div className="overflow-x-auto bg-gray-700 rounded-lg shadow-lg">
                        <table className="w-full text-left">
                            <thead className="bg-gray-900">
                                <tr>
                                    <th className="text-blue-300 px-4 py-4 text-sm lg:text-xl">ID</th>
                                    <th className="text-blue-300 px-4 py-4 text-sm lg:text-xl">Name</th>
                                    <th className="text-blue-300 px-4 py-4 text-sm lg:text-xl">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admins.map((admin, index) => (
                                    <tr key={admin._id || index} className={`hover:bg-blue-900 transition-all duration-300 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}`}>
                                        <td className="text-white px-4 py-4">{admin._id}</td>
                                        <td className="text-white px-4 py-4">{admin.name}</td>
                                        <td className="text-white px-4 py-4">{admin.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Back Button */}
                <button 
                    onClick={() => navigate(-1)} 
                    className="mt-8 py-3 px-6 bg-blue-600 text-white rounded hover:bg-red-700 transition-all duration-200"
                >
                    ← Go Back
                </button>
            </div>
        </div>
    );
};

export default Admins;
