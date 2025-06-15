import React from 'react'
import { BrowserRouter as Router ,Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import AboutAbhishek from './Pages/AboutAbhishek'
import Courses from './Pages/Courses'
import AboutRajan from './Pages/AboutRajan'
import Login from './Pages/Login'
import Musing from './Pages/AboutMusing'
import BlogPage from "./Pages/Blog";
import QMCources from './Pages/QMCources'

const App = () => {
  return (
  <>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/aboutrajan' element={<AboutRajan />} />
        <Route path='/aboutabhishek' element={<AboutAbhishek />} />
        <Route path='/quantummusing' element={<Musing />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/login' element={<Login />} />
        <Route path='/blog' element={<BlogPage />} />
        <Route path='/blog/:id' element={<BlogPage />} />
        <Route path='/course/:id' element={<QMCources />} />
      </Routes>
    </Router>
    </>
  )
}

export default App