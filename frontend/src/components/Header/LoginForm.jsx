import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../AxiosInstance";
import { setTokens } from "../../Features/authSlice";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signInWithGoogle = () => {
    setLoading(true); // Start loading
    setErrors({}); // Clear any existing errors
    window.location.href = `${backendUrl}/oauth2/authorization/google`;
  };

  const signInWithGithub = () => {
    setLoading(true); // Start loading
    setErrors({}); // Clear any existing errors
    window.location.href = `${backendUrl}/oauth2/authorization/github`;
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = {};

    // Validate email
    if (!validateEmail()) {
      formErrors.email = "Please enter a valid email address.";
    }

    // Validate password
    const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!password) {
      formErrors.password = "Password is required.";
    }else if(!password.match(passPattern)){
      formErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (validateEmail()) {
      setLoading(true); // Set loading to true before the request
      try {
        const response = await axiosInstance.post(`/auth/login`, {
          email,
          password,
        });

        if (response.status === 200) {
          const result = response.data;
          setEmail("");
          setPassword("");
          setApiError("");

          // Dispatch tokens to store
          dispatch(
            setTokens({
              ...result,
            })
          );

          localStorage.setItem(
            "user", 
            JSON.stringify({email:email,
              password:password,
              loggedIn:true,
              role:'Volunteer',
            
            }));

          navigate(
            `/home?token=${result.token}&refreshToken=${result.refreshToken}`
          );
        } else {
          const errorData = response.data;
          setApiError(errorData.message || "Login failed. Please try again.");
        }
      } catch (error) {
        setApiError("An error occurred. Please try again.");
      } finally {
        setLoading(false); // Set loading to false after the request
      }
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-400 font-sans overflow-hidden">
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
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          {loading ? (
            <>
              <h1 className="text-2xl font-bold mb-8 text-center">
                Logging in your Account
              </h1>
              <div className="flex justify-center items-center mb-4">
                <img
                  src="../../../public/Running dog.gif"
                  alt="Loading..."
                  className="w-15"
                />
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-8">Login to your Account</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Email/Mobile No.
                  </label>
                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-500 p-2 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-500 p-2 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

                {apiError && (
                  <p className="text-red-500 text-sm mb-4">{apiError}</p>
                )}

                <div className="flex justify-center mb-4">
                  <button
                    type="submit"
                    className="bg-black hover:bg-black/70 w-36 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Log In
                  </button>
                </div>

                <div className="text-center mb-4">
                  <a
                    href="/login/forgot-pass"
                    className="text-black hover:underline"
                  >
                    Forgot Password?
                  </a>
                  <br />
                  <span className="mx-2">or</span>
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <button
                    className="flex items-center justify-center w-full max-w-xs px-4 py-2 bg-blue-400 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                    onClick={signInWithGoogle}
                    type="button" // Add type="button" to prevent form submission
                  >
                    <img
                      src="./LoginImages/google-brands-solid.svg"
                      alt="Google"
                      className="w-6 h-6 mr-3"
                    />
                    <span>Sign in with Google</span>
                  </button>
                  <button
                    className="flex items-center justify-center w-full max-w-xs px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    onClick={signInWithGithub}
                    type="button" // Add type="button" to prevent form submission
                  >
                    <img
                      src="./LoginImages/github-brands-solid.svg"
                      alt="Github"
                      className="w-6 h-6 mr-3"
                    />
                    <span>Sign in with Github</span>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
