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
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 md:px-6">
        <div className="mx-auto w-full max-w-6xl">
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
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
