import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // If using React Router

export default function PetListing() {
  const { id } = useParams(); // Extracting the pet ID from the URL parameters
  const [mainPet, setMainPet] = useState(null); // For the main pet (Mario)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Fetch the pet details using the ID
      axios.get(``)
        .then(response => {
          setMainPet(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching pet data:", error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (!mainPet) {
    return <div>No pet data available</div>; // Handle missing pet data
  }

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="flex flex-wrap justify-between">
        <div className="w-full lg:w-1/2 p-4">
          <img
            src={mainPet.image}
            alt={mainPet.name}
            className="rounded-lg w-full h-auto"
          />
        </div>
        <div className="w-full lg:w-1/2 p-4">
          <h2 className="text-3xl font-bold">{mainPet.name}</h2>
          <p className="text-sm text-gray-500">Listing Date - {mainPet.listingDate}</p>
          <ul className="list-disc pl-5 my-4">
            <li>Gender - {mainPet.gender}</li>
            <li>Species - {mainPet.species}</li>
            <li>Breed - {mainPet.breed}</li>
            <li>Color - {mainPet.color}</li>
            <li>Current Location - {mainPet.location}</li>
          </ul>
          <p className="my-4">{mainPet.description}</p>
          <p className="text-sm text-gray-500">--- posted by {mainPet.postedBy}</p>
          <div className="flex space-x-4 mt-6">
            <button className="bg-black text-white py-2 px-6 rounded-md">Contact</button>
            <button className="bg-black text-white py-2 px-6 rounded-md">Adopt Now</button>
          </div>
          <div className="flex space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              {mainPet.vaccinated && <span className="bg-green-600 text-white text-sm py-1 px-3 rounded-full">Vaccinated</span>}
              {mainPet.verified && <span className="bg-black text-white text-sm py-1 px-3 rounded-full">Verified</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
