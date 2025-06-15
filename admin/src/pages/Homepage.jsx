import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import { FaUserShield, FaAtom, FaGoogleScholar, FaTrash } from "react-icons/fa6";
import { PiQuestionFill } from "react-icons/pi";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from "axios";
import { motion } from 'framer-motion';

const Homepage = () => {
    // State to store user queries
    const [queries, setQueries] = useState([]);
    // State to store any errors
    const [error, setError] = useState(null);

    // Fetch user queries from the API on component mount
    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/queries");
                setQueries(response.data);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message);
            }
        };
        fetchQueries();
    }, []);

    // Handle deleting a query
    const handleDeleteQuery = async (queryId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this query?");
        if (!confirmDelete) return;
        try {
            await axios.delete(`http://localhost:4000/api/queries/${queryId}`);
            // Remove the deleted query from the state
            setQueries(queries.filter((q) => q._id !== queryId));
        } catch (err) {
            console.error('Error deleting query:', err);
            setError('Failed to delete query');
        }
    };

    // Handle marking a query as answered
    const handleMarkAsAnswered = async (queryId) => {
        try {
            const updatedQuery = await axios.put(`http://localhost:4000/api/queries/${queryId}`, {
                status: 'answered'
            });
            // Update the query status in the state
            setQueries(queries.map(q => q._id === queryId ? updatedQuery.data : q));
        } catch (err) {
            console.error('Error updating query:', err);
            setError('Failed to update query');
        }
    };

    return (
        <div className="min-h-screen min-w-fit bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-['Inter'] flex">
            {/* Sidebar Menu */}
            <Menu />
            <div className="flex-1 py-8 px-6 lg:px-12">
                {/* Page Title */}
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl lg:text-5xl font-extrabold text-white mb-10"
                >
                    Admin Dashboard 🚀
                </motion.h1>

                {/* Links Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Link
                        to="/admins"
                        className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-cyan-400/40 transition-all duration-300 transform hover:-translate-y-1 flex flex-col gap-2"
                    >
                        <h2 className="text-xl font-bold flex items-center gap-3">
                            <span className="text-cyan-300 text-2xl group-hover:scale-125 transition-transform duration-300">
                                <FaUserShield />
                            </span>
                            Admin Settings
                        </h2>
                        <p className="text-sm text-gray-200 mt-1">Configure application settings.</p>
                    </Link>

                    <Link
                        to="/courses"
                        className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-cyan-400/40 transition-all duration-300 transform hover:-translate-y-1 flex flex-col gap-2"
                    >
                        <h2 className="text-xl font-bold flex items-center gap-3">
                            <span className="text-cyan-300 text-2xl group-hover:scale-125 transition-transform duration-300">
                                <FaGoogleScholar />
                            </span>
                            Course Management
                        </h2>
                        <p className="text-sm text-gray-200 mt-1">Manage courses on your Website.</p>
                    </Link>
                    
                    <a
                        href="http://localhost:3000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-cyan-400/40 transition-all duration-300 transform hover:-translate-y-1 flex flex-col gap-2"
                    >
                        <h2 className="text-xl font-bold flex items-center gap-3">
                            <span className="text-cyan-300 text-2xl group-hover:scale-125 transition-transform duration-300">
                                <FaAtom />
                            </span>
                            Go to the Website
                        </h2>
                        <p className="text-sm text-gray-200 mt-1">Open the user-facing site.</p>
                    </a>
                </div>
                {/* Queries Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="mt-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-2xl"
                >
                    <h2 className="text-3xl font-bold text-cyan-300 flex items-center gap-3 mb-6">
                        <PiQuestionFill className="text-4xl" /> User Queries
                    </h2>

                    {/* Render each query */}
                    {queries.map((query) => (
                        <div
                            key={query._id}
                            className="bg-white/5 border border-white/10 rounded-xl p-5 mb-5 hover:shadow-md hover:shadow-cyan-500/20 transition-all"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    {/* Query details */}
                                    <p className="text-lg font-semibold">👤 {query.name}</p>
                                    <p className="text-sm text-gray-300">📧 {query.email}</p>
                                    <p className="text-sm text-gray-300">📱 {query.contact}</p>
                                    <p className="text-sm text-gray-300">📌 Type: {query.queryType}</p>
                                    <p className="text-sm text-gray-300">📝 Message: {query.message}</p>
                                    <p className={`mt-1 text-sm font-semibold ${query.status === 'answered' ? 'text-green-400' : 'text-red-400'}`}>
                                        Status: {query.status}
                                    </p>
                                </div>
                                {/* Delete query button */}
                                <button
                                    onClick={() => handleDeleteQuery(query._id)}
                                    className="text-red-400 hover:text-red-300 transition duration-200 hover:scale-110"
                                    title="Delete Query"
                                >
                                    <FaTrash size={22} />
                                </button>
                            </div>

                            {/* Mark as answered button */}
                            {query.status === 'unanswered' && (
                                <div className="mt-4">
                                    <button
                                        onClick={() => handleMarkAsAnswered(query._id)}
                                        className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg transition shadow-lg hover:shadow-green-300/40"
                                    >
                                        ✅ Mark as Answered
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Homepage;
