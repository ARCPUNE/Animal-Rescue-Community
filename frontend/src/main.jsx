import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import LoginForm from './components/Header/LoginForm.jsx'
import RegistrationForm from './components/Header/RegistrationForm.jsx'
import DogListing from './components/DogListing/DogListing.jsx'
import CatListing from './components/CatListing/CatListing.jsx'
import DonatePage from './components/DonatePage/DonatePage.jsx'

// const router = createBrowserRouter([
//   {
//     path : '/',
//     element : <Layout />,

//     children : [
//       {
//         path : '',
//         element : <Home />
//       },

//       {
//         path : '/about',
//         element : <About />
//       },
//       {
//         path : '/contact',
//         element : <Contact />
//       }
//     ]
//   }

// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = '/' element={<Layout />} >
      <Route path ='' element={<Home />} />
      <Route path ='about' element={<About />} />
      <Route path ='contact' element={<Contact />} />
      <Route path ='login' element={<LoginForm />} />
      <Route path ='register' element={<RegistrationForm />} />
      <Route path ='adoptDogs' element={<DogListing />} />
      <Route path ='adoptCats' element={<CatListing />} />
      <Route path ='donate' element={<DonatePage />} />

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router = {router} />
  </React.StrictMode>,
)
