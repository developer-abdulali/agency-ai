import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import { Plus, Edit, Trash2, Pin } from "lucide-react";
import AddEditNotes from "./AddEditNotes";
import NoteCard from "../../components/NoteCard/NoteCard";

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const getAllNotes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/notes/all", {
        withCredentials: true,
      });
      if (res.data.success === false) return;
      setAllNotes(res.data.notes);
    } catch (error) {
      console.log(error);
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Notes</h1>
          <button
            onClick={() =>
              setOpenAddEditModal({ isShown: true, type: "add", data: null })
            }
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus className="w-5 h-5" />
            <span>Add Note</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {allNotes?.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={() => {}}
              onDelete={() => {}}
              onPinNote={() => {}}
            />
          ))}
        </div>
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
        className="w-11/12 max-w-2xl mx-auto mt-16 bg-white rounded-lg shadow-xl"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center"
      >
        <div className="p-6">
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
          />
        </div>
      </Modal>
    </div>
  );
};

export default Home;
