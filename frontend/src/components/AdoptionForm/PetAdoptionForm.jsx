import React, { useState } from 'react';
import './PetAdoptionForm.css';
import logo from './ArcLogo.png'; 

const PetAdoptionForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    animalId: '',
    species: '',
    gender: '',
    age: '',
    description: '',
    adopterName: '',
    adopterContact: '',
    alternateContact: '',
    email: '',
    idNumber: '',
    addressProof: '',
    terms: Array(11).fill(false),
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('term')) {
      const index = parseInt(name.split('-')[1], 10);
      const updatedTerms = [...formData.terms];
      updatedTerms[index] = checked;
      setFormData({
        ...formData,
        terms: updatedTerms,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.terms.every(term => term)) {
    
      console.log('Form submitted:', formData);
    } else {
      alert('Please agree to all terms and conditions before submitting.');
    }
  };

  const handleSelectAll = () => {
    setFormData({
      ...formData,
      terms: Array(11).fill(true),
    });
  };

  return (
    <div className="form-container">
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Pet Adoption Commitment Form</h1>
      </div>
      <form onSubmit={handleSubmit}>
     
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="animalId">Animal ID:</label>
          <input type="text" id="animalId" name="animalId" value={formData.animalId} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="species">Species:</label>
          <select id="species" name="species" value={formData.species} onChange={handleChange}>
            <option value="">Select Species</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
        </div>

       
        <div className="form-group">
          <label htmlFor="adopterName">Adopter's Full Name:</label>
          <input type="text" id="adopterName" name="adopterName" value={formData.adopterName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="adopterContact">Mobile:</label>
          <input type="text" id="adopterContact" name="adopterContact" value={formData.adopterContact} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="alternateContact">Alternate Contact:</label>
          <input type="text" id="alternateContact" name="alternateContact" value={formData.alternateContact} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="idNumber">AADHAR / PAN / PASSPORT Number:</label>
          <input type="text" id="idNumber" name="idNumber" value={formData.idNumber} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="addressProof">Address proof:</label>
          <select id="addressProof" name="addressProof" value={formData.addressProof} onChange={handleChange}>
            <option value="">Select Proof</option>
            <option value="aadhar">Aadhar</option>
            <option value="passport">Passport</option>
            <option value="utilityBill">Utility Bill</option>
          </select>
        </div>

     
        <div className="form-group">
          <h3>Terms and Conditions</h3>
          <div className="checkbox-group">
            {formData.terms.map((term, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  name={`term-${index}`}
                  checked={term}
                  onChange={handleChange}
                />
                {index + 1}. I have adopted this animal throughout the entire lifetime of the animal.
              </label>
            ))}
          </div>
          <button type="button" onClick={handleSelectAll}>Select All</button>
        </div>

        <button type="submit">Submit</button>
      </form>
      <p className="contact-info">
        FOR ANY QUERIES, CONTACT 7447789501 / 8275828944
      </p>
    </div>
  );
};

export default PetAdoptionForm;
