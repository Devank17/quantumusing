const fs = require('fs');
const courseServices = require('../Services/courseServices');
const cloudinary = require('../Config/Cloudnary');

const createCourse = async (req, res) => {
  try {
    

    const result = await cloudinary.uploader.upload(req.file.path);

    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Failed to delete local file:', err);
      else console.log('Local file deleted');
    });

    const data = req.body;
    const course = await courseServices.createCourse(data, result);

    res.status(200).json({ message: 'Course created successfully', course });

  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Error creating course', error });
  }
};









const getCourses = async (req, res) => {
  try {
   
    const courses = await courseServices.getCourses();
    res.status(200).json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error); // Log the error
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const courseData = req.body;
    const updatedCourse = await courseServices.updateCourse(id, courseData);

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
  } catch (error) {
    res.status(500).json({ message: 'Error updating course', error });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await courseServices.deleteCourse(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course', error });
  }
};

module.exports = { createCourse, getCourses, updateCourse, deleteCourse };
