import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

const MobileNav = ({ isMobileNavOpen, setIsMobileNavOpen, user, handleContactClick }) => {
  // Close mobile navigation handler
  const handleClose = () => setIsMobileNavOpen(false);

  // Body scroll lock effect
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.body.style.overflow = ''; // Restore scrolling
    }
    // Cleanup function to reset scroll
    return () => (document.body.style.overflow = '');
  }, [isMobileNavOpen]);

  // Navigation items configuration
  const navItems = [
    { name: 'Home', to: '/' },
    { name: 'Rajan Chopra', to: '/aboutrajan' },
    { name: 'Quantum Musing', to: '/quantummusing' },
    { name: 'Abhishek Agrahari', to: '/aboutabhishek' },
    { name: 'Courses', to: '/courses' },
    { name: 'Blog', to: '/blog' },
  ];

  return (
    <AnimatePresence>
      {isMobileNavOpen && (
        <motion.div
          key="mobile-nav"
          initial={{ y: '-100%', opacity: 0 }} // Start above viewport
          animate={{ y: 0, opacity: 1 }} // Slide down to position
          exit={{ y: '-100%', opacity: 0 }} // Slide up when closing
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed top-0 left-0 w-full h-screen bg-black/90 backdrop-blur-lg text-white z-[10000] flex flex-col items-center justify-center px-6"
        >
          {/* Close Button */}
          <motion.button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white text-3xl hover:text-green-400 transition-colors duration-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }} // Delayed appearance
          >
            <IoClose aria-label="Close menu" />
          </motion.button>

          {/* Navigation Links Container */}
          <nav className="flex flex-col items-center gap-6 text-center text-lg sm:text-2xl font-semibold mt-10">
            {navItems.map((item, index) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, y: 10 }} // Start slightly below
                animate={{ opacity: 1, y: 0 }} // Fade and slide up
                transition={{ delay: 0.1 * index }} // Staggered animation
              >
                <Link
                  to={item.to}
                  onClick={handleClose} // Close menu on navigation
                  className="hover:text-green-400 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}

            {/* Contact Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }} // Later animation timing
            >
              <button
                onClick={() => {
                  handleContactClick();
                  handleClose();
                }}
                className="hover:text-green-400 transition-colors duration-200"
              >
                Contact Us
              </button>
            </motion.div>

            {/* Authentication Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }} // Last animated element
            >
              {user?.email ? (
                // Show profile if logged in
                <Link
                  to="/profile"
                  onClick={handleClose}
                  className="hover:text-green-400 transition-colors duration-200"
                >
                  Profile
                </Link>
              ) : (
                // Show sign in if not authenticated
                <Link
                  to="/login"
                  onClick={handleClose}
                  className="hover:text-green-400 transition-colors duration-200"
                >
                  Sign In
                </Link>
              )}
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;