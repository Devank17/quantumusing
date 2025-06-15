import React from 'react';
import { motion } from 'framer-motion';
import Header from '../Components/Nav';
import ScrollingText from '../Components/ScrollerText';
import Footer from '../Components/Footer';
import '../App.css';

// Quantum particles generator with green theme
const generateQuantumParticles = (count) => {
  return Array.from({ length: count }).map((_, index) => {
    const size = Math.floor(Math.random() * 20) + 10;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const duration = Math.random() * 4 + 2;

    return (
      <motion.div
        key={index}
        className="absolute bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-40"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: `${top}%`,
          left: `${left}%`,
          filter: 'blur(4px)',
        }}
        animate={{ y: [0, -20, 20, 0], x: [0, 10, -10, 0] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    );
  });
};

const Home = () => {
  return (
    <div className="relative">
      {/* GLOBAL PARTICLE BACKGROUND */}
      <div className="fixed top-0 left-0 w-full h-full z-1 overflow-hidden pointer-events-none">
        {generateQuantumParticles(60)} {/* 60 green bubbles */}
      </div>

      {/* Hero Section */}
      <section className="relative h-screen w-screen bg-gradient-to-b from-black via-[#0B0019] to-black overflow-hidden">
        <Header />
        <div className="z-10 relative flex flex-col justify-center items-center h-full text-white px-4 orbitron-qm">
          <motion.h1
            className="text-6xl md:text-8xl font-extrabold text-center leading-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <span className='floating-text font-extrabold'>
            Quantum <br></br> Musing  
            </span>
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl mt-4 text-center max-w-3xl text-teal-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className='floating-text'>
            Research. Develop. Learn. Dive into the quantum realm.
            </span>
          </motion.p>
          <div className="mt-10 flex space-x-6">
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: '0px 0px 15px #00FFC6' }}
              className="bg-transparent border border-teal-400 text-teal-300 px-6 py-2 rounded-full text-xl font-semibold"
            >
              Explore More
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: '0px 0px 15px #00FFC6' }}
              className="bg-transparent border border-purple-400 text-purple-300 px-6 py-2 rounded-full text-xl font-semibold"
            >
              About Us
            </motion.button>
          </div>
        </div>
      </section>

      {/* Section 2 - Learning Message */}
      <section className="bg-[#0A0A0A] py-32 text-white text-center px-6">
        <ScrollingText />
        <motion.h2
          className="text-4xl md:text-5xl font-bold max-w-4xl mx-auto mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Step into the quantum dimension of <span className="text-teal-400">learning</span>,
          where possibilities are infinite.
        </motion.h2>
        <motion.a
          href="https://www.youtube.com/@Rajan15x/videos"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-10 px-8 py-3 rounded-full bg-teal-500 text-black font-bold text-xl hover:scale-105 transition-all"
        >
          Explore Free Learning
        </motion.a>
      </section>

      {/* Section 3 - Our Services */}
      <section className="bg-black py-32 text-white text-center px-6">
        <motion.h2
          className="text-4xl md:text-6xl font-bold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Our Services
        </motion.h2>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Insert <CoursesCard /> components here */}
        </div>
      </section>

      {/* Section 4 - Activity */}
      <section className="bg-[#0F0F0F] py-32 flex flex-col items-center text-white text-center">
        <motion.h2
          className="text-5xl font-bold"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          Activity In
        </motion.h2>
        <div className="h-64 w-full mt-10 bg-gradient-to-br from-[#00ffc6]/20 to-[#001F3F]/30 rounded-xl blur-xl" />
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="bg-teal-500 text-black px-10 py-3 mt-10 rounded-full text-xl font-semibold"
        >
          Explore Courses
        </motion.button>
      </section>

      {/* Section 5 - Newsletter */}
      <section className="bg-[#0A0A0A] py-32 text-white px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#ffffff0d] to-[#ffffff08] backdrop-blur-lg p-10 rounded-3xl">
          <h2 className="text-5xl font-bold">Be Connected to the Quantum World</h2>
          <p className="mt-4 text-xl">
            Sign up for our newsletter and enjoy unmatched discounts, early access, and exclusive insights!
          </p>
          <div className="mt-8 flex flex-col md:flex-row gap-4 items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 text-black rounded-md text-lg"
            />
            <button className="bg-teal-500 text-black px-6 py-2 rounded-md text-lg font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;