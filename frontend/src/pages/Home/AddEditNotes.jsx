import { useState } from "react";
import { MdClose } from "react-icons/md";
import TagInput from "../../components/Input/TagInput/TagInput";
import axios from "axios";
import { toast } from "react-toastify";

const AddEditNotes = ({ onClose, noteData, type, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  // edit note
  const editNote = async () => {
    const noteId = noteData._id;

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/notes/edit/${noteId}`,
        {
          title,
          content,
          tags,
        },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        console.log(res.data.message);
        toast.error(res.data.message);
        setError(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
      onClose();
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
      setError(error.message);
    }
  };

  // add new note
  const addNewNote = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/notes/add`,
        {
          title,
          content,
          tags,
        },
        { withCredentials: true }
      );

      if (res.data.message === false) {
        console.log(res.data.message);
        toast.error(res.data.message);
        setError(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes();
      onClose();
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
      setError(error.message);
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <section className="relative">
      <button
        onClick={onClose}
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-14 right-0 bg-slate-50"
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="text-red-400">Title</label>
        <input
          type="text"
          placeholder="Wake up at 6 a.m."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl text-slate-950 outline-none border-b-2 border-gray-300 focus:border-blue-500 p-2"
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="text-red-400">Content</label>
        <textarea
          rows={10}
          placeholder="Content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-sm text-slate-950 outline-none border-2 border-gray-300 focus:border-blue-500 p-2 rounded"
        ></textarea>
      </div>

      <div className="mt-3">
        <label className="text-red-400 uppercase">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {/* show error */}
      {error && <p className="text-red-500 text-sm pt-4">{error}</p>}

      <button
        onClick={handleAddNote}
        className="btn-primary font-medium mt-5 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        {type === "edit" ? "Update" : "Add"}
      </button>
    </section>
  );
};

export default AddEditNotes;
