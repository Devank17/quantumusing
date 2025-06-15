import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Homepage'
import Admins from './pages/Admins'
import Blogs from './pages/Blogs'
import CreateBlog from './pages/CreateBlog'
import Courses from './pages/Courses'
import Users from './pages/Users'
import AddCourse from './pages/AddCourse'
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path='/admins' element={<PrivateRoute><Admins /></PrivateRoute>} />
        <Route path='/blog' element={<PrivateRoute><Blogs /></PrivateRoute>} />
        <Route path='/courses' element={<PrivateRoute><Courses /></PrivateRoute>} />
        <Route path='/users' element={<PrivateRoute><Users /></PrivateRoute>} />
        <Route path='/add-course' element={<PrivateRoute><AddCourse /></PrivateRoute>} />
        <Route path='/blog/create' element={<PrivateRoute><CreateBlog /></PrivateRoute>} />
      </Routes>
    </Router>

    </>
  )
}

export default App
