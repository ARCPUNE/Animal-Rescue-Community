// src/App.jsx
import React from 'react';

const services = [
  {
    title: 'Pet Adoption',
    description: 'Adopt a furry friend from our pet adoption program and give a loving home.',
    buttonText: 'Adopt Now',
    icon: '🐾',
  },
  {
    title: 'Rescue an animal',
    description: 'Our experienced veterinarians provide comprehensive care for your pets.Get in touch Now',
    buttonText: 'Contact',
    icon: '🐶',
  },
  {
    title: 'Pet Supplies',
    description: 'Browse our selection of high-quality pet supplies, including food, toys, and accessories.',
    buttonText: 'Shop Now',
    icon: '📦',
  },
  {
    title: 'Pet Adoption',
    description: 'Adopt a furry friend from our pet adoption program and give a loving home.',
    buttonText: 'Adopt Now',
    icon: '🐾',
  },
  {
    title: 'Rescue an animal',
    description: 'Our experienced veterinarians provide comprehensive care for your pets.Get in touch Now',
    buttonText: 'Contact',
    icon: '🐶',
  },
  {
    title: 'Pet Supplies',
    description: 'Browse our selection of high-quality pet supplies, including food, toys, and accessories.',
    buttonText: 'Shop Now',
    icon: '📦',
  },
  {
    title: 'Pet Supplies',
    description: 'Browse our selection of high-quality pet supplies, including food, toys, and accessories.',
    buttonText: 'Shop Now',
    icon: '📦',
  },{
    title: 'Pet Supplies',
    description: 'Browse our selection of high-quality pet supplies, including food, toys, and accessories.',
    buttonText: 'Shop Now',
    icon: '📦',
  },
];

const ProductAndServices = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center py-12">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold">Our Product and Services</h1>
        <p className="text-gray-600 mt-2">Explore our wide range of pet products and services to keep your furry friends happy and healthy.</p>
      </div>
      <div className="justify-center  grid grid-rows-2 grid-flow-col gap-4 ">
        {services.map((service, index) => (
          <div key={index} className="max-w-xs bg-white rounded-lg shadow-lg p-6 border-r-2 border-2 border-black ">
            <div className="flex justify-center mb-4 text-5xl">{service.icon}</div>
            <h2 className="text-xl font-bold mb-2 text-center">{service.title}</h2>
            <p className="text-gray-600 mb-4 text-center">{service.description}</p>
            <div className="text-center">
              <button     className="inline-flex rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:scale-110 hover:bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 items-center
               hover:text-white transition ease-in-out duration-300">{service.buttonText}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductAndServices;
