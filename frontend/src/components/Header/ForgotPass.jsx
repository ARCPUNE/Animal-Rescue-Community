import { useState } from "react";
import axiosInstance from "../../AxiosInstance";
import ChangePassword from "./ChangePass"; // Import your ChangePassword component

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [messages, setMessages] = useState({
    emailSent: "",
    otpVerified: "",
    error: "",
  });
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      validationErrors.email = "Invalid email address";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setLoading(true); // Start loading
      try {
        const response = await axiosInstance.get(
          `/forgot/verify-email/${email}`
        );
        setMessages({ ...messages, emailSent: response.data.message });
        setIsOtpSent(true);
      } catch (error) {
        setMessages({
          ...messages,
          error: "Failed to send verification email. Please try again later.",
        });
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      setErrors({ otp: "OTP is required" });
    } else {
      setErrors({});
      setLoading(true); // Start loading
      try {
        const response = await axiosInstance.post(
          `/forgot/verify-otp/${email}/${otp}`
        );
        setMessages({ ...messages, otpVerified: response.data.message });
        setIsOtpVerified(true); // Set OTP as verified
      } catch (error) {
        setMessages({
          ...messages,
          error: "Failed to verify OTP. Please check the code and try again.",
        });
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  if (isOtpVerified) {
    // Render ChangePassword component if OTP is verified
    return <ChangePassword email={email} />;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
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
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          disabled={loading} // Disable button when loading
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
        {messages.emailSent && (
          <p className="text-green-500 text-sm mt-4">{messages.emailSent}</p>
        )}
        {messages.error && (
          <p className="text-red-500 text-sm mt-4">{messages.error}</p>
        )}
      </form>

      {isOtpSent && (
        <form onSubmit={handleOtpSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="otp" className="block text-gray-700 font-bold mb-2">
              Enter OTP
            </label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-gray-500 p-2 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter the OTP sent to your email"
            />
            {errors.otp && <p className="text-red-500 text-sm">{errors.otp}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
          {messages.otpVerified && (
            <p className="text-green-500 text-sm mt-4">
              {messages.otpVerified}
            </p>
          )}
          {messages.error && (
            <p className="text-red-500 text-sm mt-4">{messages.error}</p>
          )}
        </form>
      )}

      {loading && (
        <div className="flex justify-center mt-4">
          {/* Replace the src with the path to your Tom and Jerry GIF */}
          <img
            src="/public/Running dog.gif"
            alt="Loading..."
            className="w-15"
          />
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
