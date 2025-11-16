// import React from 'react'
// import { Link } from 'react-router-dom'

// const PinCard = ({pin}) => {
//   return (
//     <div>
//       <div className='p-4 w-full sm:1/2 md:1/3 lg:1/4'>
//         <div className='bg-white overflow-hidden shadow rounded-lg relative group cursor-pointer'>
//             <img src={pin.image.url} alt="" className='w-full h-full' />
//             <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity
//               duration-300 flex items-center justify-center'>
//                 <div className='flex flex-col justify-center items-center gap-2'>
//                     <Link to={`/pin/${pin._id}`}
//                        className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
//                       View Pin
//                     </Link>
//                 </div>
//               </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PinCard


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShare2, FiDownload } from 'react-icons/fi';

const PinCard = ({ pin }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="mb-4 break-inside-avoid"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-200">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          )}
          
          <img 
            src={pin.image.url} 
            alt={pin.title || "Pin"} 
            className={`w-full h-auto object-cover transition-all duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />

          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black transition-opacity duration-300 ${
            isHovered ? 'opacity-60' : 'opacity-0'
          }`} />

          {/* Top Action Buttons */}
          <div className={`absolute top-3 right-3 flex gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}>
            <button 
              className="bg-white/90 backdrop-blur-sm p-2.5 rounded-full hover:bg-white shadow-lg transform hover:scale-110 transition-all"
              aria-label="Save pin"
            >
              <FiHeart className="w-5 h-5 text-gray-700 hover:text-red-500 transition-colors" />
            </button>
          </div>

          {/* Center View Button */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <Link 
              to={`/pin/${pin._id}`}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <span>View Pin</span>
              <svg 
                className="w-4 h-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </Link>
          </div>

          {/* Bottom Action Bar */}
          <div className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button 
                  className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white shadow-lg transform hover:scale-110 transition-all"
                  aria-label="Share pin"
                >
                  <FiShare2 className="w-4 h-4 text-gray-700" />
                </button>
                <button 
                  className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white shadow-lg transform hover:scale-110 transition-all"
                  aria-label="Download pin"
                >
                  <FiDownload className="w-4 h-4 text-gray-700" />
                </button>
              </div>
              
              {pin.title && (
                <h3 className="text-white font-semibold text-sm bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                  {pin.title.length > 20 ? pin.title.substring(0, 20) + '...' : pin.title}
                </h3>
              )}
            </div>
          </div>
        </div>

        {/* Optional: Pin Info Below Image */}
        {pin.description && (
          <div className="p-3 bg-white">
            <p className="text-sm text-gray-600 line-clamp-2">
              {pin.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PinCard;