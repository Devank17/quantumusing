const Blog = require('../Models/blogModel');

exports.createBlog = async (blogData) => {
    try {
        const newBlog = new Blog({
            title: blogData.title,
            subTitle: blogData.subTitle,
            author: blogData.author,
            thumbnail: blogData.thumbnail,
            heading: blogData.heading,
            paragraphs: blogData.paragraphs,
            createdAt: blogData.createdAt || new Date(),
            updatedAt: blogData.updatedAt || new Date()
        });
        return await newBlog.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getAllBlogs = async () => { 
    try {
        blogs = await Blog.find().sort({ createdAt: -1 });
        return blogs;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getBlogById = async (id) => {
    try {
        return await Blog.findById(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.updateBlog = async (id, blogData) => {
    try {
        // Set the updatedAt field to the current datetime
        blogData.updatedAt = new Date();

        // Find the blog by ID and update it
        const updatedBlog = await Blog.findByIdAndUpdate(id, blogData, { new: true });
        return updatedBlog;
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.deleteBlog = async (id) => {
    try {
        return await Blog.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error.message);
    }
};
