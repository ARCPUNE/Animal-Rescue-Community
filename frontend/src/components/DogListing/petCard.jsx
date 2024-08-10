import React from 'react';

const PetCard = ({ image, name, gender, breed }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-lg mb-4" />
      <h2 className="text-lg font-semibold">{name}</h2>
      <p className="text-gray-600">{gender} - {breed}</p>
      <button className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        Enquire
      </button>
    </div>
  );
};

export default PetCard;
