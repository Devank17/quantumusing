// Import required modules and components
import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Password visibility icons
import { motion, AnimatePresence } from "framer-motion"; // Animation libraries
import { useNavigate } from "react-router-dom"; // Navigation hook
import axios from "axios";
import { UserContextData } from "./../Context/UserContext"; // User context for global state

const Login = () => {
  // Hooks initialization
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContextData);
  
  // Component state management
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login/signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState(""); // Note: Consider renaming to setName for consistency
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!email || !password || (isSignUp && !name)) {
      alert("All fields are required!");
      return;
    }

    if (isSignUp && name.length < 3) {
      alert("Name must be at least 3 characters long.");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    // API configuration based on form mode (login/signup)
    const apiUrl = isSignUp 
      ? "http://localhost:4000/api/user/register"
      : "http://localhost:4000/api/user/login";

    const payload = isSignUp ? { name, email, password } : { email, password };

    try {
      // API request with credentials
      const { data } = await axios.post(apiUrl, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      
      // Update user context and local storage
      setUser(data.user);
      localStorage.setItem('token', data.token);
      alert(isSignUp ? "Account created!" : "Login successful!");

      // Reset form fields
      setEmail("");
      setPassword("");
      setname("");

      // Redirect to home page
      navigate("/");
    } catch (error) {
      // Error handling
      console.error("Request Failed:", error.response?.data || error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  // Toggle between login/signup forms
  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden bg-black flex items-center justify-center px-4">
      <div className="absolute w-full h-full flex flex-col md:flex-row overflow-hidden">
        {/* Left Section - Branding/Information */}
        <motion.section
          className="w-full md:w-1/2 flex flex-col justify-center bg-[#18181b] items-center text-center p-8 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-wider">
            Quantum Musing
          </h1>
          <AnimatePresence mode="wait">
            {/* Animated text based on form mode */}
            <motion.p
              key={isSignUp ? "signup" : "login"}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="text-base md:text-lg text-gray-400 max-w-lg"
            >
              {isSignUp
                ? "Join us to explore Quantum Physics and Computing!"
                : "Discover Quantum Physics with us!"}
            </motion.p>
          </AnimatePresence>
        </motion.section>

        {/* Right Section - Form */}
        <AnimatePresence mode="popLayout">
          <motion.section
            key={isSignUp ? "signup-form" : "login-form"}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ type: "tween", duration: 0.4 }}
            className="w-full md:w-1/2 flex items-center justify-center px-4 py-10"
          >
            {/* Form Container */}
            <div className="w-full max-w-md p-6 sm:p-8 md:p-10 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg shadow-white/10">
              <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-8 md:mb-10">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h1>

              <form className="space-y-8 md:space-y-10 w-full" onSubmit={handleSubmit}>
                {/* Conditional Name Input for Signup */}
                {isSignUp && (
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      placeholder="name"
                      required
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      className="w-full px-5 py-3 md:py-4 rounded-xl bg-transparent border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white transition-all text-base md:text-lg"
                    />
                  </motion.div>
                )}

                {/* Email Input */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="relative"
                >
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-3 md:py-4 rounded-xl bg-transparent border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white transition-all text-base md:text-lg"
                  />
                </motion.div>

                {/* Password Input with Visibility Toggle */}
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="relative"
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-3 md:py-4 rounded-xl bg-transparent border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white transition-all text-base md:text-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-3.5 text-gray-400 hover:text-white transition-all"
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 md:py-4 px-6 text-black font-semibold rounded-xl bg-white hover:bg-gray-300 transition-all text-base md:text-lg"
                >
                  {isSignUp ? "Sign Up" : "Sign In"}
                </motion.button>

                {/* Form Toggle Link */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-center space-y-4"
                >
                  <button
                    type="button"
                    className="text-sm text-gray-400 hover:text-white transition-all"
                    onClick={toggleForm}
                  >
                    {isSignUp
                      ? "Already have an account? Sign In"
                      : "Don't have an account? Sign Up"}
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Login;