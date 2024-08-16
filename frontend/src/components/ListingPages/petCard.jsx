import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import store from "../../Store/Store";

const PetCard = ({ pet }) => {
  const state = store.getState();
  const token = state.auth.jwtToken;
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (pet && pet.photo != 'null') {
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
  }, [pet,token]);

  if (!pet) {
    return <div>Loading...</div>;
  }

  if (pet.status === "adopted") {
    return null;
  }

  return (
    <div className="border rounded-lg p-4 shadow-lg">
      {imageSrc && (
        <img
          src={imageSrc}
          alt={pet.name}
          className="w-full h-48 object-cover hover:opacity-75 hover:scale-105 ease-in-out duration-300 rounded-t-lg"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold">{pet.name}</h2>
        <p className="text-gray-600">Gender: {pet.gender}</p>
        <p className="text-gray-600">Breed: {pet.breed}</p>
      </div>
    </div>
  );
};

PetCard.propTypes = {
  pet: PropTypes.shape({
    photoURL: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    breed: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default PetCard;
