import { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { State, City } from "country-state-city";
import axiosInstance from "../../AxiosInstance";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    let formErrors = {};

    if (!name) {
      formErrors.name = "Name is required.";
    } else if (name.length > 30) {
      formErrors.name = "Name should be less than 30 characters.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      formErrors.email = "Email is required.";
    } else if (!email.match(emailPattern) || !email.endsWith(".com")) {
      formErrors.email = "Please enter a valid email address.";
    }

    if (!mobile) {
      formErrors.mobile = "Mobile number is required.";
    } else if (mobile.length !== 10) {
      formErrors.mobile = "Mobile number should be exactly 10 digits.";
    }

    if (!password) {
      formErrors.password = "Password is required.";
    } else if (password !== confirmPassword) {
      formErrors.password = "Passwords do not match.";
    }

    if (address.trim().length === 0) {
      formErrors.address = "Address is required.";
    }

    if (!selectedState) {
      formErrors.state = "State is required.";
    }

    if (!selectedCity) {
      formErrors.city = "City is required.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await axiosInstance.post(
          "/auth/sign-up",
          {
            name,
            email,
            phoneNo: mobile,
            password,
            address: `${address}, ${selectedCity?.label}, ${selectedState?.label}`
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setSuccessMessage("Registration successful! Please log in.");
          setName("");
          setEmail("");
          setMobile("");
          setPassword("");
          setConfirmPassword("");
          setAddress("");
          setSelectedState(null);
          setSelectedCity(null);
          
          navigate("/login");
        } else {
          const errorData = response.data;
          setErrors({
            apiError:
              errorData.message || "Registration failed. Please try again.",
          });
        }
      } catch (error) {
        setErrors({ apiError: "An error occurred. Please try again." });
      }
    }
  };

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

  return (
<div className="relative w-full h-screen items-center justify-center min-h-screen bg-gray-400 font-sans overflow-hidden">
  <video
    className="absolute top-0 left-0 w-full h-full object-cover z-0"
    autoPlay
    loop
    muted
  >
    <source src="./HomeImages/background.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  <div className="relative z-10 flex justify-center items-center min-h-screen bg-opacity-50 bg-gray-400 p-8">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md bg-opacity-50">
      <h1 className="text-2xl font-bold mb-4 mt-0">Create New Account</h1>


      <div className="flex justify-between mb-6">
        <button className="flex items-center justify-center px-4 py-2 bg-blue-400 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 mr-2">
          <img
            src="../../../public/LoginImages/google-brands-solid.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Sign in with Google
        </button>

        <button className="flex items-center justify-center px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ml-2">
          <img
            src="../../../public/LoginImages/github-brands-solid.svg"
            alt="GitHub"
            className="w-5 h-5 mr-2"
          />
          Sign in with GitHub
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-500 p-2 rounded-md focus:outline-none focus:border-blue-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-1"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-500 p-2 rounded-md focus:outline-none focus:border-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="mb-2">
              <label
                htmlFor="mobile"
                className="block text-gray-700 font-bold mb-1"
              >
                Mobile Number
              </label>
              <input
                type="number"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full border border-gray-500 p-2 rounded-md focus:outline-none focus:border-blue-500"
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm">{errors.mobile}</p>
              )}
            </div>

            <div className="mb-2">
              <label
                htmlFor="address"
                className="block text-gray-700 font-bold mb-1"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-gray-500 p-2 rounded-md focus:outline-none focus:border-blue-500"
              />
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

        <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-500 p-2 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-2">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-bold mb-1"
              >
                Re-enter Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-500 p-2 rounded-md focus:outline-none focus:border-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {errors.apiError && (
              <p className="text-red-500 text-sm">{errors.apiError}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-sm">{successMessage}</p>
            )}

            <div className="flex justify-center mb-2">
              <button
                type="submit"
                className="bg-black hover:bg-black/70 w-36 text-white font-bold py-2 px-4 rounded-lg mb-2 mt-4"
              >
                Register
              </button>
            </div>
      </form>

      <div className="flex justify-center mb-2">
        <div className="align-bottom">Already Registered?</div>
        <Link
          to="/login"
          className="ml-2 text-black hover:scale-110 focus:ring-4 focus:ring-gray-300 font-medium underline rounded-lg text-sm px-2 lg:px-4 py-1 lg:py-2 mr-2 focus:outline-none"
        >
          Log in
        </Link>
      </div>
    </div>
  </div>
</div>


  );
}

export default RegistrationForm;
