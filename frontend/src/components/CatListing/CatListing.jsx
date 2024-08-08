import React from 'react';
import PetCard from '../DogListing/petCard';



const CatListing = () => {
  const petData = [
    {
      image: './HomeImages/First.png', // Replace with actual image URLs
      name: 'Maria',
      gender: 'female',
      breed: 'abcdefgh',
    },
    {
        image: './HomeImages/First.png', // Replace with actual image URLs
        name: 'Maria',
        gender: 'female',
        breed: 'abcdefgh',
    },
    {
        image: './HomeImages/First.png', // Replace with actual image URLs
        name: 'Maria',
        gender: 'female',
        breed: 'abcdefgh',
      },
      {
        image: './HomeImages/First.png', // Replace with actual image URLs
        name: 'Maria',
        gender: 'female',
        breed: 'abcdefgh',
      },
      {
        image: './HomeImages/First.png', // Replace with actual image URLs
        name: 'Maria',
        gender: 'female',
        breed: 'abcdefgh',
      },
      {
        image: './HomeImages/First.png', // Replace with actual image URLs
        name: 'Maria',
        gender: 'female',
        breed: 'abcdefgh',
      },
      {
        image: './HomeImages/First.png', // Replace with actual image URLs
        name: 'Maria',
        gender: 'female',
        breed: 'abcdefgh',
      },

  ];

  const [isAdmin, setIsAdmin] = useState(true); // Set to false to see the non-admin view

  // Handler function to delete a pet
  const handleDelete = (petIndex) => {
    // You might want to update state or make an API call here to delete the pet
    console.log(`Deleting pet at index ${petIndex}`);
    // For demonstration purposes, we'll just log to the console
  };
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Adopt! Don't Shop!</h1>
      <div className="ml-12 mr-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {petData.map((pet, index) => (
          <div key={index} className="relative">
          <PetCard {...pet} />
        </div>
        ))}
      </div>
    </div>
  );
};

export default CatListing;
