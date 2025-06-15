// Import necessary React hooks and components
import React, { useEffect, useState } from 'react'
import Nav from './../Components/Nav'
import CourcesCard from './../Components/CourseCard' // Note: Typo in "Courses" (Cources)
import Footer from './../Components/Footer'
import axios from 'axios'

const Cources = () => {
  // State management for courses data, loading status, and potential errors
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect hook for fetching data when component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // API call to fetch courses from backend
        const response = await axios.get('http://localhost:4000/api/courses');
        // Update state with fetched courses, default to empty array if response is undefined
        setCourses(response.data.courses || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to fetch courses');
      } finally {
        // Always disable loading state regardless of success/error
        setLoading(false);
      }
    };

    fetchCourses();
  }, []); // Empty dependency array means this runs once on component mount

  // Debugging log (Note: 'courses' might be misspelled if intended as 'courses')
  console.log(courses)

  return (
    <>
      {/* Main page container */}
      <main className='w-screen bg-black'>
        <Nav />
        
        {/* Hero section */}
        <div className='pt-40 px-5 lg:px-20'>
          <h1 className='text-7xl text-white'>We are not a <span className='text-green-400'>Course</span></h1>
          <h1 className='text-7xl text-green-400 mt-2'>Factory.</h1>
          <h1 className='mt-20 text-white text-3xl font-normal'>We focus on courses that really work</h1>
        </div>

        {/* Courses grid section */}
        <h1 className='text-white pt-30 px-5 lg:px-20 text-4xl'>Courses which do work ↓</h1>
        <div className="grid grid-cols-1 px-5 lg:px-20 lg:py-10 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Loading state display */}
          {loading && <p className="text-white">Loading courses...</p>}
          
          {/* Error state display */}
          {error && <p className="text-red-500">{error}</p>}
          
          {/* Render courses if available */}
          {!loading && !error && (
            courses.map(course => (
              <CourcesCard key={course._id} course={course} />
            ))
          )}
        </div>

        <Footer />
      </main>
    </>
  )
}

export default Cources