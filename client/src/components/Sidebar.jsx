import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { useState } from "react";
import EditUserDetail from "./EditUserDetail";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const [editUserOpen, setEditUserOpen] = useState(false);

  return (
    <section className="h-full w-full">
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

          <div className="w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-slate-200 rounded">
            <FaUserPlus size={25} />
          </div>
        </div>

        <div>
          <button
            title={user?.name}
            onClick={() => setEditUserOpen(!editUserOpen)}
          >
            <Avatar width={40} height={40} name={user?.name} />
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

      {/* edit user detail component */}
      {editUserOpen && (
        <EditUserDetail onClose={() => setEditUserOpen(false)} user={user} />
      )}
    </section>
  );
};
export default Sidebar;
