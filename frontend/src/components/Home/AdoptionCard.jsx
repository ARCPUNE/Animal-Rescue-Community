import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const AdoptionCard = ({ image, title }) => {
  const navigate = useNavigate();
  
  const ListCall = () => {
    let path;
    if (title === 'Adopt Dogs') {
      path = '/adoptDogs';
    } else if (title === 'Adopt Cats') {
      path = '/adoptCats';
    } else {
      path = '/others';
    }

    navigate(path);
  };

  return (
    <div 
      className="max-w-xs rounded overflow-hidden m-8 sm:m-12 lg:m-16 cursor-pointer hover:scale-105 transition ease-in-out duration-300 flex flex-col items-center" 
      onClick={ListCall}
    >
      <img 
        className="rounded-full shadow-md border-2 border-orange-800 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64" 
        src={image} 
        alt={title} 
      />
      
      <div className="mt-4 text-center">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm sm:text-base font-semibold text-white hover:bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
        >
          {title}
        </button>
      </div>
    </div>
  );
};

AdoptionCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default AdoptionCard;
