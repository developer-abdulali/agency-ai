import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";

export const addSong = async (req, res) => {
  try {
    const { name, desc, album } = req.body;

    const audioFile = req.files.audio?.[0];
    const imageFile = req.files.image?.[0];

    const audioUpload = await cloudinary.uploader.upload(audioFile?.path, {
      resource_type: "video",
    });
    const imageUpload = await cloudinary.uploader.upload(imageFile?.path, {
      resource_type: "image",
    });

    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
      audioUpload.duration % 60
    )}`;

    const songData = {
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration,
    };

    const song = new songModel(songData);
    await song.save();

    res.json({ success: true, message: "Song added" });
  } catch (error) {
    console.log("Error while song uploading:", error);
    res.json({
      success: false,
      error: error.message || "Something went wrong.",
    });
  }
};

export const getAllSongs = async (req, res) => {
  const allSongs = await songModel.find({});
  res.json({ success: true, songs: allSongs });
  try {
  } catch (error) {
    console.error("Error while fetching songs:", error);
    res.json({
      success: false,
      error: error.message || "Something went wrong.",
    });
  }
};

export const removeSong = async (req, res) => {
  try {
    await songModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Song deleted" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message || "Something went wrong.",
    });
  }
};
