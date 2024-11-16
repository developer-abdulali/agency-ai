import { MdAdd } from "react-icons/md";
import NoteCard from "../../components/NoteCard/NoteCard";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import AddEditNotes from "./AddEditNotes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { currentUser, loading, errorDispatch } = useSelector(
    (state) => state.user
  );
  const [userInfo, setUserInfo] = useState(null);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  useEffect(() => {
    if (currentUser === null || !currentUser) {
      navigate("/login");
    } else {
      setUserInfo(currentUser?.user);
    }
  }, [currentUser]);

  return (
    <>
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 max-md:m-5">
          <NoteCard
            title={"Wake Up at 6 a.m."}
            date={"5th June, 2021"}
            content={"You know nothing, Jon Snow"}
            tags={"#jhonsnow"}
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
          <NoteCard
            title={"Wake Up at 6 a.m."}
            date={"5th June, 2021"}
            content={"You know nothing, Jon Snow"}
            tags={"#jhonsnow"}
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
          <NoteCard
            title={"Wake Up at 6 a.m."}
            date={"5th June, 2021"}
            content={"You know nothing, Jon Snow"}
            tags={"#jhonsnow"}
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
          <NoteCard
            title={"Wake Up at 6 a.m."}
            date={"5th June, 2021"}
            content={"You know nothing, Jon Snow"}
            tags={"#jhonsnow"}
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </section>

      <button
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
        contentLabel="Add Note"
        className="w-[40%] max-md:w-[60%] max-sm:w-[70%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          noteData={openAddEditModal.data}
          type={openAddEditModal.type}
        />
      </Modal>
    </>
  );
};
export default Home;
