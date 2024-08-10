import React from 'react'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'


function Layout() {
  return (
    <div className='w-auto h-auto'>
    <Header />
    <Outlet />
    <Footer />

    </div>
    
    )
}

export default Layout
