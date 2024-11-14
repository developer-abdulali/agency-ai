import { useState } from "react";
import { MdClose } from "react-icons/md";
import TagInput from "../../components/Input/TagInput/TagInput";

const AddEditNotes = ({ onClose, noteData, type }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);

  // edit note
  const editNote = async () => {};

  // add new note
  const addNewNote = async () => {};

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
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 bg-slate-50"
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label text-red-400">Title</label>
        <input
          type="text"
          placeholder="Wake up at 6 a.m."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl text-slate-950 outline-none"
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label text-red-400">Content</label>
        <textarea
          type="text"
          rows={10}
          placeholder="Content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
        ></textarea>
      </div>

      <div className="mt-3">
        <label className="input-label text-red-400 uppercase">tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {/* show error */}
      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        onClick={handleAddNote}
        className="btn-primary font-medium mt-5 p-3"
      >
        ADD
      </button>
    </section>
  );
};
export default AddEditNotes;
