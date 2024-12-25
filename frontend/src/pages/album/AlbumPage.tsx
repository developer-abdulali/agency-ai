// import { Button } from "@/components/ui/button";
// import { usePlayStore } from "@/stores/usePlayStore";
// import { useMusicStore } from "@/stores/useMusicStore";
// import { ScrollArea } from "@radix-ui/react-scroll-area";
// import { Clock, Loader, Pause, Play } from "lucide-react";
// import { useEffect } from "react";
// import { useParams } from "react-router-dom";

// const AlbumPage = () => {
//   const { albumId } = useParams();
//   const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
//   const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayStore();

//   useEffect(() => {
//     if (albumId) fetchAlbumById(albumId);
//   }, [fetchAlbumById, albumId]);

//   if (isLoading) {
//     return (
//       <div className="h-screen w-full flex items-center justify-center">
//         <Loader className="size-8 text-emerald-500 animate-spin" />
//       </div>
//     );
//   }

//   const handlePlayAlbum = () => {
//     if (!currentAlbum) return;
//     const isCurrentAlbumPlaying = currentAlbum?.songs.some(
//       (song) => song._id === currentSong?._id
//     );
//     if (isCurrentAlbumPlaying) togglePlay();
//     // start playing the album from beginning
//     else {
//       playAlbum(currentAlbum?.songs, 0);
//     }
//   };

//   const handlePlaySong = (i: number) => {
//     if (!currentAlbum) return;

//     playAlbum(currentAlbum?.songs, i);
//   };

//   const formatDuration = (duration: number) => {
//     const minutes = Math.floor(duration / 60);
//     const seconds = duration % 60;
//     return `${minutes.toString().padStart(2, "0")}:${seconds
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   return (
//     <section className="h-full rounded-md overflow-hidden">
//       <ScrollArea className="h-full overflow-y-auto scrollbar-hide">
//         {/* main content */}
//         <div className="relative min-h-full">
//           {/* bg gradient */}
//           <div
//             area-hidden="true"
//             className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none"
//           />

//           {/* content */}
//           <div className="relative z-10">
//             <div className="flex p-6 gap-6 pb-8">
//               <img
//                 src={currentAlbum?.imageUrl}
//                 alt={currentAlbum?.title}
//                 className="w-[240px] h-[240px] shadow-xl rounded"
//               />
//               <div className="flex flex-col justify-end">
//                 <p className="textsm font-medium">Album</p>
//                 <h1 className="text-7xl font-bold my-4">
//                   {currentAlbum?.title}
//                 </h1>
//                 <div className="flex items-center gap-2 text-sm text-zinc-100">
//                   <span className="font-medium text-white">
//                     {currentAlbum?.artist}
//                   </span>
//                   <span>• {currentAlbum?.songs.length}</span>
//                   <span>• {currentAlbum?.releaseYear}</span>
//                 </div>
//               </div>
//             </div>

//             {/* play btn */}
//             <div className="px-6 pb-4 flex items-center gap-6">
//               <Button
//                 onClick={handlePlayAlbum}
//                 size="icon"
//                 className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
//               >
//                 {isPlaying &&
//                 currentAlbum?.songs.some(
//                   (song) => song._id === currentSong?._id
//                 ) ? (
//                   <Pause className="w-7 h-7 text-black" />
//                 ) : (
//                   <Play className="w-7 h-7 text-black" />
//                 )}
//               </Button>
//             </div>

//             {/* table section */}
//             <div className="bg-black/20 backdrop-blur-sm">
//               {/* table header */}
//               <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 sm:px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
//                 <div>#</div>
//                 <div>Title</div>
//                 <div>Released Date</div>
//                 <div>
//                   <Clock className="h-4 w-4" />
//                 </div>
//               </div>

//               {/* songs list */}
//               <div className="sm:px-6">
//                 <div className="space-y-2 py-4">
//                   {currentAlbum?.songs?.map((song, i) => {
//                     const isCurrentSong = currentSong?._id === song._id;
//                     return (
//                       <div
//                         key={song._id}
//                         onClick={() => handlePlaySong(i)}
//                         className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer`}
//                       >
//                         <div className="flex items-center justify-center">
//                           {isCurrentSong && isPlaying ? (
//                             <div className="size-4 text-green-500">♫</div>
//                           ) : (
//                             <span className="group-hover:hidden">{i + 1}</span>
//                           )}
//                           {!isCurrentSong && (
//                             <Play className="h-4 w-4 hidden group-hover:block" />
//                           )}
//                         </div>

//                         {/* song details */}
//                         <div className="flex items-center gap-3">
//                           <img
//                             src={song?.imageUrl}
//                             alt={song?.title}
//                             className="size-10"
//                           />
//                           <div>
//                             <div className={`font-medium text-white`}>
//                               {song.title}
//                             </div>
//                             <div>{song.artist}</div>
//                           </div>
//                         </div>

//                         <div className="flex items-center">
//                           {song.createdAt.split("T")[0]}
//                         </div>
//                         <div className="flex items-center">
//                           {formatDuration(song.duration)}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </ScrollArea>
//     </section>
//   );
// };
// export default AlbumPage;

import { Button } from "@/components/ui/button";
import { usePlayStore } from "@/stores/usePlayStore";
import { useMusicStore } from "@/stores/useMusicStore";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Clock, Loader, Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayStore();

  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  const handlePlayAlbum = () => {
    if (!currentAlbum) return;
    const isCurrentAlbumPlaying = currentAlbum?.songs.some(
      (song) => song._id === currentSong?._id
    );
    if (isCurrentAlbumPlaying) togglePlay();
    else {
      playAlbum(currentAlbum?.songs, 0);
    }
  };

  const handlePlaySong = (i: number) => {
    if (!currentAlbum) return;
    playAlbum(currentAlbum?.songs, i);
  };

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <section className="h-full rounded-md overflow-hidden">
      <ScrollArea className="h-full overflow-y-auto scrollbar-hide">
        <div className="relative min-h-full">
          <div
            area-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none"
          />

          <div className="relative z-10">
            {/* Album Header - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row p-4 sm:p-6 gap-4 sm:gap-6 pb-6 sm:pb-8">
              <img
                src={currentAlbum?.imageUrl}
                alt={currentAlbum?.title}
                className="w-full h-full sm:w-[240px] sm:h-[240px] shadow-xl rounded mx-auto sm:mx-0"
              />
              <div className="hidden sm:flex flex-col justify-end text-center sm:text-left">
                <p className="text-sm font-medium">Album</p>
                <h1 className="text-4xl sm:text-7xl font-bold my-2 sm:my-4">
                  {currentAlbum?.title}
                </h1>
                <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">
                    {currentAlbum?.artist}
                  </span>
                  <span className="hidden sm:block">•</span>
                  <span>{currentAlbum?.songs.length} songs</span>
                  <span className="hidden sm:block">•</span>
                  <span>{currentAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>

            {/* Play Button */}
            <div className="px-4 sm:px-6 pb-4 flex items-center justify-start gap-6">
              <Button
                onClick={handlePlayAlbum}
                size="icon"
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
              >
                {isPlaying &&
                currentAlbum?.songs.some(
                  (song) => song._id === currentSong?._id
                ) ? (
                  <Pause className="w-7 h-7 text-black" />
                ) : (
                  <Play className="w-7 h-7 text-black" />
                )}
              </Button>
            </div>

            {/* Songs List Section */}
            <div className="bg-black/20 backdrop-blur-sm">
              {/* Table Header - Hidden on mobile */}
              <div className="hidden sm:grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>
                  <Clock className="h-4 w-4" />
                </div>
              </div>

              {/* Songs List - Mobile Responsive */}
              <div className="px-2 sm:px-6">
                <div className="space-y-2 py-4">
                  {currentAlbum?.songs?.map((song, i) => {
                    const isCurrentSong = currentSong?._id === song._id;
                    return (
                      <div
                        key={song._id}
                        onClick={() => handlePlaySong(i)}
                        className="grid grid-cols-[16px_1fr] sm:grid-cols-[16px_4fr_2fr_1fr] gap-2 sm:gap-4 px-2 sm:px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer"
                      >
                        <div className="flex items-center justify-center">
                          {isCurrentSong && isPlaying ? (
                            <div className="size-4 text-green-500">♫</div>
                          ) : (
                            <span className="group-hover:hidden">{i + 1}</span>
                          )}
                          {!isCurrentSong && (
                            <Play className="h-4 w-4 hidden group-hover:block" />
                          )}
                        </div>

                        {/* Song Details - Mobile Responsive */}
                        <div className="flex items-center gap-3">
                          <img
                            src={song?.imageUrl}
                            alt={song?.title}
                            className="size-10"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-white truncate">
                              {song.title}
                            </div>
                            <div className="truncate">{song.artist}</div>
                          </div>
                          <div className="text-right sm:hidden">
                            {formatDuration(song.duration)}
                          </div>
                        </div>

                        {/* Hidden on mobile */}
                        <div className="hidden sm:flex items-center">
                          {song.createdAt.split("T")[0]}
                        </div>
                        <div className="hidden sm:flex items-center">
                          {formatDuration(song.duration)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </section>
  );
};

export default AlbumPage;
