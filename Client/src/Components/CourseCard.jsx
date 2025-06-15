// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useNavigate } from 'react-router-dom';

// CoursesCard component takes a single prop: course
const CoursesCard = ({ course }) => {
    const navigate = useNavigate();

    // Handles navigation when "View Details" is clicked
    const handleViewDetails = () => {
        if (course.status === 'active') {
            // Navigate to course details page with course data in state
            navigate(`/course/${course._id}`, { state: { course } });
        }
    };
    
    return (
        <div className='w-full max-w-sm sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto transition-all duration-300'>
            {/* Card Container */}
            <div className='rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden bg-black shadow-lg'>
                
                {/* Image Section */}
                <div className='relative w-full h-48 sm:h-52 md:h-60 lg:h-72 xl:h-80 overflow-hidden'>
                    <img 
                        className='w-full h-full object-cover' 
                        src={course.thumbnail} 
                        alt={course.title || 'Course Thumbnail'} 
                    />
                </div>
                
                {/* Course Content Section */}
                <div className='px-4 sm:px-6 md:px-8 py-4 sm:py-5 bg-[#171717] text-white text-base sm:text-lg md:text-xl font-semibold'>
                    
                    {/* Course Title */}
                    <h1 className='text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl'>
                        {course.title}
                    </h1>

                    {/* Language Tags */}
                    <div className='flex gap-3 text-xs sm:text-sm mt-3 sm:mt-4'>
                        {course.languages?.map((lang, index) => (
                            <div key={index} className='bg-gray-600 rounded-md px-3 py-1'>
                                {lang}
                            </div>
                        ))}
                    </div>

                    {/* Limited Time Offer Text */}
                    <h1 className='text-xs sm:text-sm text-[#23cfa6] mt-6 sm:mt-8 font-medium'>
                        Limited Time Discount
                    </h1>

                    {/* Pricing Section */}
                    <div className='flex justify-between items-center mt-2 sm:mt-3'>
                        <div className='flex gap-3 items-center text-sm sm:text-base md:text-lg'>

                            {/* Discounted Price + GST */}
                            <div className='flex gap-1 text-lg sm:text-xl'>
                                <h1>₹{Math.round(course.price - (course.price * course.discount / 100))}</h1>
                                <h1 className='font-thin'>(+ GST)</h1>
                            </div>

                            {/* Original Price (Strikethrough) */}
                            <h1 className='text-gray-400 text-sm sm:text-lg line-through'>₹{course.price}</h1>
                        </div>

                        {/* Discount Badge */}
                        <div className='text-[0.7rem] px-2 py-1 sm:px-3 sm:py-1 rounded-sm text-black bg-white flex justify-center items-center'>
                            {course.discount}% OFF
                        </div>
                    </div>
                </div>
            </div>

            {/* View Details / Coming Soon Button */}
            <div
                onClick={handleViewDetails}
                className={`mt-3 rounded-lg py-2 sm:py-3 px-5 flex justify-center items-center text-sm sm:text-lg md:text-xl font-bold transition-all duration-300 ${
                    course.status === 'active'
                        ? 'bg-white text-black cursor-pointer hover:scale-105'
                        : 'bg-green-400 text-white cursor-not-allowed opacity-60'
                }`}
            >
                {/* Button Text Based on Status */}
                {course.status === 'active' ? 'View Details' : 'Coming Soon'}
            </div>
        </div>
    );
}

export default CoursesCard;