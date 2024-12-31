import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserSearchCard = ({ user, onClose }) => {
  const currentUser = useSelector((state) => state.user);
  const isCurrentUser = user?._id === currentUser?._id;

  if (isCurrentUser) {
    return null;
  }

  return (
    <Link
      to={"/" + user?._id}
      onClick={onClose}
      className="flex items-center gap-3 p-2 lg:p-4 border border-transparent border-b-slate-200 hover:border hover:border-primary rounded cursor-pointer"
    >
      <div>
        <Avatar
          width={50}
          height={50}
          name={user?.name}
          userId={user?._id}
          imageUrl={user?.profile_pic}
        />
      </div>
      <div>
        <div className="font-semibold text-ellipsis line-clamp-1">
          {user?.name}
        </div>
        <p className="text-sm text-ellipsis line-clamp-1">{user?.email}</p>
      </div>
    </Link>
  );
};

export default UserSearchCard;
