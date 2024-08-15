import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const AdoptionCard = ({ image, title }) => {

  const [link, setLink] = useState("/")
  const navigate = useNavigate();
  
  const ListCall = () => {
    if(title == 'Adopt Dogs')
    {
     setLink('/adoptDogs')
    }
    else if(title == 'Adopt Cats')
    {
      setLink('/adoptCats')
    }
    else{
      setLink('/others')
    }

    navigate(link)

  }
   
  return (
    <div className=" max-w-xs rounded overflow-hidden m-16 cursor-pointer hover:scale-105 transition ease-in-out duration-300 flex flex-col items-center">
    <img className="rounded-full shadow-md border-2 border-orange-800" src={image} alt={title} />
    
    <div className="mt-4">
      <button
        type="button"
        onClick={ListCall}
        className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
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
