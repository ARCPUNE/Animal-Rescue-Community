import React, { useState } from 'react';
import axios from 'axios';

const Post = () => {
    const [formData, setFormData] = useState({
        name: '',
        species: '',
        breed: '',
        age: '',
        gender: '',
        Vaccinated: false,
        Dewormed: false,
        Location: '',
        image: null,
        imagePreview: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple validation
        if (!formData.name || !formData.species || !formData.breed || !formData.age || !formData.gender) {
            alert('Please fill out all required fields.');
            return;
        }

        console.log('Form Data:', formData);

        // Create a FormData object to handle file uploads and other data
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('name', formData.name);
        formDataToSubmit.append('species', formData.species);
        formDataToSubmit.append('breed', formData.breed);
        formDataToSubmit.append('age', formData.age);
        formDataToSubmit.append('gender', formData.gender);
        formDataToSubmit.append('Vaccinated', formData.Vaccinated);
        formDataToSubmit.append('Dewormed', formData.Dewormed);
        formDataToSubmit.append('Location', formData.Location);

        // Append image if there is one
        if (formData.image) {
            formDataToSubmit.append('image', formData.image);
        }

        try {
            const response = await axios.post('/api/submit-form', formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Form submitted successfully:', response.data);
            alert('Form submitted successfully!');
            
            // Clear form data
            setFormData({
                name: '',
                species: '',
                breed: '',
                age: '',
                gender: '',
                Vaccinated: false,
                Dewormed: false,
                Location: '',
                image: null,
                imagePreview: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting the form. Please try again.');
        }
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <video 
                className="absolute top-0 left-0 w-full h-full object-cover z-0" 
                autoPlay 
                loop 
                muted
            >
                <source src='./HomeImages/background.mp4' type="video/mp4" />
            </video>
            <div className="relative z-10 flex justify-center items-center min-h-screen bg-opacity-50 bg-yellow-50 p-8">
                <div className="flex bg-orange-200 rounded-lg shadow-lg overflow-auto w-full max-w-4xl max-h-[80vh]">
                    <div className="w-1/3 bg-orange-200 flex items-center justify-center p-4">
                        <img src="./HomeImages/First.png" alt="Puppy" className="object-cover h-full" />
                    </div>
                    <div className="w-2/3 p-8">
                        <h2 className="text-3xl font-bold text-gray-700 mb-4">Yay, Ensure your pet gets the best care!</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-md"
                                    placeholder="Pet's name"
                                />
                            </div>

                            {/* Species */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Species</label>
                                <select
                                    name="species"
                                    value={formData.species}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Select Species</option>
                                    <option value="cat">Cat</option>
                                    <option value="dog">Dog</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {/* Breed */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Breed</label>
                                <input
                                    type="text"
                                    name="breed"
                                    value={formData.breed}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-md"
                                    placeholder="Pet's breed"
                                />
                            </div>

                            {/* Age */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Age</label>
                                <select
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Select Age</option>
                                    {Array.from({ length: 16 }, (_, i) => (
                                        <option key={i} value={i}>{i}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Gender */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>

                            {/* Vaccinated */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="Vaccinated"
                                    checked={formData.Vaccinated}
                                    onChange={handleChange}
                                    className="form-checkbox text-green-600"
                                />
                                <label className="ml-2 text-sm font-medium text-gray-700">Vaccinated</label>
                            </div>

                            {/* Dewormed */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="Dewormed"
                                    checked={formData.Dewormed}
                                    onChange={handleChange}
                                    className="form-checkbox text-green-600"
                                />
                                <label className="ml-2 text-sm font-medium text-gray-700">Dewormed</label>
                            </div>

                            {/* Image Upload */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Upload a photo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="mt-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
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
                            </div>

                            {/* Form Navigation */}
                            <div className="flex justify-center mt-6">
                                <button type="submit" className="bg-black text-white px-4 py-2 rounded-md hover:scale-105 mb-8">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
