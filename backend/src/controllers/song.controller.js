import Song from "../models/songs.model.js";

// get all songs function
export const getAllSongs = async (req, res, next) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.status(200).json(songs);
  } catch (error) {
    console.log("Error while getting all songs", error);
    next(error);
  }
};

// get single song function
export const getSongById = async (req, res, next) => {
  try {
    const { songId } = req.params;

    const song = await Song.findById(songId);

    if (!song) return res.status(404).json({ message: "Song not found" });

    res.status(200).json(song);
  } catch (error) {
    console.log("Error while getting a song", error);
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
