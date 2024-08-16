import  { useState } from 'react';
import axiosInstance from '../../AxiosInstance';
import  './post.css';
import { State, City } from "country-state-city";
import Select from "react-select";

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
        imagePreview: '',
        details: ''
    });
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

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

        if (!formData.name || !formData.species || !formData.breed || !formData.age || !formData.gender || selectedState === null) {
            alert('Please fill out all required fields.');
            return;
        }

        const formDataToSubmit = new FormData();
        const animalDTO = {
            name: formData.name,
            age: formData.age,
            breed: formData.breed,
            category: formData.species,
            description: formData.details,
            gender: formData.gender,
            vaccinated: formData.Vaccinated,
            dewormed: formData.Dewormed,
            location: `${selectedCity?.label}, ${selectedState?.label}`,
            photo: '',
            status: 'AVAILABLE',
        };
        formDataToSubmit.append('animalDTO', JSON.stringify(animalDTO));

        if (formData.image) {
            formDataToSubmit.append('file', formData.image);
        }

        try {
            const response = await axiosInstance.post('/api/animals', formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Form submitted successfully:', response.data);
            alert('Form submitted successfully!');
            
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
                imagePreview: '',
                details: ''
            });
            setSelectedState(null);
          setSelectedCity(null);
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

                            {/* Species, Gender, Age (Horizontal Layout) */}
                            <div className="flex space-x-4">
                                {/* Species */}
                                <div className="flex flex-col w-1/3">
                                    <label className="text-sm font-medium text-gray-700">Species</label>
                                    <select
                                        name="species"
                                        value={formData.species}
                                        onChange={handleChange}
                                        className="mt-1 p-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="">Select Species</option>
                                        <option value="CAT">Cat</option>
                                        <option value="DOG">Dog</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>

                                {/* Gender */}
                                <div className="flex flex-col w-1/3">
                                    <label className="text-sm font-medium text-gray-700">Gender</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="mt-1 p-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                    </select>
                                </div>

                                {/* Age */}
<div className="flex flex-col w-1/3">
    <label className="text-sm font-medium text-gray-700">Age</label>
    <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        className="mt-1 p-2 border border-gray-300 rounded-md"
        min="0"
        placeholder="Enter Age"
    />
</div>

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

                            <div className="flex items-center space-x-3">
    {/* Vaccinated */}
    <div className="checkbox-wrapper-31">
        <input
            type="checkbox"
            name="Vaccinated"
            id='vaccinated-checkbox'
            checked={formData.Vaccinated}
            onChange={handleChange}
        />
        <svg viewBox="0 0 35.6 35.6">
            <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
            <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
            <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
        </svg>
    </div>
    <label htmlFor='vaccinated-checkbox' className="ml-0 text-lg font-medium text-gray-700 hover:cursor-pointer">Vaccinated</label>

    {/* Dewormed */}
    <div className="checkbox-wrapper-31">
        <input
            type="checkbox"
            name="Dewormed"
            id='dewormed-checkbox'
            checked={formData.Dewormed}
            onChange={handleChange}
        />
        <svg viewBox="0 0 35.6 35.6">
            <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
            <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
            <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
        </svg>
    </div>
    <label htmlFor='dewormed-checkbox' className="ml-0 text-lg font-medium text-gray-700 hover:cursor-pointer  ">Dewormed</label>
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
          </div>
        </div>


                            {/* Details */}
                            <div className="flex flex-col">
                                <label className="text-sm font-medium text-gray-700">Details</label>
                                <textarea
                                    name="details"
                                    value={formData.details}
                                    onChange={handleChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-md"
                                    placeholder="Provide additional details about the pet"
                                />
                            </div>

                            {/* Image Upload and Submit Button */}
<div className="flex items-center space-x-4">
    {/* Image Upload */}
    <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Upload a photo</label>
        <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />
    </div>

    {/* Submit Button */}
    <button 
        type="submit" 
        className="bg-black text-white px-4 py-2 rounded-md hover:scale-105"
    >
        Submit
    </button>
</div>

{/* Image Preview */}
{formData.imagePreview && (
    <div className="mt-4">
        <img
            src={formData.imagePreview}
            alt="Preview"
            className="w-full h-auto rounded-md"
        />
    </div>
)}


                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;