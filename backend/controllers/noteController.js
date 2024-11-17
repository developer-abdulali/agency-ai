import Note from "../models/Note.js";
import errorHandler from "../utils/errorHandler.js";

export const createNote = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    const { id } = req.user;

    if (!title && !content) {
      return next(errorHandler(400, "Title and content are required"));
    }

    if (tags && tags.length > 5) {
      return next(errorHandler(400, "Maximum 5 tags are allowed"));
    }
    const note = new Note({ title, content, tags: tags || [], userId: id });

    await note.save();

    res
      .status(201)
      .json({ success: true, message: "Note added successfully", note });
  } catch (error) {
    next(errorHandler(500, "Error creating note"));
  }
};

export const getAllNotes = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const notes = await Note.find({ userId: userId }).sort({ isPinned: -1 });
    res.status(200).json({
      success: true,
      message: "All notes retrived successfully",
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.noteId);

    if (!note) {
      return next(errorHandler(404, "Note not found"));
    }

    if (req.user.id !== note.userId) {
      return next(errorHandler(403, "You can only update your own notes!"));
    }

    const { title, content, tags, isPinned } = req.body;

    if (!title && !content && !tags && isPinned === undefined) {
      return next(errorHandler(400, "No changes provided"));
    }

    if (title) {
      note.title = title;
    }
    if (content) {
      note.content = content;
    }
    if (tags) {
      note.tags = tags;
    }
    if (isPinned !== undefined) {
      note.isPinned = isPinned;
    }

    await note.save();

    res
      .status(200)
      .json({ success: true, message: "Note updated successfully", note });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const noteId = req.params.noteId;
    const note = await Note.findOne({ _id: noteId, userId: req.user.id });

    if (!note) {
      return next(errorHandler(404, "Note not found"));
    }

    await note.deleteOne({ _id: noteId, userId: req.user.id });

    res
      .status(200)
      .json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateNotePinned = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.noteId);

    if (!note) {
      return next(errorHandler(404, "Note not found"));
    }

    if (req.user.id !== note.userId) {
      return next(errorHandler(403, "You can only update your own notes!"));
    }

    const { isPinned } = req.body;

    note.isPinned = isPinned;
    await note.save();

    res
      .status(200)
      .json({ success: true, message: "Note updated successfully", note });
  } catch (err) {
    next(err);
  }
};

export const searchNote = async (req, res, next) => {
  const { query } = req.query;

  if (!query) {
    return next(errorHandler(400, "Search query is required"));
  }
  try {
    const matchingNotes = await Note.find({
      userId: req.user.id,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
        { tags: { $in: query.split(",") } },
      ],
    });
    // .sort({ isPinned: -1 });

    res.status(200).json({
      success: true,
      message: "Search results",
      notes: matchingNotes,
    });
  } catch (error) {
    next(error);
  }
};
