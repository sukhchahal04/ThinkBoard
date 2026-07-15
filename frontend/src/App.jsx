import React from 'react'
import { Route, Routes } from 'react-router'
import Navbar from './components/navbar'
import Home from './pages/Home'
import Create from './pages/Create'
import Detail from './pages/Detail'

const App = () => {
  return (
    <div data-theme="forest">
      
        <Navbar />
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/create" element={<Create/>}/>
            <Route path="/note/:id" element={<Detail/>}/>
        </Routes>
    </div>
  )
}

export default App