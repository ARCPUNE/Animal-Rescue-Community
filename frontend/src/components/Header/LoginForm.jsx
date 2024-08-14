import React, { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  // Validate form inputs
  const validate = () => {
    let formErrors = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern) || !email.endsWith('.com')) {
      formErrors.email = "Please enter a valid email address.";
    }

    if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const result = await response.json();
          setEmail("");
          setPassword("");
          setApiError("");
          console.log("Login successful:", result);
          // Handle successful login (e.g., redirect user)
        } else {
          const errorData = await response.json();
          setApiError(errorData.message || "Login failed. Please try again.");
        }
      } catch (error) {
        setApiError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-400 font-sans overflow-hidden">
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
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-8">Login to your Account</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email/Mobile No.
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-500 p-2 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-500 p-2 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}

            <div className="flex justify-center mb-4">
              <button
                type="submit"
                className="bg-black hover:bg-black/70 w-36 text-white font-bold py-2 px-4 rounded-lg"
              >
                Log In
              </button>
            </div>

            <div className="text-center mb-4">
              <a href="#" className="text-black hover:underline">
                Forgot Password?
              </a>
              <span className="mx-2">or</span>
            </div>

            <div className="flex justify-center">
              <img
                src="./LoginImages/google-brands-solid.svg"
                alt="Google"
                className="w-8 h-8 mr-4"
              />
              <img
                src="./LoginImages/apple-brands-solid.svg"
                alt="Apple"
                className="w-8 h-8 mr-4"
              />
              <img
                src="./LoginImages/twitter-brands-solid.svg"
                alt="Twitter"
                className="w-8 h-8"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
