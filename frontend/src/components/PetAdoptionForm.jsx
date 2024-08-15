import React, { useState } from "react";
import jsPDF from "jspdf";

const PetAdoptionForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    animalName: '',
    species: '',
    gender: '',
    age: '',
    description: '',
    adopterName: '',
    address: '',
    mobile: '',
    alternateContact: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text("Pet Adoption Commitment Form", 20, 20);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30);
    doc.text(`Adopter's Name: ${formData.adopterName}`, 20, 40);
    doc.text(`Mobile: ${formData.mobile}`, 20, 50);
    doc.text(`Alternate Contact: ${formData.alternateContact}`, 20, 60);
    doc.text(`Email: ${formData.email}`, 20, 70);
    doc.text(`Address: ${formData.address}`, 20, 80);
    doc.text(`Animal's Name: ${formData.animalName}`, 20, 90);
    doc.text(`Species: ${formData.species}`, 20, 100);
    doc.text(`Gender: ${formData.gender}`, 20, 110);
    doc.text(`Age: ${formData.age}`, 20, 120);
    doc.text(`Description: ${formData.description}`, 20, 130);
    doc.save('PetAdoptionForm.pdf');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-300 to-purple-500 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-3xl w-full">
        <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-8">
          🐾 Pet Adoption Commitment Form 🐾
        </h1>

        {/* Date and Download */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <label className="text-lg font-semibold text-gray-800">Date:</label>
            <input
              type="date"
              className="ml-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-300 focus:border-transparent"
            />
          </div>
          <button 
            onClick={handleDownload} 
            className="bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800 transition-transform transform hover:scale-105">
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
                value={formData.animalName}
                onChange={handleChange}
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
                value={formData.species}
                onChange={handleChange}
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-300 focus:border-transparent">
                <option value="">Select Species</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="text-md font-medium text-gray-800">
                Gender:
              </label>
              <select 
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-300 focus:border-transparent">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="text-md font-medium text-gray-800">Age:</label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
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
              value={formData.description}
              onChange={handleChange}
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
              name="adopterName"
              value={formData.adopterName}
              onChange={handleChange}
              className="w-1/2 p-2 mx-2 border-b border-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="Your Name"
            />
            am willing to adopt
            <input
              type="text"
              name="animalName"
              value={formData.animalName}
              onChange={handleChange}
              className="w-1/2 p-2 mx-2 border-b border-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="Animal Name"
            />
            from his/her foster parent.
          </p>
        </div>

        {/* Adopter's Details */}
        <div className="mb-8">
          <label className="text-md font-medium text-gray-800">
            Adopter’s Full Name:
          </label>
          <input
            type="text"
            name="adopterName"
            value={formData.adopterName}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-300 focus:border-transparent mb-4"
            placeholder="Full Name"
          />
          <label className="text-md font-medium text-gray-800">Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-300 focus:border-transparent"
            rows="3"
            placeholder="Your Address"
          ></textarea>
        </div>

        <label className="text-md font-medium text-gray-800">Mobile:</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-300 focus:border-transparent mb-4"
          placeholder="Your Mobile Number"
        />

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

        <label className="text-md font-medium text-gray-800">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-300 focus:border-transparent mb-4"
          placeholder="Your Email Address"
        />

        <label className="text-md font-medium text-gray-800">
          Upload Address Proof (AADHAR / PAN / PASSPORT):
        </label>
        <input
          type="file"
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-300 focus:border-transparent mb-4"
        />

        {/* Submit Button */}
        <div className="flex justify-center">
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105">
            Submit Application
          </button>
        </div>
      </div>
    </div>x
  );
};

export default PetAdoptionForm;
