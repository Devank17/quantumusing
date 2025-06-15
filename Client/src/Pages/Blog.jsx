import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from './../Components/Nav';
import Footer from './../Components/Footer';
import { motion } from "framer-motion";

const BlogPage = () => {
  // State to store all blogs
  const [blogs, setBlogs] = useState([]);
  // State to store the currently selected blog (if any)
  const [selectedBlog, setSelectedBlog] = useState(null);
  // Loading and error state management
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get blog ID from URL params
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch all blogs when component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:4000/api/blogs/");
        setBlogs(response.data.blogs || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Fetch single blog when an ID is present in the route
  useEffect(() => {
    if (id) {
      const fetchBlogById = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:4000/api/blogs/${id}`);
          setSelectedBlog(response.data);
        } catch (error) {
          console.error("Error fetching blog:", error);
          setError("Failed to fetch blog");
        } finally {
          setLoading(false);
        }
      };
      fetchBlogById();
    } else {
      // Clear selected blog if no ID is present
      setSelectedBlog(null);
    }
  }, [id]);

  // Show loading screen while fetching data
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="animate-pulse text-lg text-gray-400">Loading...</p>
      </div>
    );
  }

  // Show error screen if fetching failed
  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center text-red-400 text-lg">
          {error}
        </div>
        <Footer />
      </div>
    );
  }

  // Show individual blog if a blog is selected (via ID)
  if (selectedBlog) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
        <Header />
        <section className="py-15">
          <div className="flex-grow max-w-5xl mx-auto p-6 mt-10 bg-white/5 backdrop-blur-md rounded-xl shadow-md ">
            {/* Blog title */}
            <h1 className="text-4xl font-bold mb-3 floating-element">{selectedBlog.title}</h1>
            {/* Subtitle */}
            <p className="text-lg italic text-gray-400 mb-2 floating-element">{selectedBlog.subTitle}</p>

            {/* Author and date */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm mb-6">
              <div className="flex flex-row gap-5">
                <p className="text-green-400">Author: {selectedBlog.author}</p>
                <p className="text-yellow-400">Created: {new Date(selectedBlog.createdAt).toLocaleString()}</p>
              </div>
            </div>

            {/* Paragraphs of the blog */}
            <div className="space-y-4 text-gray-300 leading-relaxed">
              {selectedBlog.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Back button */}
            <button
              onClick={() => navigate("/blog")}
              className="mt-8 bg-green-500 text-black font-semibold px-4 py-2 rounded hover:bg-green-400 "
            >
              ← Back to Blogs
            </button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // Default view: Blog listing
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto px-6 py-16 mt-10 min-h-screen">
        {/* Blogs heading */}
        <motion.h1
          className="text-4xl font-bold mb-12 text-center floating-element"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Blogs
        </motion.h1>

        {/* Blog cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer floating-element"
              onClick={() => navigate(`/blog/${blog._id}`)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Blog title */}
              <h2 className="text-2xl font-semibold text-blue-300 mb-2 floating-element">{blog.title}</h2>
              {/* Blog subtitle */}
              <p className="text-sm text-gray-400 italic mb-1 floating-element">{blog.subTitle}</p>
              {/* Author */}
              <p className="text-sm text-green-400 floating-element">Author: {blog.author}</p>
              {/* Creation date */}
              <p className="text-sm text-yellow-400 floating-element">
                Created: {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;