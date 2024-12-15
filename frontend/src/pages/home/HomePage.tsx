import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect, useState } from "react";
import FeaturedSection from "./components/FeaturedSection";
import {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
} from "@radix-ui/react-scroll-area";
import SectionGrid from "./components/SectionGrid";
import { usePlayStore } from "@/stores/usePlayStore";

const HomePage = () => {
  const {
    isLoading,
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    featuredSongs,
    madeForYouSongs,
    trendingSongs,
  } = useMusicStore();

  const { initializedQueue } = usePlayStore();

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    if (
      madeForYouSongs.length > 0 &&
      featuredSongs.length > 0 &&
      trendingSongs.length > 0
    ) {
      const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
      initializedQueue(allSongs);
    }
  }, [initializedQueue, madeForYouSongs, featuredSongs, trendingSongs]);

  useEffect(() => {
    // Fetch songs
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();

    // Determine the greeting based on the current hour
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  return (
    <main className="relative flex flex-col h-screen overflow-hidden bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)] overflow-hidden">
        {/* <ScrollArea className="h-[calc(100vh-80px)] overflow-hidden"> */}
        <ScrollAreaViewport className="w-full h-full">
          <div className="p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6">{greeting}</h1>
            <FeaturedSection />

            <div className="space-y-8">
              <SectionGrid
                title="Made For You"
                songs={madeForYouSongs}
                isLoading={isLoading}
              />
              <SectionGrid
                title="Trending"
                songs={trendingSongs}
                isLoading={isLoading}
              />
            </div>
          </div>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation="vertical" className="bg-gray-800">
          <ScrollAreaThumb className="bg-gray-500 rounded" />
        </ScrollAreaScrollbar>
      </ScrollArea>
    </main>
  );
};

export default HomePage;
