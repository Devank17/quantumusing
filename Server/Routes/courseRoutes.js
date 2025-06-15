const express = require('express');
const router = express.Router();
const validateCourse = require('../Middleware/courseValidation');
const upload = require('./../Config/Multer'); 
// Import course controller
const { createCourse, getCourses, updateCourse, deleteCourse } = require('../Controllers/courseController');

// Define routes
router.get('/', getCourses);
router.post('/',upload.single('thumbnail')  , createCourse);
router.put('/:id', validateCourse, updateCourse);
router.delete('/:id', deleteCourse);

module.exports = router; 