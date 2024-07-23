import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Admin from './pages/admin/Admin'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Admin />
      </BrowserRouter>
    </div>
  )
}

export default App
