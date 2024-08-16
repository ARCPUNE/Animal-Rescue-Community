import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import Contact from "./components/Contact/Contact.jsx";
import LoginForm from "./components/Header/LoginForm.jsx";
import RegistrationForm from "./components/Header/RegistrationForm.jsx";
import DonatePage from "./components/DonatePage/DonatePage.jsx";
import Post from "./components/Post/Post.jsx";
import PetAdoptionForm from "./components/PetAdoptionForm.jsx";
import DogListing from "./components/ListingPages/DogListing/DogListing.jsx";
import CatListing from "./components/ListingPages/CatListing/CatListing.jsx";
import WorkInProgress from "./components/inProgress.jsx";
import ForgotPassword from "./components/Header/ForgotPass.jsx";
import OthersListing from "./components/ListingPages/OthersListing";
import ProtectedRoute from "./ProtectedRoute";
import PetListing from "./components/ListingPages/DetailsPage.jsx";
import AdminPage from "./components/AdminPage/AdminPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="login" element={<LoginForm />} />
      <Route path="login/forgot-pass" element={<ForgotPassword />} />
      <Route path="register" element={<RegistrationForm />} />
      <Route path="" element={<Home />} />
      <Route path="home" element={<Home />} />

      {/* Protected Routes */}
      <Route path="about" element={<ProtectedRoute element={<About />} />} />
      <Route path="contact" element={<ProtectedRoute element={<Contact />} />} />
      <Route path="adoptDogs" element={<ProtectedRoute element={<DogListing />} />} />
      <Route path="adoptCats" element={<ProtectedRoute element={<CatListing />} />} />
      <Route path="others" element={<ProtectedRoute element={<OthersListing />} />} />
      <Route path="adoptDogs/:id" element={<ProtectedRoute element={<PetListing />} />} />
      <Route path="adoptCats/:id" element={<ProtectedRoute element={<PetListing />} />} />
      <Route path="others/:id" element={<ProtectedRoute element={<PetListing />} />} />
      <Route path="donate" element={<ProtectedRoute element={<DonatePage />} />} />
      <Route path="adopt/:id" element={<ProtectedRoute element={<PetAdoptionForm />} />} />

      <Route path="post" element={<ProtectedRoute element={<Post />} />} />
      <Route path="form" element={<ProtectedRoute element={<PetAdoptionForm />} />} />
      <Route path="inProgress" element={<ProtectedRoute element={<WorkInProgress />} />} />
      <Route path="admin" element={<ProtectedRoute element={<AdminPage />} />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
