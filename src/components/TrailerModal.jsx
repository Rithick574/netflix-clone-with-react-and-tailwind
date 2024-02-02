import React from 'react'
import YouTube from "react-youtube";

const TrailerModal = ({ visible, trailer, onClose }) => {
  if (!visible) {
    return null
  }
  const opts = {
    height: "480",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="z-50 p-4 rounded-lg shadow-md w-[80%] relative">
        <button
          className="absolute top-2 right-2 text-white hover:text-gray-300 focus:outline-none"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {trailer && <YouTube opts={opts} videoId={trailer.key} />}
      </div>
    </div>
  );
};

export default TrailerModal