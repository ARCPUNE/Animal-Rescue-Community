import React from 'react';
import AdoptionCard from './AdoptionCard';
import { ArrowRight } from 'lucide-react'
import dogImage from '../../../public/HomeImages/First.png'; // Add appropriate paths to your images
import catImage from '../../../public/HomeImages/second.jpg';
import otherImage from '../../../public/HomeImages/First.png';


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
  <button
    type="button"
    className="inline-flex rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-blue-300 items-center hover:text-black"
  >
    View All
    <ArrowRight className="ml-2 h-4 w-4" />
  </button>
</div>
      </div>
    </div>
  );
}

export default Listing;
