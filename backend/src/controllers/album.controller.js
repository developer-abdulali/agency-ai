import Album from "../models/album.model.js";

// get all albums function
export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find();
    res.status(200).json(albums);
  } catch (error) {
    console.log("Error while getting all albums", error);
    next(error);
  }
};

// get single album function
export const getAlbumById = async (req, res, next) => {
  try {
    const { albumId } = req.params;

    const album = await Album.findById(albumId).populate("songs");

    if (!album) return res.status(404).json({ message: "Album not found" });

    res.status(200).json(album);
  } catch (error) {
    console.log("Error while getting single album", error);
    next(error);
  }
};
