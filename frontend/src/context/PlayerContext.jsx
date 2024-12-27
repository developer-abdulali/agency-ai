import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/frontend-assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [volume, setVolume] = useState(75);
  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const playSong = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pauseSong = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playSongWithId = async (id) => {
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlayStatus(true);
  };

  const playPrevSong = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const playNextSong = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const increaseDecreaseVolume = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume / 100;
  };

  const changeSongDuration = async (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  useEffect(() => {
    const updateSeekBar = () => {
      if (audioRef.current) {
        const progress = Math.floor(
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        );

        if (seekBar.current) {
          seekBar.current.style.width = `${progress}%`; // Add '%' for correct CSS
        }

        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        });
      }
    };

    if (audioRef.current) {
      audioRef.current.ontimeupdate = updateSeekBar;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.ontimeupdate = null; // Cleanup on component unmount
      }
    };
  }, [audioRef]);

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    playSong,
    pauseSong,
    playSongWithId,
    playPrevSong,
    playNextSong,
    changeSongDuration,
    increaseDecreaseVolume,
    volume,
    setVolume,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
