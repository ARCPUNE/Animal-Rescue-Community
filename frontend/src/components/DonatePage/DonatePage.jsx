import React, { useState } from "react";

const DonatePage = () => {
  const [userInput, setUserInput] = useState({
    enteredname: '',
    enteredAmount: '',
    enteredphone: '',
  });

  const [donors, setDonors] = useState([
    { name: "Sachin Mishra", amount: "₹3000", phone: 123456789 },
    { name: "Saurabh Maskade", amount: "₹6000", phone: 123456789 },
    { name: "Sahil Kamble", amount: "Mein Nahi Dunga!", phone: 123456789 },
    { name: "Akash", amount: "₹5000", phone: 123456789 }
  ]);

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

  const submitHandler = (event) => {
    event.preventDefault();

    let DonateData = {
      name: userInput.enteredname,
      amount: userInput.enteredAmount,
      phone: userInput.enteredphone,
    };

    setDonors((prevDonors) => [...prevDonors, DonateData]);
    console.log(DonateData);

    setUserInput({
        enteredname: '',
        enteredAmount: '',
        enteredphone: '',
    })
  };

  return (
    <div>
      <div className="text-black font-bold text-4xl text-center mb-4 mt-8">
        Support Our Cause{" "}
        <img src="./HomeImages/Heart.svg" className="size-14 inline-flex" alt="Heart Icon"></img>{" "}
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
                type="number"
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
              >
                Donate Now
              </button>
            </form>
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
                    {/* <p className="text-gray-600">Donated on {donor.date}</p> */}
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
