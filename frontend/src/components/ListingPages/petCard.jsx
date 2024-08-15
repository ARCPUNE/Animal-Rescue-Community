import React, { useState, useEffect } from 'react';

const PetCard = ({ petId }) => {
  const [pet, setPet] = useState(null);

  useEffect(() => {
    // Fetch the specific pet data using the petId
    fetch(`https://api.example.com/cats/${petId}`)
      .then((response) => response.json())
      .then((data) => setPet(data))
      .catch((error) => console.error('Error fetching pet details:', error));
  }, [petId]);

  if (!pet) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border rounded-lg p-4 shadow-lg">
      <img src={pet.image} alt={pet.name} className="w-full h-48 object-cover rounded-t-lg" />
      <div className="p-4">
        <h2 className="text-xl font-bold">{pet.name}</h2>
        <p className="text-gray-600">Gender: {pet.gender}</p>
        <p className="text-gray-600">Breed: {pet.breed}</p>
      </div>
    </div>
  );
};

export default PetCard;
