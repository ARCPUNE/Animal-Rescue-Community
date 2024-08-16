import  { useState, useEffect } from 'react';
import axios from 'axios';

const DonatePage = () => {
  const [userInput, setUserInput] = useState({
    enteredname: '',
    enteredAmount: '',
    enteredphone: '',
  });

  const [donors, setDonors] = useState([]);
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch initial list of donors from the database
    const fetchDonors = async () => {
      try {
        const response = await axios.get('https://api.example.com/donors');
        setDonors(response.data);
      } catch (error) {
        console.error('Error fetching donors:', error);
        setApiError('Failed to fetch donors. Please try again.');
      }
    };

    fetchDonors();
  }, []);

  const nameChangeHandler = (event) => {
    setUserInput((prevState) => ({
      ...prevState,
      enteredname: event.target.value,
    }));
  };

  const phoneChangeHandler = (event) => {
    setUserInput((prevState) => ({
      ...prevState,
      enteredphone: event.target.value,
    }));
  };

  const amountChangeHandler = (event) => {
    setUserInput((prevState) => ({
      ...prevState,
      enteredAmount: event.target.value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const DonateData = {
      name: userInput.enteredname,
      amount: userInput.enteredAmount,
      phone: userInput.enteredphone,
    };

    setIsSubmitting(true);

    try {
      // Post new donation to the database
      const response = await axios.post('https://api.example.com/donors', DonateData);

      if (response.status === 201) {
        // Fetch updated list of donors after successful addition
        const updatedResponse = await axios.get('https://api.example.com/donors');
        setDonors(updatedResponse.data);

        // Clear form
        setUserInput({
          enteredname: '',
          enteredAmount: '',
          enteredphone: '',
        });

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
    <div>
      <div className="text-black font-bold text-4xl text-center mb-4 mt-8">
        Support Our Cause{" "}
        <img src="./HomeImages/Heart.svg" className="size-14 inline-flex" alt="Heart Icon" />
      </div>
      <div className="text-gray-600 text-center mt-2 text-xl mr-12">
        Your donation can make a real difference
      </div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
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
                value={userInput.enteredname}
                onChange={nameChangeHandler}
                placeholder="Please enter your name"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                required
                type="text"
                value={userInput.enteredphone}
                onChange={phoneChangeHandler}
                placeholder="Please enter your mobile number"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                required
                type="number"
                value={userInput.enteredAmount}
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
                    <p className="font-bold mb-2">{donor.name}</p>
                  </div>
                  <div className="font-bold text-gray-800">{donor.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;