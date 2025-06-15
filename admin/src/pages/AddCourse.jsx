import React, { useState } from 'react';
import Menu from '../components/Menu';
import axios from 'axios';
import { FiPlus, FiUploadCloud, FiTrash2 } from 'react-icons/fi';

const AddCourse = () => {
  // Individual state variables for each form field
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [languages, setLanguages] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [status, setStatus] = useState('active');
  const [certificate, setCertificate] = useState('yes');
  const [totalContent, setTotalContent] = useState('');
  const [schedule, setSchedule] = useState('');

  // Syllabus state
  const [syllabus, setSyllabus] = useState([{ 
    title: '', 
    lessons: [{ title: '' }] 
  }]);

  // Thumbnail handling
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  // Errors and submission state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle file input change for thumbnail upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, thumbnail: 'Please upload an image file' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, thumbnail: 'File size must be less than 5MB' }));
      return;
    }

    // Preview image
    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnailPreview(reader.result);
      setErrors(prev => ({ ...prev, thumbnail: null }));
    };
    reader.readAsDataURL(file);
    setThumbnailFile(file);
  };

  // Syllabus handlers
  const handleChapterTitleChange = (chapterIndex, value) => {
    const updatedSyllabus = syllabus.map((chapter, index) => 
      index === chapterIndex ? { ...chapter, title: value } : chapter
    );
    setSyllabus(updatedSyllabus);
  };

  // Update lesson title
  const handleLessonChange = (chapterIndex, lessonIndex, value) => {
    const updatedSyllabus = syllabus.map((chapter, index) => {
      if (index === chapterIndex) {
        const updatedLessons = chapter.lessons.map((lesson, lIndex) => 
          lIndex === lessonIndex ? { ...lesson, title: value } : lesson
        );
        return { ...chapter, lessons: updatedLessons };
      }
      return chapter;
    });
    setSyllabus(updatedSyllabus);
  };

  // Add and remove chapters and lessons
  const addChapter = () => {
    setSyllabus(prev => [...prev, { 
      title: '', 
      lessons: [{ title: '' }] 
    }]);
  };

  // Add a lesson to a specific chapter
  const addLesson = (chapterIndex) => {
    setSyllabus(prev => prev.map((chapter, index) => 
      index === chapterIndex 
        ? { ...chapter, lessons: [...chapter.lessons, { title: '' }] }
        : chapter
    ));
  };

  // Remove a chapter or lesson
  const removeChapter = (chapterIndex) => {
    setSyllabus(prev => prev.filter((_, index) => index !== chapterIndex));
  };

  // Remove a lesson from a chapter
  const removeLesson = (chapterIndex, lessonIndex) => {
    setSyllabus(prev => prev.map((chapter, index) => {
      if (index === chapterIndex && chapter.lessons.length > 1) {
        return {
          ...chapter,
          lessons: chapter.lessons.filter((_, lIndex) => lIndex !== lessonIndex)
        };
      }
      return chapter;
    }));
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Course title is required';
    }

    if (!thumbnailFile) {
      newErrors.thumbnail = 'Thumbnail is required';
    }
    if (!price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(price)) {
      newErrors.price = 'Invalid price format';
    }
    if (discount && (discount < 0 || discount > 100)) {
      newErrors.discount = 'Discount must be between 0-100';
    }
    if (!languages.trim()) {
      newErrors.languages = 'At least one language is required';
    }

    // Validate syllabus
    const syllabusErrors = syllabus.some(chapter => 
      !chapter.title.trim() || chapter.lessons.some(lesson => !lesson.title.trim())
    );
    if (syllabusErrors) {
      newErrors.syllabus = 'All chapters and lessons must have titles';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    setIsSubmitting(true); // Set submitting state to true

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('discount', discount || 0);
    formData.append('subject', subject);
    formData.append('grade', grade);
    formData.append('languages', languages.split(',').map(l => l.trim()).join(','));
    formData.append('hashtags', hashtags.split(',').map(h => `#${h.trim()}`).join(','));
    formData.append('status', status);
    formData.append('certificate', certificate);
    formData.append('totalContent', totalContent);
    formData.append('schedule', schedule);
    formData.append('syllabus', JSON.stringify(syllabus));
    formData.append('thumbnail', thumbnailFile);
    formData.append('createdAt', new Date().toISOString());

    try {
      console.log(formData)
      const response = await axios.post('http://localhost:4000/api/courses', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log(response.data)
      

      // Reset form on success

      
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error.response?.data?.message || 'Submission failed. Please try again.'
      }));
    } finally {

      setTitle('');
        setDescription('');
        setPrice('');
        setDiscount('');
        setLanguages('');
        setSubject('');
        setGrade('');
        setHashtags('');
        setSyllabus([{ title: '', lessons: [{ title: '' }] }]);
        setThumbnailPreview(null);
        setThumbnailFile(null);
        setErrors({});

        
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(15,32,39)] via-[#203a43] to-[#2c5364] font-['Inter'] flex">
      <Menu />
      
      <div className="flex-1 p-8 overflow-auto ">
        <h1 className="text-3xl font-bold text-white mb-8">Create New Course</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
          {/* Error Message */}
          {errors.submit && (
            <div className="p-4 bg-red-800 text-red-100 rounded-lg">
              {errors.submit}
            </div>
          )}

          {/* Course Information Section */}
          <div className="bg-gradient-to-br from-[#497e93] via-[#3d6573] to-[#536b75] border border-white/10 rounded-xl p-5 mb-5 hover:shadow-md hover:shadow-cyan-500/20 transition-all">
            <h2 className="text-xl font-semibold text-white">Course Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-100 mb-2">
                    Course Title *
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`w-full bg-white rounded-lg p-3 text-cyan-900 ${
                      errors.title ? 'border-2 border-red-500' : ''
                    }`}
                    placeholder="Complete Web Development Bootcamp"
                  />
                  {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
                </div>

                {/* Thumbnail Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-100 mb-2">
                    Course Thumbnail *
                  </label>
                  <div className={`relative h-40 rounded-lg border-2 border-dashed ${
                    errors.thumbnail ? 'border-red-500' : 'border-gray-00'
                  }`}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {thumbnailPreview ? (
                      <img
                        src={thumbnailPreview}
                        alt="Course thumbnail"
                        className="h-full w-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center space-y-2">
                        <FiUploadCloud className="w-8 h-8 text-gray-200" />
                        <p className="text-gray-200 text-sm">Click to upload</p>
                      </div>
                    )}
                  </div>
                  {errors.thumbnail && <p className="text-red-400 text-sm mt-1">{errors.thumbnail}</p>}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-100 mb-2">
                      Price ($) *
                    </label>
                    <input
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className={`w-full bg-white rounded-lg p-3 text-cyan-900 ${
                        errors.price ? 'border-2 border-red-500' : ''
                      }`}
                      placeholder="49.99"
                    />
                    {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-100 mb-2">
                      Discount (%)
                    </label>
                    <input
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      className="w-full bg-white rounded-lg p-3 text-cyan-900"
                      placeholder="0-100"
                    />
                  </div>
                </div>

                 <div>
                <label className="block text-sm font-medium text-gray-100 mb-2">
                  Subject *
                </label>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white rounded-lg p-3 text-cyan-900"
                  placeholder="Mathematics"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-100 mb-2">
                  Course Schedule
                </label>
                <input
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  className="w-full bg-white rounded-lg p-3 text-cyan-900"
                  placeholder="8 weeks, 2 sessions/week"
                />
              </div>

                <div>
                <label className="block text-sm font-medium text-gray-100 mb-2">
                  Hashtags
                </label>
                <input
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                  className="w-full bg-white rounded-lg p-3 text-cyan-900"
                  placeholder="webdev, javascript, react"
                />
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-100 mb-2">
                  Total Content Hours
                </label>
                <input
                  value={totalContent}
                  onChange={(e) => setTotalContent(e.target.value)}
                  className="w-full bg-white rounded-lg p-3 text-cyan-900"
                  placeholder="35 hours"
                />
              </div>

                <div>
                  <label className="block text-sm font-medium text-gray-100 mb-2">
                    Languages *
                  </label>
                  <input
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                    className={`w-full bg-white rounded-lg p-3 text-cyan-900${
                      errors.languages ? 'border-2 border-red-500' : ''
                    }`}
                    placeholder="English, Spanish, French"
                  />
                  {errors.languages && <p className="text-red-400 text-sm mt-1">{errors.languages}</p>}
                </div>

                {/* Add other fields similarly */}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white rounded-lg p-3 text-cyan-900"
                placeholder="Describe your course..."
                rows="4"
              />
            </div>
          </div>

          {/* Syllabus Section */}
          <div className="bg-gradient-to-br from-[#6d9db2] via-[#7eadbc] to-[#82c7e4] p-6 rounded-xl space-y-6 text-white">
            <h2 className="text-xl font-semibold ">Course Syllabus *</h2>
            
            {syllabus.map((chapter, chapterIndex) => (
              <div key={chapterIndex} className="bg-white/10 p-4 rounded-lg space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-100">Chapter {chapterIndex + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeChapter(chapterIndex)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                    <input
                      value={chapter.title}
                      onChange={(e) => handleChapterTitleChange(chapterIndex, e.target.value)}
                      placeholder="Chapter title"
                      className={`w-full bg-gray-200 rounded-lg p-2 text-cyan-900${
                        errors.syllabus ? 'border-2 border-red-500' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Lessons */}
                <div className="ml-6 space-y-2">
                  {chapter.lessons.map((lesson, lessonIndex) => (
                    <div key={lessonIndex} className="flex items-center gap-2">
                      <input
                        value={lesson.title}
                        onChange={(e) => handleLessonChange(chapterIndex, lessonIndex, e.target.value)}
                        placeholder={`Lesson ${lessonIndex + 1} title`}
                        className={`flex-1 bg-gray-200 rounded-lg p-2 text-cyan-900${
                          errors.syllabus ? 'border-2 border-red-500' : ''
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => removeLesson(chapterIndex, lessonIndex)}
                        className="text-red-400 hover:text-red-600 p-1"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addLesson(chapterIndex)}
                    className="flex items-center gap-1 text-blue-500 hover:text-blue-600 text-sm"
                  >
                    <FiPlus /> Add Lesson
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addChapter}
              className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-200 text-cyan-900 p-3 rounded-lg cursor-"
            >
              <FiPlus /> Add Chapter
            </button>

            {errors.syllabus && <p className="text-red-400 text-sm">{errors.syllabus}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-blue-600 text-cyan-100 rounded-lg disabled:opacity-50 cursor-copy"
            >
              {isSubmitting ? 'Submitting...' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;