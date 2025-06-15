import React, { useState } from 'react'
import Header from '../Components/Nav'
import { IoLogoInstagram } from "react-icons/io5";
import { FaLinkedinIn, FaFacebookF, FaYoutube, FaXTwitter } from "react-icons/fa6";
import Abhishek from './../assets/abhishek.avif'
import Footer from './../Components/Footer'

const AboutAbhishek = () => {
  // Sections for tabbed content
  const sections = [
    {
      title: "Community Engagement",
      content: "Community engagement involves fostering strong relationships and collaboration among individuals, organizations, and institutions to create positive social impact..."
    },
    {
      title: "Workshop & Guest Lecture",
      content: "Our workshops and guest lectures bring together industry experts and enthusiasts to share knowledge and foster professional growth..."
    },
    {
      title: "Vision & Mission",
      content: "Our vision is to create a platform for continuous learning and community development through innovative educational initiatives..."
    },
    {
      title: "Institutional Collaboration",
      content: "We partner with leading institutions to develop programs that bridge academic learning with real-world applications..."
    }
  ];

  // Active tab state
  const [activeSection, setActiveSection] = useState(sections[0]);

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen relative bg-black overflow-hidden">
        {/* Navbar */}
        <Header />
        
        {/* Background Blurred Circle */}
        <div className="absolute left-0 top-1/3 w-64 h-64 bg-red-900/30 rounded-full blur-3xl -translate-x-1/2" />
        
        {/* Main content: title, socials, description, image */}
        <div className="container mx-auto px-4 lg:px-8 py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left content: name, social icons, description */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
              Abhishek Agrahari
            </h1>

            {/* Social Media Icons */}
            <div className="flex gap-4 mb-8">
              {[IoLogoInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaXTwitter].map((Icon, i) => (
                <a 
                  key={i} 
                  className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                  href="#" // Replace with actual links
                >
                  <Icon className="text-2xl text-white" />
                </a>
              ))}
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl">
              Visionary leader and educator specializing in community-driven learning initiatives and institutional partnerships.
            </p>
          </div>

          {/* Right content: image */}
          <div className="flex-1 flex justify-center">
            <img 
              src={Abhishek} 
              alt="Abhishek Agrahari" 
              className="w-full max-w-xl rounded-2xl shadow-2xl object-cover aspect-square"
            />
          </div>
        </div>
      </section>

      {/* Tabbed Section */}
      <section className="bg-black py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Tab Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {sections.map((section) => (
              <button
                key={section.title}
                onClick={() => setActiveSection(section)}
                className={`p-6 text-left rounded-xl transition-all ${
                  activeSection.title === section.title 
                    ? 'bg-white text-black'
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
              >
                <h3 className="text-lg font-semibold">{section.title}</h3>
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          <div className="bg-gray-900 rounded-xl p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              {activeSection.title}
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {activeSection.content}
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Content Section */}
      <section className="bg-black py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Upcoming Content
          </h2>
          
          {/* Grid of future workshop cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-900 rounded-xl p-6 hover:transform hover:scale-105 transition-all">
                {/* Placeholder for video or image */}
                <div className="aspect-video bg-gray-800 rounded-lg mb-4" />
                
                {/* Card Title & Description */}
                <h3 className="text-xl font-semibold text-red-400 mb-2">
                  Professional Development Workshop
                </h3>
                <p className="text-gray-300">
                  Master modern teaching methodologies and community engagement strategies.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="bg-gradient-to-b from-gray-900 to-black py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Quick Links
          </h2>
          
          {/* Grid of quick navigation cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {['Expert Team', 'Resources', 'Events', 'Partners', 'Contact'].map((title) => (
              <div key={title} className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-colors">
                <h3 className="text-lg font-semibold text-red-400 mb-2">{title}</h3>
                <p className="text-gray-300 text-sm">
                  Explore our {title.toLowerCase()} and discover new opportunities.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </>
  )
}

export default AboutAbhishek