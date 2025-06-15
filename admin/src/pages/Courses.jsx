// Importing React and necessary hooks
import React, { useEffect, useState } from 'react';
import Menu from '../components/Menu';
import CourseCard from '../components/CourseCard';
import { MdOutlineDoubleArrow } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Courses = () => {
  // State to store courses data
  const [courses, setCourses] = useState([]);
  // State to manage loading state
  const [loading, setLoading] = useState(true);
  // State to handle errors
  const [error, setError] = useState(null);

  // Fetch courses data from the API when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const response = await axios.get('http://localhost:4000/api/courses'); // API call to fetch courses
        setCourses(response.data.courses || []); // Update courses state with fetched data
      } catch (error) {
        console.error('Error fetching courses:', error); // Log error to console
        setError('Failed to fetch courses'); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCourses();
  }, []);

  // Filter active courses
  const activeCourses = courses.filter(course => course.status === 'active');
  // Filter archived courses
  const archivedCourses = courses.filter(course => course.status === 'archived');

  // Show loading or error message if applicable
  if (loading || error) {
    return (
      <div className="min-h-screen min-w-fit bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-['Inter'] flex">
        <Menu />
        <div className="flex-1 flex items-center justify-center">
          <h1 className={`text-2xl ${error ? 'text-red-500' : ''}`}>
            {error || "Loading courses..."} {/* Display error or loading message */}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-w-fit bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-['Inter'] flex">
      <Menu />
      <div className="flex-1 px-6 py-10 relative">

        {/* Floating Add Button */}
        <Link 
          to="/add-course" 
          className="bg-gradient-to-tr from-gray-500 to-cyan-500 shadow-2xl rounded-full px-5 py-3 fixed bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 text-white brightness-125  text-lg font-semibold hover:scale-110 transition-all duration-300 z-50"
        >
          Add a New Course {/* Button to navigate to add course page */}
          <MdOutlineDoubleArrow className="text-2xl" />
        </Link>

        <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-white">Courses</h1>

        {/* Active Courses Section */}
        {activeCourses.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-emerald-400 border-b border-white/10 pb-2"> 
              🟢 Active Courses 
            </h2>
            {/* Render each active course */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"> 
              {activeCourses.map((course, index) => (
                <CourseCard key={course._id || index} course={course} />
              ))}
            </div>
          </section>
        )}

        {/* Archived Courses Section */}
        {archivedCourses.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-semibold mb-6 text-rose-300 border-b border-white/10 pb-2"> 
            {/* Section heading for archived courses */}
              🗃️ Archived Courses
            </h2>
            {/* Render each archived course */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {archivedCourses.map((course, index) => (
                <CourseCard key={course._id || index} course={course} />
              ))} 
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Courses;
