import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import { useParams } from "react-router-dom";
import axiosInstance from "../AxiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { State, City } from "country-state-city";
import Select from "react-select";

const PetAdoptionForm = () => {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [formData, setFormData] = useState({
    name: user.name || "",
    address: user.address || "",
    phoneNo: user.phoneNo || "",
    alternateContact: user.alternateContact || "",
    email: user.email || "",
    govtId: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    address: "",
    phoneNo: "",
    alternateContact: "",
    email: "",
    govtId: "",
    state: "",
    city: "",
  });


  const stateOptions = State.getStatesOfCountry("IN").map((state) => ({
    label: state.name,
    value: state.isoCode,
  }));

  const cityOptions = selectedState
    ? City.getCitiesOfState("IN", selectedState?.value).map((city) => ({
        label: city.name,
        value: city.name,
      }))
    : [];

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
      isValid = false;
    }

    if (!formData.phoneNo) {
      newErrors.phoneNo = "Phone number is required";
      isValid = false;
    }

    if (!formData.alternateContact) {
      newErrors.alternateContact = "Alternate contact number is required";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!formData.govtId) {
      newErrors.govtId = "Govt ID number is required";
      isValid = false;
    }
    if (!selectedState) {
      newErrors.state = "State is required.";
    }

    if (!selectedCity) {
      newErrors.city = "City is required.";
    }

    setErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    if (id) {
      // Fetch the pet details using the ID
      axiosInstance
        .get(`/api/animals/${id}`)
        .then((response) => {
          setPet(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching pet data:", error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDownload = () => {
    const doc = new jsPDF();
  
    // Title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Pet Adoption Commitment Form", 20, 20);
  
    // Date
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30);
  
    // Section: Adopter's Information
    doc.setFont("helvetica", "bold");
    doc.text("Adopter's Information", 20, 40);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${formData.name}`, 20, 50);
    doc.text(`Mobile: ${formData.phoneNo}`, 20, 60);
    doc.text(`Alternate Contact: ${formData.alternateContact}`, 20, 70);
    doc.text(`Email: ${formData.email}`, 20, 80);
    doc.text(`Address: ${formData.address}, ${selectedCity?.label}, ${selectedState?.label}`, 20, 90);
  
    // Section: Animal's Information
    doc.setFont("helvetica", "bold");
    doc.text("Animal's Information", 20, 100);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${pet.name}`, 20, 110);
    doc.text(`Species: ${pet.category}`, 20, 120);
    doc.text(`Gender: ${pet.gender}`, 20, 130);
    doc.text(`Age: ${pet.age}`, 20, 140);
    doc.text(`Description: ${pet.description}`, 20, 150);
  
    // Footer
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text("Thank you for choosing to adopt!", 20, 160);
  
    // Save the PDF
    doc.save("PetAdoptionForm.pdf");
  };
  

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formDataToSubmit = new FormData();
    const adoptionDTO = {
      animalId: {
        id: pet.id,
      },
      userId: {
        id: user.id,
      },
      status: "PENDING",
      govtIdPhoto: "",
      govtId: formData.govtId,
    };

    formDataToSubmit.append("adoptionDTO", JSON.stringify(adoptionDTO));
    if (formData.image) {
      formDataToSubmit.append("file", formData.image);
    }

    try {
      // Check if any of the user fields are null
      if (!user.phoneNo || !user.email || !user.address) {
        const updatedUser = {
          id: user.id,
          name: user.name,
          phoneNo: user.phoneNo || formData.phoneNo, // Update only if null
          email: user.email || formData.email, // Update only if null
          address: user.address || `${formData.address}, ${selectedCity?.label}, ${selectedState?.label}`, // Update only if null
        };
  
        // Make the PUT request to update user data
        await axiosInstance.put(`/api/users/${user.id}`, updatedUser);
        console.log("User data updated successfully");
      }
  
      // Proceed with the adoption request
      const response = await axiosInstance.post("/api/adoptions", formDataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (response.status === 201) {
        console.log(response.data);
        alert("Adoption request submitted successfully!");
        handleDownload();
        navigate("/adoptDogs");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error submitting the adoption request. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({
                ...formData,
                image: file,
                imagePreview: reader.result
            });
        };
        reader.readAsDataURL(file);
    }
};

  if (loading) {
    return (
      <div className="flex justify-center items-center mb-4">
        <img
          src="../../../public/Running dog.gif"
          alt="Loading..."
          className="w-15"
        />
      </div>
    ); // Loading state
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-300 to-purple-500 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-3xl w-full">
        <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-8">
          🐾 Pet Adoption Commitment Form 🐾
        </h1>

        {/* Date and Download */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleDownload}
            className="bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800 transition-transform transform hover:scale-105"
          >
            Download <span className="text-xs ml-1">⬇️</span>
          </button>
        </div>

        {/* Adoption Agreement Text */}
        <p className="text-md text-gray-700 leading-relaxed mb-8">
          Adoption or transfer of ownership of the animal is in consideration of
          the following promises by the adopter: The adopter understands that
          this is a commitment lasting for the entire life of the animal and the
          adopter agrees that under no circumstances will they abandon the
          animal, ill-treat, and deprive the animal of healthy food and water.
          The adopter accepts responsibility for the actions of the animal and
          to respect, and care for the animal in sickness and in health.
        </p>

        {/* Animal Details */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-purple-600 mb-4">
            Animal Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-md font-medium text-gray-800">
                Animal Name:
              </label>
              <input
                type="text"
                name="animalName"
                value={pet.name}
                disabled
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                placeholder="Animal's Name (If any)"
              />
            </div>
            <div>
              <label className="text-md font-medium text-gray-800">
                Species:
              </label>
              <select
                name="species"
                value={pet.category}
                disabled
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-300 focus:border-transparent"
              >
                <option value="">{pet.category}</option>
              </select>
            </div>
            <div>
              <label className="text-md font-medium text-gray-800">
                Gender:
              </label>
              <select
                name="gender"
                value={pet.gender}
                disabled
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-300 focus:border-transparent"
              >
                <option value="">{pet.gender}</option>
              </select>
            </div>
            <div>
              <label className="text-md font-medium text-gray-800">Age:</label>
              <input
                type="text"
                name="age"
                value={pet.age}
                disabled
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-300 focus:border-transparent"
                placeholder="Animal's Age"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-md font-medium text-gray-800">
              Description & Identification Marks:
            </label>
            <textarea
              name="description"
              value={pet.description}
              disabled
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-300 focus:border-transparent"
              rows="4"
              placeholder="Provide a description of the animal"
            ></textarea>
          </div>
        </div>

        {/* Adoption Agreement */}
        <div className="mb-6">
          <p className="text-md text-gray-700">
            I,{" "}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-1/2 p-2 mx-2 border-b border-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="Your Name"
            />
            am willing to adopt
            <input
              type="text"
              name="animalName"
              value={pet.name}
              disabled
              className="w-1/2 p-2 mx-2 border-b border-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="Animal Name"
            />
            from his/her foster parent.
          </p>
        </div>

        {/* Adopter's Details */}
        <div className="mb-8">
          <div>
            <label className="text-md font-medium text-gray-800">
              Adopter’s Full Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-300 focus:border-transparent mb-4"
              placeholder="Full Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <label className="text-md font-medium text-gray-800">Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-300 focus:border-transparent"
            rows="3"
            placeholder="Your Address"
          ></textarea>
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>

        <div className="flex space-x-4 mb-2">
          <div className="w-1/2">
            <label htmlFor="state" className="block text-gray-700 font-bold mb-1">
              State
            </label>
            <Select
              id="state"
              options={stateOptions}
              value={selectedState}
              onChange={(option) => {
                setSelectedState(option);
                setSelectedCity(null);
              }}
              className="w-full"
            />
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state}</p>
            )}
          </div>

          <div className="w-1/2">
            <label htmlFor="city" className="block text-gray-700 font-bold mb-1">
              City
            </label>
            <Select
              id="city"
              options={cityOptions}
              value={selectedCity}
              onChange={(option) => setSelectedCity(option)}
              className="w-full"
              isDisabled={!selectedState}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>
        </div>

        <label className="text-md font-medium text-gray-800">Mobile:</label>
        <input
          type="text"
          name="phoneNo"
          value={formData.phoneNo}
          onChange={handleChange}
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-300 focus:border-transparent mb-4"
          placeholder="Your Mobile Number"
        />
        {errors.phoneNo && <p className="text-red-500 text-sm">{errors.phoneNo}</p>}

        <label className="text-md font-medium text-gray-800">
          Alternate Contact:
        </label>
        <input
          type="text"
          name="alternateContact"
          value={formData.alternateContact}
          onChange={handleChange}
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-300 focus:border-transparent mb-4"
          placeholder="Alternate Contact Number"
        />
        {errors.alternateContact && <p className="text-red-500 text-sm">{errors.alternateContact}</p>}

        <label className="text-md font-medium text-gray-800">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-300 focus:border-transparent mb-4"
          placeholder="Your Email Address"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <label className="text-md font-medium text-gray-800">
          Govt ID Number:
        </label>
        <input
          type="text"
          name="govtId"
          value={formData.govtId}
          onChange={handleChange}
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-300 focus:border-transparent mb-4"
          placeholder="Your Govt Id Number"
        />
        {errors.govtId && <p className="text-red-500 text-sm">{errors.govtId}</p>}

        <label className="text-md font-medium text-gray-800">
          Upload Address Proof (AADHAR / PAN / PASSPORT):
        </label>
        <input
          type="file"
          accept="image/*"
            onChange={handleImageChange}
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-300 focus:border-transparent mb-4"
        />

{formData.imagePreview && (
    <div className="mt-4">
        <img
            src={formData.imagePreview}
            alt="Preview"
            className="w-full h-auto rounded-md"
        />
    </div>
)}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105"
            onClick={handleSubmit}
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetAdoptionForm;
