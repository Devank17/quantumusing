// Import necessary libraries and components
import React from "react";
import { motion } from "framer-motion"; // For animations
import Header from "./../Components/Nav"; // Navigation component
import Footer from "./../Components/Footer"; // Footer component

// AboutPage component
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#030014] text-white font-sans">
      {/* Top Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-screen text-center px-6">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(11,15,64,0.7) 10%,rgba(3,0,20,1) 100%)]"></div>

        {/* Floating animated glow element (top-left) */}
        <motion.div
          className="absolute top-16 left-16 w-32 h-32 bg-blue-500 blur-[80px] opacity-50"
          animate={{ x: [0, 30, -30, 0], y: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
        />

        {/* Floating animated glow element (bottom-right) */}
        <motion.div
          className="absolute bottom-16 right-16 w-40 h-40 bg-green-500 blur-[90px] opacity-50"
          animate={{ x: [0, -20, 20, 0], y: [0, -20, 20, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
        />

        {/* Main heading with animation */}
        <motion.div
          className="relative flex flex-col items-center z-5 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500 drop-shadow-lg">
            Welcome to Quantum Musing
          </h1>
          <p className="mt-5 text-gray-300 text-xl leading-relaxed max-w-3xl">
            <strong>Exploring the Future of Quantum Science and Technology.</strong>
            We bring together quantum computing, AI, and futuristic innovations to push the boundaries of what’s possible.
          </p>
        </motion.div>
      </section>

      {/* About Us Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Image container with animation and overlay */}
          <motion.div
            className="relative bg-opacity-20 bg-white rounded-xl backdrop-blur-lg border border-gray-600 p-6 flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src="https://source.unsplash.com/600x600/?quantum,science"
              alt="Quantum Concept"
              className="rounded-xl"
            />
            {/* Dark overlay for better readability */}
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)] rounded-xl"></div>
          </motion.div>

          {/* Mission text with animation */}
          <motion.div
            className="text-white"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-green-400">Our Mission</h2>
            <p className="text-gray-300 mt-4 leading-relaxed text-lg">
              At <strong>Quantum Musing</strong>, we are driven by the desire to make the <strong>complex world of quantum computing and AI accessible to everyone</strong>.
            </p>
            <p className="text-gray-300 mt-6 leading-relaxed text-lg">
              Through <strong>interactive courses, deep research insights, and engaging discussions</strong>, we aim to build a global community that <strong>pushes the boundaries of quantum technology</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* Core values text with animation */}
          <motion.div
            className="text-white"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-blue-400">Our Core Values</h2>
            <p className="text-gray-300 mt-4 leading-relaxed text-lg">
              We believe that <strong>quantum science is the key to the future</strong>. Our values reflect <strong>innovation, accessibility, and a commitment to knowledge-sharing</strong>.
            </p>
            <ul className="list-disc list-inside mt-6 space-y-2 text-gray-400">
              <li><span className="text-green-400 font-semibold">Innovation:</span> Pioneering new ideas in quantum technology.</li>
              <li><span className="text-green-400 font-semibold">Education:</span> Making quantum science accessible to all.</li>
              <li><span className="text-green-400 font-semibold">Community:</span> Building a network of enthusiasts and professionals.</li>
            </ul>
          </motion.div>

          {/* Image with glow background */}
          <motion.div
            className="relative bg-opacity-20 bg-white rounded-xl backdrop-blur-lg border border-gray-600 p-6 flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src="https://source.unsplash.com/600x600/?ai,future"
              alt="Quantum Research"
              className="rounded-xl"
            />
            {/* Dark overlay for image contrast */}
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)] rounded-xl"></div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-24 text-center bg-gradient-to-b from-[#030014] to-[#121212]">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl font-bold text-green-400 drop-shadow-lg">
            Join the Quantum Revolution 🚀
          </h2>
          <p className="text-gray-400 mt-6 text-lg leading-relaxed">
            The future is <strong>Quantum</strong>. Be part of <strong>the movement</strong> that is <strong>reshaping technology, security, and AI</strong>. Let’s <strong>build the future together</strong>.
          </p>

          {/* Get Started button with hover animation */}
          <motion.button
            className="mt-10 px-8 py-3 rounded-full text-lg font-semibold bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;