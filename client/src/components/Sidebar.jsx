import { IoChatbubbleEllipses } from "react-icons/io5";
import { FiArrowUpLeft } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { useState } from "react";
import EditUserDetail from "./EditUserDetail";
import SearchUser from "./SearchUser";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [openSearchUser, setOpenSearchUser] = useState(false);

  return (
    <section className="h-full w-full grid grid-cols-[48px_1fr] bg-white">
      <div className="bg-slate-100 w-12 h-full rounded-r-lg py-5 text-slate-600 flex flex-col justify-between">
        <div>
          <NavLink
            title="Chat"
            className={({ isActive }) =>
              `${
                isActive && "bg-slate-200"
              } w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-slate-200 rounded`
            }
          >
            <IoChatbubbleEllipses size={25} />
          </NavLink>

          <div
            title="Add friend"
            onClick={() => setOpenSearchUser(true)}
            className="w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-slate-200 rounded"
          >
            <FaUserPlus size={25} />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <button
            title={user?.name}
            onClick={() => setEditUserOpen(!editUserOpen)}
            className="mx-auto"
          >
            <Avatar
              width={40}
              height={40}
              name={user?.name}
              imageUrl={user?.profile_pic}
              userId={user?._id}
            />
          </button>
          <button
            title="Logout"
            className="w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-slate-200 rounded"
          >
            <span className="-ml-2">
              <BiLogOut size={25} />
            </span>
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="h-16 flex items-center">
          <h2 className="text-xl font-bold p-4 text-slate-800">Messages</h2>
        </div>

        {/* divider */}
        <div className="bg-slate-200" />

        <div className="h-[calc(100vh-65px)] overflow-hidden overflow-y-auto scrollbar">
          {allUsers.length === 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-center my-4 text-slate-500">
                <FiArrowUpLeft size={50} />
              </div>
              <p className="text-lg text-center text-slate-400">
                Explore users to start a conversation with.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* edit user detail component */}
      {editUserOpen && (
        <EditUserDetail onClose={() => setEditUserOpen(false)} user={user} />
      )}

      {/* search users */}
      {openSearchUser && (
        <SearchUser onClose={() => setOpenSearchUser(false)} />
      )}
    </section>
  );
};
export default Sidebar;
