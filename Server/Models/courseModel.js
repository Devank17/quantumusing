const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: String,
    price: Number,
    discount: Number,
    languages: [String],
    thumbnail: { type: String, required: true },
    status: String,
    syllabus: Array,
    certificate: String,
    totalContent: String,
    schedule: String,
    hashtags: [String]
 }, { timestamps: true }); // Enable timestamps

module.exports = mongoose.model('Course', courseSchema, 'courses');
