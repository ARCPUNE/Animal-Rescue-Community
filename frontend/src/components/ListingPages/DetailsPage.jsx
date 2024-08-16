import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // If using React Router
import axiosInstance from '../../AxiosInstance';
import store from '../../Store/Store';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PetListing() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const state = store.getState();
  const token = state.auth.jwtToken;
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch the pet details using the ID
      axiosInstance.get(`/api/animals/${id}`)
        .then(response => {
          setPet(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching pet data:", error);
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    if (pet && pet.photo !== 'null') {
      const fetchImage = async () => {
        try {
          const response = await axios.get(pet.photoURL, {
            responseType: "blob",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const url = URL.createObjectURL(response.data);
          setImageSrc(url);
        } catch (error) {
          console.error("Error fetching the image:", error);
        }
      };

      fetchImage();
    }
  }, [pet, token]);

  if (loading) {
    return <div className="flex justify-center items-center mb-4">
    <img
      src="../../../public/Running dog.gif"
      alt="Loading..."
      className="w-15"
    />
  </div> // Loading state
  }

  if (!pet) {
    return <div>No pet data available</div>; // Handle missing pet data
  }

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="flex flex-wrap justify-between">
        <div className="w-full lg:w-1/2 p-4">
          {imageSrc && (
            <img
              src={imageSrc}
              alt={pet.name}
              className="w-full h-auto object-cover rounded-t-lg"
            />
          )}
        </div>
        <div className="w-full lg:w-1/2 p-4">
          <h2 className="text-3xl font-bold">{pet.name}</h2>
          <ul className="list-disc pl-5 my-4">
            <li>Gender - {pet.gender}</li>
            <li>Species - {pet.category}</li>
            <li>Breed - {pet.breed}</li>
            <li>Age - {pet.age}</li>
            <li>Current Location - {pet.location}</li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              {pet.vaccinated ? (
                <span className="bg-green-600 text-white text-sm py-1 px-3 rounded-full">
                  Vaccinated
                </span>
              ):(
                <span className="bg-red-600 text-white text-sm py-1 px-3 rounded-full">
                  Not Vaccinated
                </span>
              )}
              {pet.dewormed ? (
                <span className="bg-green-600 text-white text-sm py-1 px-3 rounded-full">
                  Dewormed
                </span>
              ):(
                <span className="bg-red-600 text-white text-sm py-1 px-3 rounded-full">
                  Not Dewormed
                </span>
              )}
            </div>
          </div>
          <p className="my-4">{pet.description}</p>
          <div className="flex space-x-4 mt-6">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md">
              Contact
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md" onClick={() => navigate(`/adopt/${pet.id}`)}>
              Adopt Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
