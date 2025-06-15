const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    subTitle: { // Renamed from subtitle
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        default: [],
    },
    thumbnail: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: { // Added updatedAt field
        type: Date,
        default: Date.now,
    },
    tags: {
        type: [String],
        default: [],
    },
    heading: {
        type: String,
        required: true,
        trim: true,
    },
    paragraphs: { // Added paragraphs field
        type: [String],
        default: [],
    },
});

// Middleware to update the updatedAt field before saving
blogSchema.pre('findOneAndUpdate', function (next) {
    this.set({ updatedAt: new Date() });
    next();
});

module.exports = mongoose.model("Blog", blogSchema);
