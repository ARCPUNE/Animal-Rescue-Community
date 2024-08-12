import { useState } from "react";
import axios from "axios";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to API)
    console.log("Email:", email);
    console.log("Password:", password);
    axios
      .post(
        "http://localhost:8080/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400 font-sans">
      <div className="absolute bottom-0 left-0 h-64 w-44 border-black border-2">
        <img src="image.png" className="w-32 h-32" />
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-16">Login to your Account</h1>

        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email/Mobile No.
            </label>
            <input
              type="text"
              id="email"
              className="w-full border border-gray-500 p-2 rounded-md focus:outline-none focus:border-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-4"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-500 p-2 rounded-md   
 focus:outline-none focus:border-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-center mb-4">
            <button
              className="bg-black hover:bg-black/70 w-36 text-white font-bold py-2 px-4 rounded-lg"
              onClick={handleSubmit}
            >
              Log in
            </button>
          </div>

          <div className="text-center">
            <a href="#" className="text-black hover:underline">
              Forgot Password?
            </a>
            <span className="mx-2">or</span>
          </div>

          <div className="flex justify-center mt-4">
            <img
              src="./LoginImages/google-brands-solid.svg"
              className="w-8 h-8 mr-12"
            />
            <img
              src="./LoginImages/apple-brands-solid.svg"
              className="w-8 h-8 mr-12"
            />
            <img
              src="./LoginImages/twitter-brands-solid.svg"
              className="w-8 h-8"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
