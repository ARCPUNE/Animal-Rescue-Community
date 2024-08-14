import React, { useState } from "react";
import { Link } from "react-router-dom";

function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let formErrors = {};

    if (name.length > 30) {
      formErrors.name = "Name should be less than 30 characters.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern) || !email.endsWith('.com')) {
      formErrors.email = "Please enter a valid email address.";
    }

    if (mobile.length !== 10) {
      formErrors.mobile = "Mobile number should be exactly 10 digits.";
    }

    if (password !== confirmPassword) {
      formErrors.password = "Passwords do not match.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // console.log(name,email,mobile,
      //   password);
      try {
        const response = await fetch('localhost:3000/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            mobile,
            password,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          setSuccessMessage("Registration successful! Please log in.");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setMobile("");
          setName("");
        } else {
          const errorData = await response.json();
          setErrors({ apiError: errorData.message || "Registration failed. Please try again." });
        }
      } catch (error) {
        setErrors({ apiError: "An error occurred. Please try again." });
      }
    }
  };

  return (
    <div className="relative w-full h-screen items-center justify-center min-h-screen bg-gray-400 font-sans overflow-hidden">
    <video 
              className="absolute top-0 left-0 w-full h-full object-cover z-0" 
              autoPlay 
              loop 
              muted
          >
              <source src='./HomeImages/background.mp4' type="video/mp4" />
              Your browser does not support the video tag.
          </video>
          <div className="relative z-10 flex justify-center items-center min-h-screen bg-opacity-50 bg-gray-400 p-8">
    {/* <div
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-md overflow-auto bg-opacity-50"
    > */}

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md bg-opacity-50">
        <h1 className="text-2xl font-bold mb-8 mt-0">Create new Account</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-500 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-500 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="mb-2">
            <label htmlFor="mobile" className="block text-gray-700 font-bold mb-1">
              Mobile Number
            </label>
            <input
              type="number"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full border border-gray-500 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-500 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-1">
              Re-enter Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-500 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div className="flex justify-center mb-2">
            <button
              type="submit"
              className="bg-black hover:bg-black/70 w-36 text-white font-bold py-2 px-4 rounded-lg mb-8 mt-4"
            >
              Register
            </button>
          </div>
        </form>

        <div className="flex justify-center mb-2">
          <div className="align-bottom">Already Registered?</div>
          <Link
            to="/login"
            className="ml-2 text-black  hover:scale-110 focus:ring-4 focus:ring-gray-300 font-medium underline rounded-lg text-sm px-2 lg:px-4 py-1 lg:py-2 mr-2 focus:outline-none"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}

export default RegistrationForm;
