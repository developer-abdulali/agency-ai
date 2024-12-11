import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import { Plus } from "lucide-react";
import AddEditNotes from "./AddEditNotes";
import NoteCard from "../../components/NoteCard/NoteCard";
import { toast } from "react-toastify";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const getAllNotes = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/notes/all`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success === false) return;
      setAllNotes(res.data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: noteDetails });
  };

  const deleteNote = async (note) => {
    const noteId = note._id;
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/notes/delete/${noteId}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success === false) return;
      toast.success("Note deleted successfully!");
      setAllNotes(allNotes.filter((n) => n._id !== noteId));
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const onSearchNote = async (query) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/notes/search`,
        {
          params: { query },
          withCredentials: true,
        }
      );
      if (res.data.success === false) {
        console.log(res.data.message);
        toast.error(res.data.message);
        return;
      }
      setIsSearch(true);
      setAllNotes(res.data.notes);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  const updateIsPinNote = async (noteData) => {
    const noteId = noteData?._id;
    try {
      const res = await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_URL
        }/notes/update-note-pinned/${noteId}`,
        { isPinned: !noteData.isPinned },
        { withCredentials: true }
      );
      if (res.data.success === false) return;
      toast.success(res.data.message);

      // Update the local state without refetching
      const updatedNotes = allNotes.map((note) =>
        note._id === noteId ? { ...note, isPinned: !note.isPinned } : note
      );
      // Sort notes with pinned ones first
      updatedNotes.sort((a, b) => b.isPinned - a.isPinned);
      setAllNotes(updatedNotes);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      setUserInfo(currentUser?.user);
      getAllNotes();
    }
  }, [currentUser]);

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-screen-2xl mx-auto px-4 py-8">
          {allNotes?.length > 0 && (
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-800">My Notes</h1>
              <button
                onClick={() =>
                  setOpenAddEditModal({
                    isShown: true,
                    type: "add",
                    data: null,
                  })
                }
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Plus className="w-5 h-5" />
                <span>Add Note</span>
              </button>
            </div>
          )}
          {allNotes?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {allNotes?.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={() => {
                    handleEdit(note);
                  }}
                  onDelete={() => {
                    deleteNote(note);
                  }}
                  onPinNote={() => {
                    updateIsPinNote(note);
                  }}
                />
              ))}
            </div>
          ) : (
            <EmptyCard
              isSearch={isSearch}
              imgSrc={
                isSearch
                  ? ""
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDCtZLuixBFGTqGKdWGLaSKiO3qyhW782aZA&s"
              }
              message={
                isSearch
                  ? "No note found!"
                  : "Ready to capture your ideas? Click the 'Add Note' button to start noting down your thoughts, inspirations, and reminders."
              }
              onAction={() =>
                setOpenAddEditModal({ isShown: true, type: "add", data: null })
              }
              actionLabel={"Add Note"}
            />
          )}
        </div>

        {/* Floating Add Button for Mobile */}
        <button
          onClick={() =>
            setOpenAddEditModal({ isShown: true, type: "add", data: null })
          }
          className="sm:hidden fixed right-6 bottom-6 w-14 h-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
        >
          <Plus className="w-6 h-6 text-white" />
        </button>

        {/* Modal */}
        <Modal
          isOpen={openAddEditModal.isShown}
          onRequestClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          className="w-11/12 max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-6 max-h-[90vh] overflow-y-auto"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <h2 className="text-2xl font-bold mb-4">
            {openAddEditModal.type === "add" ? "Add Note" : "Edit Note"}
          </h2>

          {/* Add your AddEditNotes component here */}
          <AddEditNotes
            onClose={() =>
              setOpenAddEditModal({ isShown: false, type: "add", data: null })
            }
            noteData={openAddEditModal.data}
            type={openAddEditModal.type}
            getAllNotes={getAllNotes}
          />
        </Modal>
      </div>
    </>
  );
};

export default Home;
