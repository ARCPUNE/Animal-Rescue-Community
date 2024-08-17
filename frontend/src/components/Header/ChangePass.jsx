import { useState } from 'react';
import axiosInstance from '../../AxiosInstance';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ChangePassword = ({ email }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // New state for message type
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    const passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!newPassword) {
      validationErrors.newPassword = "Password is required.";
    }else if(!newPassword.match(passPattern)){
      validationErrors.newPassword = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    } else if (newPassword !== confirmNewPassword) {
      validationErrors.newPassword = "Passwords do not match.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setLoading(true);
      try {
        const response = await axiosInstance.post(`/forgot/change-pass/${email}`, {
          password: newPassword,
          rePassword: confirmNewPassword,
        });
        setMessage(response.data.message);
        setMessageType('success'); 
        setNewPassword('');
        setConfirmNewPassword('');
        setErrors({});
        setLoading(false);
        navigate('/login');
      } catch (error) {
        setMessage('Failed to change password. Please try again later.');
        setMessageType('error'); 
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-gray-700 font-bold mb-2">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-gray-500 p-2 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Enter your new password"
          />
          {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmNewPassword" className="block text-gray-700 font-bold mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="w-full border border-gray-500 p-2 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Confirm your new password"
          />
          {errors.confirmNewPassword && <p className="text-red-500 text-sm">{errors.confirmNewPassword}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          disabled={loading}
        >
          {loading ? 'Changing...' : 'Change Password'}
        </button>
        {message && (
          <p className={`text-sm mt-4 ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </form>

      {loading && (
        <div className="flex justify-center mt-4">
          {/* Replace the src with the path to your Tom and Jerry GIF */}
          <img src="/public/Running dog.gif" alt="Loading..." className="w-15" />
        </div>
      )}
    </div>
  );
};

ChangePassword.propTypes = {
  email: PropTypes.string.isRequired, // Ensure email is a required string
};

export default ChangePassword;
