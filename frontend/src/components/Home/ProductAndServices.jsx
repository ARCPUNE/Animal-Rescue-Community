// src/App.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    title: 'Pet Adoption',
    description: 'Adopt a furry friend from our pet adoption program and give a loving home.',
    buttonText: 'Adopt Now',
    icon: '🐾', 
    link: '/adoptDogs'
  },
  {
    title: 'Rescue an animal',
    description: 'Our experienced veterinarians provide comprehensive care for your pets. Get in touch Now',
    buttonText: 'Contact',
    icon: '🐶',
    link: '/contact'
  },
  {
    title: 'Pet Supplies',
    description: 'Browse our selection of high-quality pet supplies, including food, toys, and accessories.',
    buttonText: 'Shop Now',
    icon: '📦',
    link: '/contact'
  },
];

const ProductAndServices = () => {
  const navigate = useNavigate(); 

  const handleButtonClick = (link) => {
    navigate(link);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center py-12">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold">Our Product and Services</h1>
        <p className="text-gray-600 mt-2">Explore our wide range of pet products and services to keep your furry friends happy and healthy.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="max-w-xs bg-white rounded-lg shadow-lg p-6 border-2 border-black">
            <div className="flex justify-center mb-4 text-5xl">{service.icon}</div>
            <h2 className="text-xl font-bold mb-2 text-center">{service.title}</h2>
            <p className="text-gray-600 mb-4 text-center">{service.description}</p>
            <div className="text-center">
              <button
                onClick={() => handleButtonClick(service.link)}
                className="inline-flex rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:scale-110 hover:bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 transition ease-in-out duration-300"
              >
                {service.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductAndServices;
