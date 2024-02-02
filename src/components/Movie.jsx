// Movie.js
import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import axios from 'axios';
import TrailerModal from './TrailerModal';

const Movie = ({ items }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();
  const [trailer, setTrailer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const movieID = doc(db, "users", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: items.id,
          title: items.title,
          img: items.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save a movie");
    }
  };

  const handleMovie = async (id) => {
    try {
      const trailerResponse = await axios.get(
        `http://api.themoviedb.org/3/movie/${id}/videos?api_key=de6aa365c3a8b8a53dc8204c32c1d18b&language=en-US`
      );
      setTrailer(trailerResponse.data.results[0]);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={() => handleMovie(items.id)} className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
        <img
          className="w-full h-auto block"
          src={`https://image.tmdb.org/t/p/w500/${items?.backdrop_path}`}
          alt={items?.title}
        />
        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
          <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
            {items?.title}
          </p>
          <p onClick={saveShow}>
            {like ? (
              <FaHeart className="absolute top-4 left-4 text-gray-300" />
            ) : (
              <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
            )}
          </p>
        </div>
      </div>
      <TrailerModal visible={isModalOpen} trailer={trailer} onClose={closeModal}/>
      {/* {isModalOpen && <TrailerModal trailer={trailer} onClose={closeModal} />} */}
    </>
  );
};

export default Movie;
