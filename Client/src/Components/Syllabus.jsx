"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

// CourseSyllabus component receives a prop 'Syllabus', which is an array of topics
export default function CourseSyllabus({ Syllabus = [] }) {
  // State to keep track of which topics are expanded; keys are topic titles, values are booleans
  const [expandedTopics, setExpandedTopics] = useState({})

  // Toggles the expanded state of a topic by title
  const toggleTopic = (title) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [title]: !prev[title],  // flip true/false
    }))
  }

  return (
    <div className="bg-black text-white py-6 md:py-12">
      <div className="max-w-6xl mx-auto space-y-8 px-4 sm:px-6">
        
        {/* Show message if syllabus data is empty */}
        {Syllabus.length === 0 ? (
          <p className="text-gray-400 text-lg">No syllabus data available.</p>
        ) : (
          // Map through each topic in syllabus
          Syllabus.map((topic, index) => (
            <div key={index} className="border-b border-gray-600">
              
              {/* Topic title button toggles visibility of lessons */}
              <button
                onClick={() => toggleTopic(topic.title)}
                className="w-full py-10 flex items-center justify-between text-left hover:text-gray-300 transition-colors"
              >
                {/* Topic title */}
                <span className="text-2xl sm:text-4xl font-semibold">{topic.title}</span>

                {/* Chevron icon rotates when topic is expanded */}
                <motion.div
                  animate={{ rotate: expandedTopics[topic.title] ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6" />
                </motion.div>
              </button>

              {/* Animate presence controls mounting/unmounting animation */}
              <AnimatePresence>
                {/* Show lessons only if the topic is expanded */}
                {expandedTopics[topic.title] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}   // start collapsed and invisible
                    animate={{ height: "auto", opacity: 1 }} // expand and fade in
                    exit={{ height: 0, opacity: 0 }}       // collapse and fade out
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    {/* List of lessons under the topic */}
                    <ul className="space-y-3 pb-6">
                      {topic.lessons?.map((lesson, i) => (
                        <motion.li
                          key={i}
                          initial={{ x: -20, opacity: 0 }}  // slide in from left + fade in
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -20, opacity: 0 }}     // slide out to left + fade out
                          transition={{ duration: 0.2 }}
                          className="text-gray-400 text-xl py-2 hover:text-white transition-colors pl-4 border-l-2 border-gray-800"
                        >
                          {lesson.title}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        )}
      </div>
    </div>
  )
}