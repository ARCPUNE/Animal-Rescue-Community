import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../AxiosInstance";
import store from "../../Store/Store";

const AdminPage = () => {
  const [adoptions, setAdoptions] = useState([]);
  const [animals, setAnimals] = useState([]);
  const state = store.getState();
  const token = state.auth.jwtToken;
  const [imageSrcs, setImageSrcs] = useState({});

  const fetchAdoptions = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/api/adoptions");
      setAdoptions(
        response.data.filter((adoption) => adoption.status === "PENDING")
      );
    } catch (error) {
      console.error("There was an error fetching the adoption requests!", error);
    }
  }, []);

  const fetchAnimals = useCallback(async () => {
    try {
      const uniqueAnimalIds = new Set(
        adoptions.map((adoption) => adoption.animalId.id)
      );
      const animalDataPromises = Array.from(uniqueAnimalIds).map((animalId) =>
        axiosInstance.get(`/api/animals/${animalId}`)
      );
      const animalDataResponses = await Promise.all(animalDataPromises);
      const animalData = animalDataResponses.map((response) => response.data);
      setAnimals(animalData);
    } catch (error) {
      console.error("There was an error fetching animal data!", error);
    }
  }, [adoptions]);

  useEffect(() => {
    fetchAdoptions();
  }, [fetchAdoptions]);

  useEffect(() => {
    if (adoptions.length > 0) {
      fetchAnimals();
    }
  }, [adoptions, fetchAnimals]);

  useEffect(() => {
    const fetchImage = async (animalId, photoURL) => {
      try {
        const response = await axios.get(photoURL, {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const url = URL.createObjectURL(response.data);
        setImageSrcs((prevState) => ({
          ...prevState,
          [animalId]: url,
        }));
      } catch (error) {
        console.error("Error fetching the image:", error);
      }
    };

    animals.forEach((animal) => {
      if (animal.photo && animal.photo !== "null") {
        fetchImage(animal.id, animal.photoURL);
      }
    });
  }, [animals, token]);

  const handleApprove = async (animalId) => {
    try {
      const adoptionDTO = adoptions.find((adoption) => adoption.animalId.id === animalId);
      const animalDTO = animals.find((animal) => animal.id === animalId);

      adoptionDTO.status = "APPROVED";
      animalDTO.status = "ADOPTED";

      // Prepare FormData for the request
      const formData = new FormData();
      formData.append("adoptionDTO", JSON.stringify(adoptionDTO));
      formData.append("animalDTO", JSON.stringify(animalDTO));

      await axiosInstance.put(`/api/adoptions/${adoptionDTO.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Refetch adoptions
      fetchAdoptions();
    } catch (error) {
      console.error("There was an error approving the adoption!", error);
    }
  };

  const handleReject = async (animalId) => {
    try {
      const adoptionDTO = adoptions.find((adoption) => adoption.animalId.id === animalId);

      // Prepare FormData for the adoption update
      const formData = new FormData();
      formData.append("adoptionDTO", new Blob([JSON.stringify({
        id: adoptionDTO.id,
        status: "REJECTED",
      })], { type: "application/json" }));

      // Send the request as multipart
      await axiosInstance.put(`/api/adoptions/${adoptionDTO.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Refetch adoptions
      fetchAdoptions();
    } catch (error) {
      console.error("There was an error rejecting the adoption!", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Adoption Requests
        </h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          {animals.map((animal) => (
            <div
              key={animal.id}
              className="flex items-center justify-between p-4 mb-4 bg-gray-100 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={imageSrcs[animal.id] || "default-image.jpg"}
                  alt={animal.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-lg font-medium">
                    Name: {animal.name}
                    {animal.category ? (
                      <span>, Species: {animal.category}</span>
                    ) : (
                      <span>, Age: {animal.age}</span>
                    )}
                    , Gender: {animal.gender}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleApprove(animal.id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleReject(animal.id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
