import React from 'react'
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { IoMdAdd, IoMdRemove, IoMdTrash } from "react-icons/io";

const CourseCard = ({ course }) => { 

const [isExpanded, setIsExpanded] = React.useState(false);
const [editedCourse, setEditedCourse] = React.useState(course);

    const expandCard = () => {
        setIsExpanded(true);
    };

    const collapseCard = () => {
        setIsExpanded(false);
    }   

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse(prev => ({
        ...prev,
        [name]: value
    }));
};

const handleSubmit = async () => {
    try {
        // Create a copy of the edited course data
        const courseData = { ...editedCourse };
        
        // Ensure arrays are properly formatted
        if (typeof courseData.languages === 'string') {
            courseData.languages = courseData.languages.split(',').map(lang => lang.trim());
        }
        if (typeof courseData.hashtags === 'string') {
            courseData.hashtags = courseData.hashtags.split(',').map(tag => tag.trim());
        }

        // Ensure syllabus is properly formatted
        if (courseData.syllabus) {
            courseData.syllabus = courseData.syllabus.map(chapter => ({
                title: chapter.title || '',
                lessons: (chapter.lessons || []).map(lesson => ({
                    title: lesson.title || ''
                }))
            }));
        }

        // Convert numeric fields to numbers
        courseData.price = Number(courseData.price);
        courseData.discount = Number(courseData.discount);

        // Remove any undefined or null values
        Object.keys(courseData).forEach(key => {
            if (courseData[key] === undefined || courseData[key] === null) {
                delete courseData[key];
            }
        });

        const { data } = await axios.put(`http://localhost:4000/api/courses/${course._id}`, courseData);
        
        if (data.message === 'Course updated successfully') {
            alert('Course updated successfully!');
            collapseCard();
            window.location.reload();
        } else {
            throw new Error('Failed to update course');
        }
    } catch (error) {
        console.error('Error updating course:', error);
        alert('Failed to update course: ' + (error.response?.data?.message || error.message));
    }
};

const addChapter = () => {
    setEditedCourse(prev => ({
        ...prev,
        syllabus: [...prev.syllabus, { title: '', lessons: [{ title: '' }] }]
    }));
};

const removeChapter = (chapterIndex) => {
    setEditedCourse(prev => ({
        ...prev,
        syllabus: prev.syllabus.filter((_, index) => index !== chapterIndex)
    }));
};

const addLesson = (chapterIndex) => {
    setEditedCourse(prev => {
        const newSyllabus = [...prev.syllabus];
        newSyllabus[chapterIndex].lessons.push({ title: '' });
        return { ...prev, syllabus: newSyllabus };
    });
};

const removeLesson = (chapterIndex, lessonIndex) => {
    setEditedCourse(prev => {
        const newSyllabus = [...prev.syllabus];
        newSyllabus[chapterIndex].lessons = newSyllabus[chapterIndex].lessons.filter((_, index) => index !== lessonIndex);
        return { ...prev, syllabus: newSyllabus };
    });
};

const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
        try {
            const { data } = await axios.delete(`http://localhost:4000/api/courses/${course._id}`);
            if (data.message === 'Course deleted successfully') {
                alert('Course deleted successfully!');
                window.location.reload();
            } else {
                throw new Error('Failed to delete course');
            }
        } catch (error) {
            console.error('Error deleting course:', error);
            alert('Failed to delete course: ' + (error.response?.data?.message || error.message));
        }
    }
};

    return (
        <div className='w-full max-w-xs mb-4 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto transition-all duration-300'>

            <div className='rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden bg-black shadow-lg'>
                {/* Image Section */}
                <div className='relative w-full h-48 sm:h-52 md:h-60 lg:h-72 xl:h-80 overflow-hidden'>
                    <img className='w-full h-full object-cover' src={course.thumbnail} alt={course.title} />
                    {/* Delete Button */}
                    <button 
                        onClick={handleDelete}
                        className='absolute top-2 right-2 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-200'
                    >
                        <IoMdTrash size={20} className='text-white' />
                    </button>
                </div>
                
                {/* Content Section */}
                <div className='px-4 sm:px-6 md:px-8 py-4 sm:py-5  min-w-fit bg-gradient-to-br from-[#285467] via-[#3d6673] to-[#5daacb] text-white text-base sm:text-lg md:text-xl font-semibold h-70'>
                    <h1 className='text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl'>
                        {course.title}
                    </h1>
                    <div className='flex gap-3 text-xs sm:text-sm mt-3 sm:mt-4'>
                        <div className='bg-gray-600 rounded-md px-3 py-1'>Hindi</div>
                        <div className='bg-gray-600 rounded-md px-3 py-1'>Hinglish</div>
                    </div>
                    <h1 className='text-xs sm:text-sm text-[#23cfa6] mt-6 sm:mt-8 font-medium'>
                        Limited Time Discount...!
                    </h1>

                    {/* Creation Time */}
                    <div className='text-xs text-gray-400 mt-2'>
                        Created on: {new Date(course.createdAt).toLocaleString()}
                    </div>
                    {/* Last Updated Time */}
                    <div className='text-xs text-gray-400 mt-2'>
                        Last updated: {new Date(course.updatedAt).toLocaleString()}
                    </div>

                    {/* Pricing Section */}
                    <div className='flex justify-between items-center mt-2 sm:mt-3'>
                        <div className='flex gap-3 items-center text-sm sm:text-base md:text-lg'>
                            <div className='flex gap-1 text-lg sm:text-xl'>
                                <h1>₹{course.price}</h1>
                                <h1 className='font-thin'>(+ GST)</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button className='bg-cyan-400 mt-3 rounded-lg py-2 sm:py-3 px-5 flex justify-center items-center text-sm sm:text-lg md:text-xl font-bold min-w-full hover:cursor-pointer hover:text-black hover:bg-cyan-200 hover:scale-110' onClick={expandCard}>
                Expand
            </button>
            {
                isExpanded &&
<div className='fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-90 z-50 flex justify-center items-center transition-opacity duration-300 animate-fade-in'>
                <div className='min-h-screen min-w-fit bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white w-5/6 h-5/6 rounded-lg overflow-hidden'>
                    <div className='flex justify-end p-4'>
                        <button className='scale-200 hover:scale-300 hover:text-red-600' onClick={collapseCard}>
                            <RxCross2 />
                        </button>
                    </div>
                    <div className='flex flex-col gap-4 p-4 h-[calc(100%-4rem)] overflow-y-auto custom-scrollbar'>
                        <div>
                            <label className='block text-sm font-medium text-white'>Title</label>
                            <input
                                className='w-full border rounded p-2 bg-black text-white'
                                name="title"
                                value={editedCourse.title}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-white'>Price</label>
                            <input
                                type="number"
                                className='w-full border rounded p-2 bg-black text-white'
                                name="price"
                                value={editedCourse.price}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-white'>Discount</label>
                            <input
                                type="number"
                                className='w-full border rounded p-2 bg-black text-white'
                                name="discount"
                                value={editedCourse.discount}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-white'>Languages (comma-separated)</label>
                            <input
                                className='w-full border rounded p-2 bg-black text-white'
                                name="languages"
                                value={editedCourse.languages?.join(', ')}
                                onChange={(e) => {
                                    setEditedCourse(prev => ({
                                        ...prev,
                                        languages: e.target.value.split(',').map(lang => lang.trim())
                                    }));
                                }}
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-white'>Status</label>
                            <select 
                                className='w-full border rounded p-2 bg-black text-white'
                                name="status"
                                value={editedCourse.status}
                                onChange={handleInputChange}
                            >
                                <option value="active">Active</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-white'>Certificate</label>
                            <select 
                                className='w-full border rounded p-2 bg-black text-white'
                                name="certificate"
                                value={editedCourse.certificate}
                                onChange={handleInputChange}
                            >
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-white'>Total Content</label>
                            <input
                                className='w-full border rounded p-2 bg-black text-white'
                                name="totalContent"
                                value={editedCourse.totalContent}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-white'>Schedule</label>
                            <input
                                className='w-full border rounded p-2 bg-black text-white'
                                name="schedule"
                                value={editedCourse.schedule}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-white'>Hashtags (comma-separated)</label>
                            <input
                                className='w-full border rounded p-2 bg-black text-white'
                                name="hashtags"
                                value={editedCourse.hashtags?.join(', ')}
                                onChange={(e) => {
                                    setEditedCourse(prev => ({
                                        ...prev,
                                        hashtags: e.target.value.split(',').map(tag => tag.trim())
                                    }));
                                }}
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-white mb-2'>Syllabus</label>
                            <div className='space-y-4'>
                                {editedCourse.syllabus?.map((chapter, chapterIndex) => (
                                    <div key={chapterIndex} className='bg-gray-900 p-4 rounded-lg'>
                                        <div className='flex items-center gap-2 mb-2'>
                                            <input
                                                type='text'
                                                className='flex-1 border rounded p-2 bg-black text-white'
                                                placeholder={`Chapter ${chapterIndex + 1} Title`}
                                                value={chapter.title}
                                                onChange={(e) => {
                                                    const newSyllabus = [...editedCourse.syllabus];
                                                    newSyllabus[chapterIndex].title = e.target.value;
                                                    setEditedCourse(prev => ({
                                                        ...prev,
                                                        syllabus: newSyllabus
                                                    }));
                                                }}
                                            />
                                            <button
                                                type='button'
                                                className='p-2 text-red-500 hover:text-red-700'
                                                onClick={() => removeChapter(chapterIndex)}
                                            >
                                                <IoMdRemove size={20} />
                                            </button>
                                        </div>
                                        <div className='pl-4 space-y-2'>
                                            {chapter.lessons?.map((lesson, lessonIndex) => (
                                                <div key={lessonIndex} className='flex items-center gap-2'>
                                                    <input
                                                        type='text'
                                                        className='flex-1 border rounded p-2 bg-black text-white'
                                                        placeholder={`Lesson ${lessonIndex + 1} Title`}
                                                        value={lesson.title}
                                                        onChange={(e) => {
                                                            const newSyllabus = [...editedCourse.syllabus];
                                                            newSyllabus[chapterIndex].lessons[lessonIndex].title = e.target.value;
                                                            setEditedCourse(prev => ({
                                                                ...prev,
                                                                syllabus: newSyllabus
                                                            }));
                                                        }}
                                                    />
                                                    <button
                                                        type='button'
                                                        className='p-2 text-red-500 hover:text-red-700'
                                                        onClick={() => removeLesson(chapterIndex, lessonIndex)}
                                                    >
                                                        <IoMdRemove size={20} />
                                                    </button>
                                                </div>
                                            ))}
                                            <button
                                                type='button'
                                                className='mt-2 flex items-center gap-1 text-green-400 hover:text-green-600'
                                                onClick={() => addLesson(chapterIndex)}
                                            >
                                                <IoMdAdd size={20} />
                                                <span>Add Lesson</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                type='button'
                                className='mt-4 flex items-center gap-1 text-green-400 hover:text-green-600'
                                onClick={addChapter}
                            >
                                <IoMdAdd size={20} />
                                <span>Add Chapter</span>
                            </button>
                        </div>

                        <button 
                            className='bg-green-400 mt-3 rounded-lg py-2 px-5 flex justify-center items-center text-sm font-bold min-w-full hover:cursor-pointer hover:bg-green-500'
                            onClick={handleSubmit}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
                </div>
            }
        </div>
    )
}

export default CourseCard;