import Album from "../models/album.model.js";
import Song from "../models/songs.model.js";
import User from "../models/user.model.js";

export const getStatics = async (req, res, next) => {
  try {
    const [totalSongs, totalUsers, totalAlbums, uniqueArtists] =
      await Promise.all([
        Song.countDocuments(),
        User.countDocuments(),
        Album.countDocuments(),

        Song.aggregate([
          { $unionWith: { coll: "albums", pipeline: [] } },
          { $group: { _id: "$artist" } },
          { $count: "count" },
        ]),
      ]);

    res.json({
      totalSongs,
      totalUsers,
      totalAlbums,
      totalArtists: uniqueArtists[0]?.count || 0,
    });
  } catch (error) {
    console.log("Error while getting stats", error);
    next(error);
  }
};
