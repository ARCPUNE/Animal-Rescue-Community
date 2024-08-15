import React from 'react';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    title: 'Pet Adoption',
    description: 'Adopt a furry friend from our pet adoption program and give a loving home.',
    buttonText: 'Adopt Now',
<<<<<<< HEAD
    icon: '😻',
=======
    icon: '🐾', 
    link: '/adoptDogs'
>>>>>>> main
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
<<<<<<< HEAD
    icon: '🦴',
  },
  {
    title: 'Pet Ambulance',
    description: 'Book an ambulance for emergency rescues',
    buttonText: 'Book Now',
    icon: '🚑',
  },
  {
    title: 'Pet Grooming',
    description: 'Our experienced groomers care for your pets. Get in touch Now',
    buttonText: 'Contact',
    icon: '✂️',
  },
  {
    title: 'Pet Sitters',
    description: 'Travelling out of town? Need someone to look after your pets?',
    buttonText: 'Contact',
    icon: '👨‍🦯',
  },
  {
    title: 'Animal Birth Control',
    description: 'Animal Birth Control Programs for stray animals',
    buttonText: 'Contact',
    icon: '⚕️',
  },
  {
    title: 'Pet Taxi',
    description: 'Looking for a taxi for you to take your pets along?',
    buttonText: 'Book Now',
    icon: '🚗',
=======
    icon: '📦',
    link: '/contact'
>>>>>>> main
  },
];

const ProductAndServices = () => {
  const navigate = useNavigate(); 

  const handleButtonClick = (link) => {
    navigate(link);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">Our Product and Services</h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
          Explore our wide range of pet products and services to keep your furry friends happy and healthy.
        </p>
      </div>
<<<<<<< HEAD
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service, index) => (
          <div key={index} className="max-w-xs bg-white rounded-lg shadow-lg p-6 border-r-2 border-2 border-black">
=======
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="max-w-xs bg-white rounded-lg shadow-lg p-6 border-2 border-black">
>>>>>>> main
            <div className="flex justify-center mb-4 text-5xl">{service.icon}</div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-center">{service.title}</h2>
            <p className="text-gray-600 mb-4 text-center text-sm sm:text-base md:text-lg">{service.description}</p>
            <div className="text-center">
<<<<<<< HEAD
              <button className="inline-flex rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:scale-110 hover:bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 items-center hover:text-white transition ease-in-out duration-300">
=======
              <button
                onClick={() => handleButtonClick(service.link)}
                className="inline-flex rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:scale-110 hover:bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 transition ease-in-out duration-300"
              >
>>>>>>> main
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
