import { useContext } from "react";
import { assets } from "../assets/frontend-assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
  const {
    track,
    time,
    seekBg,
    seekBar,
    playStatus,
    playSong,
    pauseSong,
    playPrevSong,
    playNextSong,
    changeSongDuration,
    volume,
    increaseDecreaseVolume,
  } = useContext(PlayerContext);

  return (
    <div className="h-[10%] bg-black flex items-center justify-between text-white px-4">
      <div className="hidden lg:flex items-center gap-4">
        <img src={track.image} alt="song pic" className="w-12 rounded" />
        <div>
          <p>{track.name}</p>
          <p>{track.desc.slice(0, 12)}...</p>
        </div>
      </div>

      {/* play next prev btns and duration */}
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img
            src={assets.shuffle_icon}
            alt="shuffle_icon"
            className="w-4 cursor-pointer"
          />
          <img
            onClick={playPrevSong}
            src={assets.prev_icon}
            alt="prev_icon"
            className="w-4 cursor-pointer"
          />
          {playStatus ? (
            <img
              onClick={pauseSong}
              src={assets.pause_icon}
              alt="pause_icon"
              className="w-4 cursor-pointer"
            />
          ) : (
            <img
              onClick={playSong}
              src={assets.play_icon}
              alt="play_icon"
              className="w-4 cursor-pointer"
            />
          )}
          <img
            onClick={playNextSong}
            src={assets.next_icon}
            alt="next_icon"
            className="w-4 cursor-pointer"
          />
          <img
            src={assets.loop_icon}
            alt="loop_icon"
            className="w-4 cursor-pointer"
          />
        </div>

        {/* time duration */}
        <div className="flex items-center gap-5">
          <p>
            {time.currentTime.minute}:{time.currentTime.second}
          </p>
          <div
            ref={seekBg}
            onClick={changeSongDuration}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-emerald-500 rounded-full"
            />
          </div>
          <p>
            {time.totalTime.minute}:{time.totalTime.second}
          </p>
        </div>
      </div>

      {/* btns */}
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img src={assets.plays_icon} alt="plays_icon" className="w-4" />
        <img src={assets.mic_icon} alt="mic_icon" className="w-4" />
        <img src={assets.queue_icon} alt="queue_icon" className="w-4" />
        <img src={assets.speaker_icon} alt="speaker_icon" className="w-4" />

        {/* volume btns */}
        <div className="flex items-center gap-2">
          <img src={assets.volume_icon} alt="volume_icon" className="w-4" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={increaseDecreaseVolume}
            className="w-12 cursor-pointer"
          />
        </div>

        <img
          src={assets.mini_player_icon}
          alt="mini_player_icon"
          className="w-4"
        />
        <img src={assets.zoom_icon} alt="zoom_icon" className="w-4" />
      </div>
    </div>
  );
};
export default Player;
