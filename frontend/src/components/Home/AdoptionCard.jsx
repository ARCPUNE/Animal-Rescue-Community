import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
    <div className="max-w-xs rounded overflow-hidden m-20 bg-yellow-50 cursor-pointer hover:scale-105 transition ease-in-out duration-300">
      <img className="w-full " src={image} />
      
      <button
      type="button" onClick={ListCall} className="inline-flex items-center rounded-md bg-black mt-4 px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
    >{title}</button>
      
    </div>

  );
};

export default AdoptionCard;
