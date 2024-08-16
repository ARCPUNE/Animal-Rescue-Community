import { Link } from 'react-router-dom';

const WorkInProgress = () => {
  return (
    <div className="flex pt-36 justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="flex justify-center mb-4">
        <img src="https://www.animatedimages.org/data/media/1664/animated-work-in-progress-image-0027.gif" border="0" alt="animated-work-in-progress-image-0027"/>
        {/* <img src="https://www.animatedimages.org/data/media/1664/animated-work-in-progress-image-0030.gif" border="0" alt="animated-work-in-progress-image-0030"/>
        <img className='mt-10' src="https://www.animatedimages.org/data/media/1664/animated-work-in-progress-image-0022.gif" border="0" alt="animated-work-in-progress-image-0022"/> */}
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Work in Progress</h1>
        <p className="text-gray-600">We&apos;re working hard to get this page ready. Stay tuned!</p>
        <div className="mt-6">
            <Link to='/'>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-500 transition duration-300">
            Go Back
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkInProgress;
