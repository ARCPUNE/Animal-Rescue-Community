import React from 'react';
import PetCard from './petCard';


const DogListing = () => {
  const petData = [
    {
      image: './HomeImages/First.png', // Replace with actual image URLs
      name: 'Mario',
      gender: 'Male',
      breed: 'Golden Retriever',
    },
    {
        image: './HomeImages/First.png', // Replace with actual image URLs
        name: 'Mario',
        gender: 'Male',
        breed: 'Golden Retriever',
      },{
        image: './HomeImages/First.png', // Replace with actual image URLs
        name: 'Mario',
        gender: 'Male',
        breed: 'Golden Retriever',
      },{
        image: './HomeImages/First.png', // Replace with actual image URLs
        name: 'Mario',
        gender: 'Male',
        breed: 'Golden Retriever',
      },{
        image: './HomeImages/First.png', // Replace with actual image URLs
        name: 'Mario',
        gender: 'Male',
        breed: 'Golden Retriever',
      },{
        image: './HomeImages/First.png', // Replace with actual image URLs
        name: 'Mario',
        gender: 'Male',
        breed: 'Golden Retriever',
      },{
        image: './HomeImages/First.png', // Replace with actual image URLs
        name: 'Mario',
        gender: 'Male',
        breed: 'Golden Retriever',
      },{
        image: './HomeImages/First.png', // Replace with actual image URLs
        name: 'Mario',
        gender: 'Male',
        breed: 'Golden Retriever',
      },
   
  ];

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Adopt! Don't Shop!</h1>
      <div className="ml-12 mr-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {petData.map((pet, index) => (
          <PetCard key={index} {...pet} />
        ))}
      </div>
    </div>
  );
};

export default DogListing;
