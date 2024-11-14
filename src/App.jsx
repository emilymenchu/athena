import React from 'react'; 
import { useState } from 'react'
import { useRoutes, BrowserRouter } from 'react-router-dom'
import Dashboard from './dashboard/Dashboard';
import SignIn from './sign-in/SignIn'
import './App.css'

function App() {

  const AppRoutes = () => {
    let routes = useRoutes ( [
      { path: '/', element: <SignIn />},
      { path: '/sign-in', element: <SignIn />},
      { path: '/dashboard', element: <Dashboard />},
    ]);
    return routes;
  }
  return (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
  )
}

export default App
