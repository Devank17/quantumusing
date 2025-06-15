import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Blogs = () => {
  // State variables to manage blogs, selected blog, edit mode, and form data
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedBlog, setEditedBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch blogs from the API when the component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/blogs/');
        setBlogs(response.data.blogs || []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Handle blog deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
      setSelectedBlog(null);
    } catch (error) {
      console.error('Error deleting blog:', error);
      setError('Failed to delete blog');
    }
  };

  // Handle blog update
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/api/blogs/${editedBlog._id}`, editedBlog);
      setBlogs(blogs.map((blog) => (blog._id === editedBlog._id ? response.data : blog)));
      setEditMode(false);
      setSelectedBlog(response.data);
    } catch (error) {
      console.error('Error updating blog:', error);
      setError('Failed to update blog');
    }
  };

  // Handle input changes in the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBlog({ ...editedBlog, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-['Inter'] flex">
      {/* Sidebar menu */}
      <Menu />
      <div className="flex-1 py-8 px-6 lg:px-12">
        {/* Page title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-5xl font-extrabold text-white mb-5"
        >
          Blogs
        </motion.h1>

        {/* Loading and error messages */}
        {loading && <p className="text-cyan-300">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Button to create a new blog */}
        {(!loading && !error && !selectedBlog) && (
          <Link
            to="/blog/create"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-cyan-400/40 transition-all duration-300 transform hover:-translate-y-1"
          >
            Write a new Blog
          </Link>
        )}

        {/* List of blogs */}
        {!selectedBlog && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {blogs.map((blog) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-lg hover:shadow-cyan-400/40 transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => setSelectedBlog(blog)}
              >
                <h2 className="text-xl font-bold text-cyan-300">{blog.title}</h2>
                <p className="text-sm text-gray-200">{blog.subTitle}</p>
                <p className="text-sm text-green-400">Author: {blog.author}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Selected blog details */}
        {selectedBlog && !editMode && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-2xl"
          >
            <h1 className="text-4xl font-bold text-white mb-4">{selectedBlog.title}</h1>
            <p className="text-lg italic text-gray-400 mb-4">{selectedBlog.subTitle}</p>
            <p className="text-sm text-green-400 mb-2">Author: {selectedBlog.author}</p>
            <p className="text-sm text-yellow-400 mb-4">
              Created At: {new Date(selectedBlog.createdAt).toLocaleString()}
            </p>
            <p className="text-sm text-yellow-400 mb-4">
              Updated At: {new Date(selectedBlog.updatedAt).toLocaleString()}
            </p>
            <div className="mb-4">
              {selectedBlog.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-gray-300 leading-relaxed mb-4">{paragraph}</p>
              ))}
            </div>
            <div className="flex gap-4">
              {/* Edit button */}
              <button
                onClick={() => {
                  setEditMode(true);
                  setEditedBlog(selectedBlog);
                }}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 rounded hover:shadow-cyan-400/40 transition duration-200 flex items-center gap-2"
              >
                <FaEdit /> Edit
              </button>
              {/* Delete button */}
              <button
                onClick={() => handleDelete(selectedBlog._id)}
                className="bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 rounded hover:shadow-red-400/40 transition duration-200 flex items-center gap-2"
              >
                <FaTrash /> Delete
              </button>
              {/* Back button */}
              <button
                onClick={() => setSelectedBlog(null)}
                className="bg-gradient-to-r from-gray-500 to-gray-600 px-4 py-2 rounded hover:shadow-gray-400/40 transition duration-200"
              >
                Back
              </button>
            </div>
          </motion.div>
        )}

        {/* Edit blog form */}
        {editMode && (
          <div className="bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded shadow-lg w-full">
              <h2 className="text-2xl font-bold text-white mb-4">Edit Blog</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-white mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editedBlog.title}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-700 text-white rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-white mb-2">Subtitle</label>
                  <input
                    type="text"
                    name="subTitle"
                    value={editedBlog.subTitle}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-700 text-white rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-white mb-2">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={editedBlog.author}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-gray-700 text-white rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-white mb-2">Paragraphs</label>
                  {editedBlog.paragraphs.map((paragraph, index) => (
                    <textarea
                      key={index}
                      name={`paragraph-${index}`}
                      value={paragraph}
                      onChange={(e) =>
                        setEditedBlog({
                          ...editedBlog,
                          paragraphs: editedBlog.paragraphs.map((p, i) =>
                            i === index ? e.target.value : p
                          ),
                        })
                      }
                      className="w-full h-50 p-2 bg-gray-700 text-white rounded mb-2"
                      required
                    />
                  ))}
                </div>
                <div className="flex gap-4">
                  {/* Save button */}
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-green-600 to-green-500 text-white font-bold py-2 px-4 rounded-lg transition shadow-lg hover:shadow-green-300/40"
                  >
                    Save
                  </button>
                  {/* Cancel button */}
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="bg-gradient-to-r from-gray-500 to-gray-600 px-4 py-2 rounded hover:shadow-gray-400/40 transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
