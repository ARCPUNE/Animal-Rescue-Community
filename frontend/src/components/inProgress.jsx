import React from 'react';
import { Link } from 'react-router-dom';

const WorkInProgress = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-bounce mb-4">
          <svg 
            className="w-16 h-16 text-indigo-600 mx-auto" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7H7v6m4 4h6m-4-10h10m0 0v10m0-10L10 17"></path>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Work in Progress</h1>
        <p className="text-gray-600">We're working hard to get this page ready. Stay tuned!</p>
        <div className="mt-6">
            <Link to='/'>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-500 transition duration-300">
            Go Back
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkInProgress;
