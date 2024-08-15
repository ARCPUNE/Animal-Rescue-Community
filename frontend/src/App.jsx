import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Header />
    <Home />
    <Footer /> */}
    </>
  )
}

export default App
