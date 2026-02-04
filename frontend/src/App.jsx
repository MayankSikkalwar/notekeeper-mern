import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Createnote from './pages/Createnote'
import Login from './pages/Login'
import Signup from './pages/Signup'

import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div className='flex flex-col min-h-screen bg-gray-900 text-white'>
      
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className='flex-1 container mx-auto p-4'>
        <Routes>

          {/* 🔐 Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <Createnote />
              </ProtectedRoute>
            }
          />

          {/* 🔓 Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
