import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import axios from 'axios';

const CreateBlog = () => {
  // State to manage the new blog data
  const [newBlog, setNewBlog] = useState({
    title: '',
    subTitle: '',
    author: '',
    thumbnail: '',
    heading: '',
    paragraphs: [''], // Initialize with one empty paragraph
  });

  // State to handle error messages
  const [error, setError] = useState(null);

  // State to handle loading state during form submission
  const [loading, setLoading] = useState(false);

  // Hook to navigate to different routes
  const navigate = useNavigate();

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  // Handle changes for individual paragraphs
  const handleParagraphChange = (index, value) => {
    const updatedParagraphs = [...newBlog.paragraphs];
    updatedParagraphs[index] = value;
    setNewBlog({ ...newBlog, paragraphs: updatedParagraphs });
  };

  // Add a new paragraph field
  const addParagraph = () => {
    setNewBlog({ ...newBlog, paragraphs: [...newBlog.paragraphs, ''] });
  };

  // Remove a specific paragraph field
  const removeParagraph = (index) => {
    const updatedParagraphs = newBlog.paragraphs.filter((_, i) => i !== index);
    setNewBlog({ ...newBlog, paragraphs: updatedParagraphs });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading state to true
      // Send a POST request to create a new blog
      await axios.post('http://localhost:4000/api/blogs', newBlog);
      navigate('/blog'); // Redirect to the blogs list after successful creation
    } catch (error) {
      console.error('Error creating blog:', error);
      setError('Failed to create blog'); // Set error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
      {/* Sidebar menu */}
      <Menu />
      <div className="flex-1 flex flex-col bg-gray-900 text-white overflow-y-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-blue-400">Create New Blog</h1>

        {/* Display error message if any */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Blog creation form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title input */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={newBlog.title}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Subtitle input */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Subtitle</label>
            <input
              type="text"
              name="subTitle"
              value={newBlog.subTitle}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter blog subtitle"
              required
            />
          </div>

          {/* Author input */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Author</label>
            <input
              type="text"
              name="author"
              value={newBlog.author}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter author name"
              required
            />
          </div>

          {/* Heading input */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Heading</label>
            <input
              type="text"
              name="heading"
              value={newBlog.heading}
              onChange={handleInputChange}
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter blog heading"
              required
            />
          </div>

          {/* Paragraphs input */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Paragraphs</label>
            {newBlog.paragraphs.map((paragraph, index) => (
              <div key={index} className="mb-3">
                <textarea
                  value={paragraph}
                  onChange={(e) => handleParagraphChange(index, e.target.value)}
                  className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder={`Paragraph ${index + 1}`}
                  required
                />
                {/* Remove paragraph button */}
                {newBlog.paragraphs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeParagraph(index)}
                    className="text-red-500 text-sm mt-2 hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {/* Add paragraph button */}
            <button
              type="button"
              onClick={addParagraph}
              className="text-blue-400 text-sm mt-2 hover:underline"
            >
              + Add Paragraph
            </button>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Blog'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
