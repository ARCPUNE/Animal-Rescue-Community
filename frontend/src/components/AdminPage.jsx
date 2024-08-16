import React from 'react';

const AdminViewPage = () => {
  const postRequests = [
    {
      id: 1,
      name: 'Mini',
      species: 'Dog',
      gender: 'Female',
      imgSrc: '', // Replace with actual image URL
    },
    {
      id: 2,
      name: 'Minie',
      species: 'Cat',
      gender: 'Female',
      imgSrc: 'https://via.placeholder.com/50x50.png', // Replace with actual image URL
    },
    {
      id: 3,
      name: 'Mini',
      species: '',
      age: '3 months',
      gender: 'Female',
      imgSrc: 'https://via.placeholder.com/50x50.png', // Replace with actual image URL
    },
    {
      id: 4,
      name: 'Mini',
      species: '',
      age: '3 months',
      gender: 'Female',
      imgSrc: 'https://via.placeholder.com/50x50.png', // Replace with actual image URL
    },
    {
      id: 5,
      name: 'Mini',
      species: '',
      age: '3 months',
      gender: 'Female',
      imgSrc: 'https://via.placeholder.com/50x50.png', // Replace with actual image URL
    },
    {
      id: 6,
      name: 'Mini',
      species: '',
      age: '3 months',
      gender: 'Female',
      imgSrc: 'https://via.placeholder.com/50x50.png', // Replace with actual image URL
    },

    // Add more post requests as needed
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Post Requests</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          {postRequests.map((post) => (
            <div key={post.id} className="flex items-center justify-between p-4 mb-4 bg-gray-100 rounded-lg">
              <div className="flex items-center space-x-4">
                <img src={post.imgSrc} alt={post.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="text-lg font-medium">
                    Name: {post.name} {post.species ? `Species: ${post.species}` : `Age: ${post.age}`} Gender: {post.gender}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                  Approve
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminViewPage;
