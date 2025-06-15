
const express = require("express");
const router = express.Router();
const blogController = require("../Controllers/blogController");

// Create a new blog post
router.post("/", blogController.createBlog);

// Get all blog posts
router.get("/", blogController.getAllBlogs);

// Get a single blog post by ID
router.get("/:id", blogController.getBlogById);

// Update a blog post by ID
router.put("/:id", blogController.updateBlog);

// Delete a blog post by ID
router.delete("/:id", blogController.deleteBlog);

module.exports = router;

const Blog = require ("../Models/blogModel");

