import { useState, useEffect } from 'react';
import axiosInstance from '../../AxiosInstance';
import { useSelector } from 'react-redux';

const DonatePage = () => {
  const [userInput, setUserInput] = useState(0);
  const [donors, setDonors] = useState([]);
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [donationAdded, setDonationAdded] = useState(false); // New state to trigger re-fetching donors
  const user = useSelector((state) => state.user);

  const fetchDonors = async () => {
    try {
      const response = await axiosInstance.get('/api/donations');
      const donors = response.data.sort((a, b) => b.date - a.date);
      setDonors(donors.slice(0, 5));
    } catch (error) {
      console.error('Error fetching donors:', error);
      setApiError('Failed to fetch donors. Please try again.');
    }
  };

  useEffect(() => {
    fetchDonors();
  }, [donationAdded]); // Re-fetch donors when donationAdded changes

  const amountChangeHandler = (event) => {
    setUserInput(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const formDataToSubmit = new FormData();
    const donationDTO = {
      userId: { ...user },
      amount: userInput,
    };

    formDataToSubmit.append("donationDTO", JSON.stringify(donationDTO));
    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post('/api/donations', formDataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setDonationAdded(prev => !prev); // Toggle donationAdded to trigger re-fetch
        alert('Donation submitted successfully!');
        setUserInput("");
        setApiError('');
      } else {
        setApiError('Failed to submit donation. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting donation:', error);
      setApiError('An error occurred while submitting your donation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='bg-gray-100'>
      <div>
        <div className="text-black font-bold text-4xl text-center mb-4 pt-8">
          Support Our Cause{" "}
          <img src="./HomeImages/Heart.svg" className="size-14 inline-flex" alt="Heart Icon" />
        </div>
        <div className="text-gray-600 text-center mt-2 text-xl mr-12">
          Your donation can make a real difference
        </div>
        <div className="py-8 bg-gray-100 flex flex-col items-center justify-center p-4">
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full flex">
            <div className="w-1/2 p-4 ml-8">
              <h2 className="text-xl font-bold mb-4">Scan to Donate</h2>
              <div className="mb-4">
                <img
                  src="./HomeImages/QR_Code.png"
                  alt="QR Code"
                  className="w-48 h-48"
                />
              </div>
              <form className="space-y-4" onSubmit={submitHandler}>
                <input
                  required
                  type="text"
                  value={user.name}
                  disabled
                  placeholder="Please enter your name"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  required
                  type="text"
                  value={user.phoneNo}
                  disabled
                  placeholder="Please enter your mobile number"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <input
                  required
                  type="number"
                  value={userInput}
                  onChange={amountChangeHandler}
                  placeholder="Amount (in rupees)"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-black text-white p-2 rounded"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Donate Now'}
                </button>
              </form>
              {apiError && <p className="text-red-500 text-center mt-4">{apiError}</p>}
            </div>
            <div className="w-1/2 p-4 ml-24">
              <h2 className="text-xl font-bold mb-4">Recent Donors</h2>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                {donors.map((donor, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b border-gray-200 py-2"
                  >
                    <div>
                      <p className="font-bold mb-2">{donor.userId.name}</p>
                    </div>
                    <div className="font-bold text-gray-800">{donor.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;
