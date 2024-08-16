import  { useState, useEffect } from 'react';

const ImageSlider = () => {
  const images = [
    './HomeImages/First.png',
    './HomeImages/second.jpg',
    './HomeImages/Owner.jpg'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-[100%] h-[600px] overflow-hidden rounded-xl ">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}


{/* <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-2/3 md:w-1/2">
          <input
            type="text"
            placeholder="Search"
            className="w-full py-2 px-4 rounded-full shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M18.05 10.5a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div> */}


      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
