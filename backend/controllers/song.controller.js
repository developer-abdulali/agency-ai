import mongoose from "mongoose";
import Song from "../models/songs.model.js";

// get all songs function
export const getAllSongs = async (req, res, next) => {
  try {
    const pageSize = 5;
    const currentPage = Number(req.query.page) || 1;
    const totalSongs = await Song.countDocuments(); // Get total number of songs
    const totalPages = Math.ceil(totalSongs / pageSize);

    const songs = await Song.find({}, null, {
      skip: (currentPage - 1) * pageSize, // Adjust to use the correct page
      limit: pageSize,
    });

    res.status(200).json({
      songs,
      totalPages,
      currentPage,
    });
  } catch (error) {
    console.log("Error while getting all songs", error);
    next(error);
  }
};

// get single song function
export const getSongById = async (req, res, next) => {
  try {
    const { songId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(songId)) {
      return res.status(400).json({ message: "Invalid song ID" });
    }

    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json(song);
  } catch (error) {
    console.error("Error while getting a song:", error);
    next(error);
  }
};

// get featured song function
export const getFeaturedSongs = async (req, res, next) => {
  try {
    // fetch 6 random songs using mongodb's aggregation pipeline
    const songs = await Song.aggregate([
      { $sample: { size: 6 } },
      {
        $project: { _id: 1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1 },
      },
    ]);
    res.status(200).json(songs);
  } catch (error) {
    console.log("Error while getting featured songs", error);
    next(error);
  }
};

// get made for you song function
export const getMadeForYouSongs = async (req, res, next) => {
  try {
    // fetch 6 random songs using mongodb's aggregation pipeline
    const songs = await Song.aggregate([
      { $sample: { size: 4 } },
      {
        $project: { _id: 1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1 },
      },
    ]);
    res.status(200).json(songs);
  } catch (error) {
    console.log("Error while getting made for you songs", error);
    next(error);
  }
};

// get trending song function
export const getTrendingSongs = async (req, res, next) => {
  try {
    // fetch 6 random songs using mongodb's aggregation pipeline
    const songs = await Song.aggregate([
      { $sample: { size: 4 } },
      {
        $project: { _id: 1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1 },
      },
    ]);
    res.status(200).json(songs);
  } catch (error) {
    console.log("Error while getting trending songs", error);
    next(error);
  }
};
