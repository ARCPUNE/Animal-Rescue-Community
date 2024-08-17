import AdoptionCard from './AdoptionCard';
import { ArrowRight } from 'lucide-react';
import dogImage from '../../../public/HomeImages/AdoptDog.jpg'; // Add appropriate paths to your images
import catImage from '../../../public/HomeImages/AdoptCats.jpg';
import otherImage from '../../../public/HomeImages/AdoptOthers.jpg';
import { Link } from 'react-router-dom';

function Listing() {
  return (
    <div className="bg-yellow-50 p-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center lg:flex-nowrap gap-4">
          <div className="w-full lg:w-1/3">
            <AdoptionCard image={dogImage} title="Adopt Dogs" />
          </div>
          <div className="w-full lg:w-1/3">
            <AdoptionCard image={catImage} title="Adopt Cats" />
          </div>
          <div className="w-full lg:w-1/3">
            <AdoptionCard image={otherImage} title="Adopt Others" />
          </div>
        </div>
        <div className="w-full flex justify-center mt-4">
          {/* <Link to='/inProgress'>
            <button
              type="button"
              className="inline-flex rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:scale-110 hover:bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 items-center hover:text-white transition ease-in-out duration-300"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default Listing;
