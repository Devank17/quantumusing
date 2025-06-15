const Course = require('../Models/courseModel');

const createCourse = async (data, result) => {
  // Ensure thumbnail is added to the data
  data.thumbnail = result.secure_url;

  // Convert comma-separated strings to arrays if necessary
  if (typeof data.languages === 'string') {
    data.languages = data.languages.split(',').map(lang => lang.trim());
  }
  if (typeof data.hashtags === 'string') {
    data.hashtags = data.hashtags.split(',').map(tag => tag.trim());
  }
  if (typeof data.syllabus === 'string') {
    data.syllabus = JSON.parse(data.syllabus); // Parse syllabus JSON string
  }

  const newCourse = new Course(data);
  return await newCourse.save();
};



const getCourses = async () => {
    try {
        return await Course.find();
    } catch (error) {
        throw new Error('Error fetching courses: ' + error.message);
    }
};

const updateCourse = async (id, courseData) => {
    // Remove any attempt to modify createdAt or updatedAt
    const { createdAt, updatedAt, ...updateData } = courseData;
    
    // Use findByIdAndUpdate with new: true to return the updated document
    // Mongoose will automatically update the updatedAt timestamp
    return await Course.findByIdAndUpdate(id, updateData, { 
        new: true,
        runValidators: true
    });
};

const deleteCourse = async (id) => {
    return await Course.findByIdAndDelete(id);
};

module.exports = { createCourse, getCourses, updateCourse, deleteCourse };