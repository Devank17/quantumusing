import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ContactForm from './Contactform';
import { UserContextData } from './../Context/UserContext';
import atom from '../../public/atom.png'; 
import menu from '../../public/hamburger.svg'; 
import MobileNav from './MobileNav';
import '../App.css';

const Navbar = () => {
  // State management
  const [isAboutOpen, setIsAboutOpen] = useState(false); // About dropdown visibility
  const [isContactFormOpen, setIsContactFormOpen] = useState(false); // Contact modal state
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false); // Mobile menu state
  const location = useLocation(); // Current route location
  const { user } = useContext(UserContextData); // User authentication context

  // Contact form handlers
  const handleContactClick = (e) => {
    e?.preventDefault?.();
    setIsContactFormOpen(true);
    setIsMobileNavOpen(false); // Close mobile nav when opening contact form
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };

  // Dynamic link styling based on current route
  const getLinkClass = (path) =>
    location.pathname === path ? 'text-green-300' : 'text-white hover:text-green-300';

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className='fixed z-20 top-0 w-full backdrop-blur-md bg-black/60 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-10'>
        
        {/* Logo Section */}
        <div className='flex items-center gap-2 shrink-0'>
          <Link to='/' className='text-white flex items-center text-lg sm:text-xl font-bold hover:text-green-400 gothic-qm'>
            <img src={atom} className='h-8 w-8 mr-2' alt="Quantum Musing Logo" />
            Quantum Musing
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-8 lg:gap-12 text-sm lg:text-base'>
          {/* Home Link */}
          <Link className={getLinkClass('/')} to='/'>Home</Link>

          {/* About Dropdown */}
          <div
            className='relative group'
            onMouseEnter={() => setIsAboutOpen(true)}
            onMouseLeave={() => setIsAboutOpen(false)}
          >
            <button className='text-white hover:text-green-300'>About</button>
            <div className={`absolute top-8 left-0 w-48 bg-black shadow-md rounded-md p-2 text-sm transition-all duration-150 ease-in-out flex flex-col gap-2 ${isAboutOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
              <Link className={getLinkClass('/aboutrajan')} to='/aboutrajan'>Rajan Chopra</Link>
              <Link className={getLinkClass('/quantummusing')} to='/quantummusing'>Quantum Musing</Link>
              <Link className={getLinkClass('/aboutabhishek')} to='/aboutabhishek'>Abhishek Agrahari</Link>
            </div>
          </div>

          {/* Regular Links */}
          <Link className={getLinkClass('/courses')} to='/courses'>Courses</Link>
          <Link className={getLinkClass('/blog')} to='/blog'>Blog</Link>

          {/* Contact Button */}
          <button onClick={handleContactClick} className='hover:text-green-300 text-white'>Contact us</button>

          {/* Conditional Auth Button */}
          {user?.email ? (
            <Link to='/profile' className='bg-green-500 text-white rounded-sm px-4 py-1 font-medium'>
              Profile
            </Link>
          ) : (
            <Link to='/login' className='bg-white text-black rounded-sm px-4 py-1 font-medium'>
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <div className='md:hidden flex items-center ml-auto'>
          <img
            src={menu}
            alt="Mobile Menu"
            className='w-8 h-8 cursor-pointer'
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          />
        </div>

        {/* Mobile Navigation Component */}
        <MobileNav
          isMobileNavOpen={isMobileNavOpen}
          setIsMobileNavOpen={setIsMobileNavOpen}
          user={user}
          handleContactClick={handleContactClick}
        />
      </nav>

      {/* Animated Contact Form Modal */}
      <AnimatePresence>
        {isContactFormOpen && (
          <motion.div
            className="fixed z-50 inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ContactForm closeContactForm={closeContactForm} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;