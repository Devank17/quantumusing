import React from 'react'
import Navbar from './../Components/Nav'
import Syllabus from '../Components/Syllabus'
import CouponCard from './../Components/CouponCard'
import Footer from '../Components/Footer'
import { useLocation, useNavigate } from 'react-router-dom';
import Cources from './Courses'

const QMCources = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const course = state?.course;

  console.log(course)
  return (
    <div className="bg-black overflow-hidden">
      {/* Hero Section */}
      <section className="pt-20 lg:pt-24 pb-12 lg:pb-0 lg:min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12 xl:gap-16">
            {/* Left Content */}
            <div className="lg:w-1/2 xl:w-2/5 flex flex-col justify-center">
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-6">
                {course.title}
              </h1>

              {/* Tags - Mobile */}
              <div className="flex flex-wrap gap-3 lg:hidden mb-8">
                {course.hashtags.map((tag, i) => (
                    <div key={i} className="text-white px-4 py-2 rounded-md bg-gray-800 text-sm">
                      {tag}
                    </div>
                  ))}
              </div>

              {/* Pricing Section */}
              <div className="space-y-4">
                <div className="flex items-baseline gap-4">
                  <span className="text-emerald-400 text-3xl md:text-4xl font-bold">${Math.round(course.price - (course.price * course.discount / 100))}</span>
                  <span className="text-gray-400 line-through text-xl">${course.price}</span>
                  <span className="text-gray-300 text-lg">(+GST)</span>
                </div>
                <p className="text-emerald-400 font-semibold">Limited Time Discount Applied!</p>
                
                <button className="bg-emerald-500 hover:bg-emerald-600 transition-colors text-white py-4 px-8 rounded-lg text-xl font-bold w-full lg:w-auto">
                  Buy Now
                </button>
                
                <p className="text-gray-300 text-sm md:text-base">
                  Cource Duration <span className="text-emerald-400">{course.schedule}</span>
                </p>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:w-1/2 xl:w-3/5">
              <div className="bg-gray-800 rounded-xl overflow-hidden aspect-video relative">
                <div className="absolute inset-0" />
                <img src={course.thumbnail} alt="" />
                {/* Tags - Desktop */}
                <div className="hidden lg:flex absolute bottom-6 left-0 right-0 justify-center gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="text-white px-4 py-2 rounded-md bg-gray-800 backdrop-blur-sm bg-opacity-50">
                      Quantum Physics
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Title Section */}
      <section className="py-16 ">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight mb-4">
            {course.title}
          </h1>
          {/* <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
            From Fundamentals to Mastery
          </h2> */}
        </div>
      </section>

      {/* Syllabus Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h1 className="text-white text-6xl md:text-8xl lg:text-9xl font-bold opacity-30">Syllabus</h1>
            <h2 className="text-gray-400 text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
              Dominate from Start to Victory
            </h2>
          </div>

          <Syllabus Syllabus={course.syllabus}/>

          <div className="flex justify-center mt-12">
            <button className="bg-emerald-500 hover:bg-emerald-600 transition-colors text-white py-4 px-8 rounded-lg text-xl font-bold">
              View Complete Syllabus
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-white text-6xl md:text-8xl lg:text-9xl font-bold opacity-30 mb-8">
            More Value, Less Cost.
          </h1>
          
          <div className="max-w-2xl">
            <p className="text-white text-2xl md:text-3xl mb-4">
              Quality And Value Drive Us,{' '}
              <span className="text-emerald-400">Delivering More</span> For{' '}
              <span className="text-emerald-400">Less Cost</span>.
            </p>
            <p className="text-gray-400 text-sm md:text-base">
              *Courses Valid for 2 years after purchase
            </p>
          </div>

          <div className="mt-12 max-w-3xl mx-auto">
            <CouponCard />
          </div>

          <div className="flex justify-center mt-8">
            <button className="bg-emerald-500 hover:bg-emerald-600 transition-colors text-white py-4 px-8 rounded-lg text-xl font-bold">
              Start Learning Now
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default QMCources