import { useParams } from "react-router-dom";
import { IoIosMusicalNotes } from "react-icons/io";
import Navbar from "./Navbar";

import {
  albumsData,
  assets,
  songsData,
} from "../assets/frontend-assets/assets";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const DisplayAlbum = () => {
  const { id } = useParams();
  const albumData = albumsData[id];

  const { track, playStatus, playSongWithId } = useContext(PlayerContext);

  return (
    <>
      <Navbar />

      <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end">
        <img
          src={albumData.image}
          alt={albumData.name}
          className="w-48 rounded"
        />

        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {albumData.name}
          </h2>
          <h4>{albumData.desc}</h4>
          <div className="mt-1">
            <img
              src={assets.spotify_logo}
              alt="spotify_logo"
              className="inline-block w-5"
            />
            <b className="ml-1">Spotify</b> • 1,121,111 likes • <b>50 songs,</b>{" "}
            about 2 hr 30 minutes
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img src={assets.clock_icon} alt="clock_icon" className="m-auto w-4" />
      </div>

      <hr />

      {songsData.map((item, index) => (
        <div
          onClick={() => playSongWithId(item.id)}
          key={index}
          className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
        >
          <div className="text-white flex items-center">
            {playStatus && track.id === item.id ? (
              <span className="pr-[13.2px] text-emerald-500">
                <IoIosMusicalNotes />
              </span>
            ) : (
              <b className="mr-5 text-[#a7a7a7]">{index + 1}</b>
            )}
            <img
              src={item.image}
              alt={item.name}
              className="inline w-10 mr-5 rounded"
            />
            {item.name}
          </div>

          <p className="text-[15px]">{albumData.name}</p>
          <p className="text-[15px] hidden sm:block">5 days ago</p>
          <p className="text-[15px] text-center">{item.duration}</p>
        </div>
      ))}
    </>
  );
};
export default DisplayAlbum;
