import React from 'react';
import AdoptionCard from './AdoptionCard';
import { ArrowRight } from 'lucide-react'
import dogImage from '../../../public/HomeImages/First.png'; // Add appropriate paths to your images
import catImage from '../../../public/HomeImages/second.jpg';
import otherImage from '../../../public/HomeImages/First.png';
import { Link } from 'react-router-dom';


function Listing() {
  return (
    <div>
      <div className="container mx-auto p-4 bg-yellow-50 ">
        <div className="flex justify-center">
          <AdoptionCard image={dogImage} title="Adopt Dogs"  />
          <AdoptionCard image={catImage} title="Adopt Cats"  />
          <AdoptionCard image={otherImage} title="Adopt Others" />
        </div>
        <div className="w-full flex justify-center">
          <Link to='/inProgress'>
  <button
    type="button"
    className="inline-flex rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:scale-110 hover:bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 items-center hover:text-white transition ease-in-out duration-300"
  >
    View All
    <ArrowRight className="ml-2 h-4 w-4" />
  </button>
  </Link>
</div>
      </div>
    </div>
  );
}

export default Listing;
