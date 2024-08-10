import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

function RegistrationForm() {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [mobile, setMobile] = useState("");
  //   const [name, setName] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400 font-sans">
      <div className="absolute bottom-0 left-0 h-64 w-44 border-black border-2">
        <img src="image.png" className="w-32 h-32" />
      </div>

      <div
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-8 mt-0">
          Create new Account
        </h1>
        
        


        <form>
        <div className="mb-4">
            <label
              htmlFor="text" className="block text-gray-700 font-bold mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-500 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-1"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="w-full border border-gray-500 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="Number" className="block text-gray-700 font-bold mb-1">
              Mobile Number
            </label>
            <input
              type="number"
              className="w-full border border-gray-500 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="password" className="block text-gray-700 font-bold mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-500 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <div className="mb-2">
            <label
              htmlFor="password" className="block text-gray-700 font-bold mb-1">
              re-enter Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-500 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-center mb-2">
            <button className="bg-black hover:bg-black/70 w-36 text-white font-bold py-2 px-4 rounded-lg mb-8 mt-4">
              Register
            </button>
          </div>

          </form>

          <div className="flex justify-center mb-2">
            <div className="align-bottom"> Already Registered ? </div>
         
          <div>
          <Link
              to="/login"
              className=" ml-2 text-white bg-black hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-4 py-1 lg:py-2 mr-2 focus:outline-none"
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
