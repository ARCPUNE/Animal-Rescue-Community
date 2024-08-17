import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#8A9ACD] text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-4xl font-bold mb-2 font-sans">
              Join our family of pet lovers.
            </h2>
            <p className="text-gray-200 w-full md:w-4/5 mx-auto md:mx-0">
              Stay connected with the latest updates, adoption stories, and tips
              for pet care by signing up for our newsletters. Join our community
              and never miss a paw-some moment!
            </p>
          </div>
          <div className="flex justify-center items-center">
            <input
              type="text"
              className="w-72 md:w-96 border border-gray-500 p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#8A9ACD]"
              placeholder="Enter your email"
            />
            <button className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 transition ease-in-out duration-300">
              Subscribe
            </button>
          </div>
        </div>
        <hr className="border-[#8A9ACD] my-8" />
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link
              to="/"
              className="flex items-center justify-center md:justify-start"
            >
              <img
                src="./HeaderImages/arc_logo.png"
                alt="Logo"
                className="w-24 h-20"
              />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase">
                Resources
              </h2>
              <ul className="text-gray-200 font-medium">
                <li className="mb-4">
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:underline">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase">
                Follow us
              </h2>
              <ul className="text-gray-200 font-medium">
                <li className="mb-4">
                  <a
                    href="https://www.instagram.com/arc_pune/?hl=en"
                    className="hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/ARC_Pune"
                    className="hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase">
                Legal
              </h2>
              <ul className="text-gray-200 font-medium">
                <li className="mb-4">
                  <Link to="#" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="border-[#8A9ACD] my-8" />
        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between text-center sm:text-left">
          <span className="text-sm text-gray-200">
            © {new Date().getFullYear()}
            <a
              href="https://www.instagram.com/arc_pune/?hl=en"
              className="hover:underline ml-1"
            >
              Animal Rescue Community
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:mt-0 space-x-5 justify-center sm:justify-end">
  <a
    href="https://www.facebook.com/people/Animal-Rescue-Community-ARC/100066489018797/"
    target="_blank"
    className="hover:underline group"
  >
    <svg
      className="w-4 h-4 text-white group-hover:text-black"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 8 19"
    >
      <path
        fillRule="evenodd"
        d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
        clipRule="evenodd"
      />
    </svg>
  </a>
  <Link
    to="https://x.com/ARC_Pune"
    target="_blank"
    className="hover:underline group"
  >
    <svg
      className="w-4 h-4 text-white group-hover:text-black"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 17"
    >
      <path
        fillRule="evenodd"
        d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
        clipRule="evenodd"
      />
    </svg>
  </Link>
  <Link
    to="https://www.instagram.com/arc_pune/?hl=en"
    target="_blank"
    className="hover:underline group"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 text-white group-hover:text-black"
      aria-hidden="true"
      viewBox="0 0 448 512"
    >
      <path
        d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
        fill="currentColor"
      />
    </svg>
  </Link>
</div>

        </div>
      </div>
    </footer>
  );
}
