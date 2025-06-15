import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = ({ closeContactForm }) => {
  // Form data state to hold input field values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    queryType: 'General Inquiry',
    message: ''
  });

  // Loading, error, and success state for form submission
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handles input changes and sanitizes contact number input
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    // Custom logic to clean phone input
    if (name === "contact") {
      let hasPlus = value.startsWith('+'); // Allow only one '+' at the beginning
      let spaceCount = (value.match(/ /g) || []).length;

      // Remove all characters except digits, '+', and space
      newValue = value.replace(/[^\d+\s]/g, '');

      // Ensure '+' is only at the start
      if (hasPlus) {
        newValue = '+' + newValue.replace(/\+/g, '');
      } else {
        newValue = newValue.replace(/\+/g, '');
      }

      // Allow only one space in phone number
      if (spaceCount > 1) {
        const firstSpaceIndex = newValue.indexOf(' ');
        newValue = newValue.replace(/ /g, '');
        newValue = newValue.slice(0, firstSpaceIndex) + ' ' + newValue.slice(firstSpaceIndex);
      }
    }

    // Update form data state
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submit behavior
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Send POST request to backend
      const response = await fetch('http://localhost:4000/api/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      console.log(result);

      // Handle response errors
      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong!');
      }

      // Show success message and reset form
      setSuccess('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        contact: '',
        queryType: 'General Inquiry',
        message: ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Fullscreen backdrop with animation
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={closeContactForm}
    >
      {/* Animated modal container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[#2c2c2c] rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 relative border border-black"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal on inner click
      >
        {/* Close button */}
        <button
          onClick={closeContactForm}
          className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-800"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal heading */}
        <div className="text-center mb-5">
          <h2 className="text-xl font-semibold text-white mb-1">Contact Us</h2>
          <p className="text-sm text-gray-400">We'll respond within 24 hours</p>
        </div>

        {/* Feedback messages */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center">{success}</p>}

        {/* Contact form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name input */}
          <div className="space-y-1">
            <label className="text-sm pl-1 font-medium text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-sm bg-black border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all placeholder-gray-500"
              placeholder="Your name"
              required
            />
          </div>

          {/* Email input */}
          <div className="space-y-1">
            <label className="text-sm pl-1 font-medium text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-sm bg-black border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all placeholder-gray-500"
              placeholder="your@email.com"
              required
            />
          </div>

          {/* Phone input */}
          <div className="space-y-1">
            <label className="text-sm pl-1 font-medium text-gray-300">Phone</label>
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-sm bg-black border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all placeholder-gray-500"
              placeholder="+91 3456789012"
              required
            />
          </div>

          {/* Query type dropdown */}
          <div className="space-y-1">
            <label className="text-sm pl-1 font-medium text-gray-300">Subject</label>
            <select
              name="queryType"
              value={formData.queryType}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-sm bg-black border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all appearance-none"
              required
            >
              <option value="General Inquiry">General Inquiry</option>
              <option value="Technical Support">Technical Support</option>
              <option value="Career Opportunity">Career Opportunity</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Message textarea */}
          <div className="space-y-1">
            <label className="text-sm pl-1 font-medium text-gray-300">Message</label>
            <textarea
              name="message"
              rows="3"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm bg-black mt-1 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none placeholder-gray-500"
              placeholder="How can we help you?"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 px-4 text-white text-sm font-medium rounded-lg transition-all transform hover:scale-[1.02] active:scale-95 ${
              loading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
            }`}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ContactForm;