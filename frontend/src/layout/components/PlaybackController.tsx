import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayStore } from "@/stores/usePlayStore";
import {
  Laptop2,
  ListMusic,
  Mic2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume1,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

const PlaybackController = () => {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious } =
    usePlayStore();
  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = document.querySelector("audio");

    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);

    const handleEnded = () => {
      usePlayStore.setState({ isPlaying: false });
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  return (
    <footer
      className="h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px4
  "
    >
      <div className="flex items-center justify-between h-full max-w-[1800px] mx-auto">
        {/* playing current song */}
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]">
          {currentSong && (
            <>
              <img
                src={currentSong.imageUrl}
                alt={currentSong.title}
                className="w-14 h-14 object-cover rounded-md"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate hover:underline cursor-pointer">
                  {currentSong.title}
                </div>
                <div className="text-sm text-zinc-400 truncate hover:underline cursor-pointer">
                  {currentSong.artist}
                </div>
              </div>
            </>
          )}
        </div>

        {/* player controls buttons */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">
          <div className="flex items-center gap-4 sm:gap-6">
            <Button
              size="icon"
              variant="ghost"
              className="hidden sm:inline-flex text-zinc-400 hover:text-white"
            >
              <Shuffle className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={playPrevious}
              disabled={!currentSong}
              className="text-zinc-400 hover:text-white"
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={togglePlay}
              disabled={!currentSong}
              className="bg-white hover:bg-white/80 text-black rounded-full h-8 w-8"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={playNext}
              disabled={!currentSong}
              className="text-zinc-400 hover:text-white"
            >
              <SkipForward className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="text-zinc-400 hover:text-white"
            >
              <Repeat className="h-4 w-4" />
            </Button>
          </div>
          <div className="hidden sm:flex items-center gap-2 w-full">
            <div className="text-xs text-zinc-400">
              {formatTime(currentTime)}
            </div>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              onValueChange={handleSeek}
              className="w-full hover:cursor-grab active:cursor-grabbing"
            />
            <div className="text-xs text-zinc-400">{formatTime(duration)}</div>
          </div>
        </div>
        {/* volume control buttons */}
        <div className="hidden sm:flex items-center justify-end gap-4 min-w-[180px] w-[30%]">
          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-400 hover:text-white"
          >
            <Mic2 className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-400 hover:text-white"
          >
            <ListMusic className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-400 hover:text-white"
          >
            <Laptop2 className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="text-zinc-400 hover:text-white"
            >
              <Volume1 className="h-4 w-4" />
            </Button>
            <Slider
              value={[volume]}
              max={100}
              step={1}
              onValueChange={(value) => {
                setVolume(value[0]);
                if (audioRef.current) {
                  audioRef.current.volume = value[0] / 100;
                }
              }}
              className="w-24 hover:cursor-grab active:cursor-grabbing"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
export default PlaybackController;
