import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PetCard from '../petCard';

const CatListing = () => {
  const [petData, setPetData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true); // Set to false to see the non-admin view
  const navigate = useNavigate();

  useEffect(() => {
    // Replace with your actual API endpoint
    fetch('https://api.example.com/cats')
      .then((response) => response.json())
      .then((data) => setPetData(data))
      .catch((error) => console.error('Error fetching pet data:', error));
  }, []);

  // Handler function to delete a pet
  const handleDelete = (petId) => {
    fetch(`https://api.example.com/cats/${petId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setPetData(petData.filter(pet => pet.id !== petId));
          console.log(`Deleted pet with id ${petId}`);
        } else {
          console.error('Failed to delete pet');
        }
      })
      .catch((error) => console.error('Error deleting pet:', error));
  };

  // Handler function to navigate to the adoptCats/id page
  const handleViewDetails = (petId) => {
    navigate(`/adoptCats/${petId}`);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Adopt! Don't Shop!</h1>
      <div className="ml-12 mr-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {petData.map((pet) => (
          <div key={pet.id} className="relative" onClick={() => handleViewDetails(pet.id)}>
            <PetCard petId={pet.id} />
            {isAdmin && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the view details navigation
                  handleDelete(pet.id);
                }}
                className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatListing;
