import React from 'react';
import { MdEmail } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import { FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="relative text-white py-12 bg-black/80 backdrop-blur-md w-full z-10 border-t border-green-500">
      
      {/* Decorative Glow */}
      <div className="absolute left-0 bottom-10 h-32 w-32 md:h-44 md:w-44 bg-green-500 rotate-[80deg] blur-3xl rounded-full z-0" />

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <h1 className="text-3xl font-semibold mb-6">Quantum Musing</h1>
        <div className="border-t border-gray-700 mb-10"></div>

        {/* Grid Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          <div>
            <h4 className="text-xl font-bold mb-4">Help</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-green-400 transition">FAQs</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Fees</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Social Media</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-green-400 transition">Instagram</a></li>
              <li><a href="#" className="hover:text-green-400 transition">YouTube</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Telegram</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-green-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-green-400 transition">Cookies Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">Stay Updated</h4>
            <p className="mb-3 text-sm text-gray-400">Subscribe to our newsletter</p>
            <form className="flex flex-col gap-3  sm:items-start">
              <input
                type="email"
                placeholder="Your Email"
                className="rounded-lg bg-gray-700 text-white py-2 px-4 w-full sm:w-auto"
              />
              <button className="bg-green-400 text-black font-semibold rounded-lg px-4 py-2 hover:bg-green-300 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12"></div>

        {/* Bottom Area */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-gray-400 space-y-4 md:space-y-0">
          <div className="flex space-x-5 text-xl">
            <a href="#" className="hover:text-green-400 transition"><RiInstagramFill /></a>
            <a href="#" className="hover:text-green-400 transition"><MdEmail /></a>
            <a href="#" className="hover:text-green-400 transition"><FaPhone className="rotate-90" /></a>
          </div>
          <p>© 2025 Quantum Musing. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
