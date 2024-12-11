import React from "react";
import { BiSolidEdit } from "react-icons/bi";
import { LuPin, LuTrash2 } from "react-icons/lu";
import moment from "moment";

const NoteCard = ({ note, onPinNote, onEdit, onDelete }) => {
  const { title, content, tags, isPinned, createdAt } = note;
  const formattedDate = moment(createdAt).format("MMM Do, YYYY");

  return (
    <div
      onClick={() => onEdit()}
      className="cursor-pointer group bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 ease-in-out flex flex-col relative"
    >
      {/* Date and Pin Button */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-gray-500">{formattedDate}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPinNote();
          }}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <LuPin
            title="Pin the note"
            className={`w-4 h-4 transform transition-transform ${
              isPinned
                ? "text-blue-600 rotate-45"
                : "text-gray-400 group-hover:text-gray-600"
            }`}
          />
        </button>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-1">
        {title}
      </h3>

      {/* Content */}
      <div className="flex-1 overflow-hidden mb-4">
        <p className="text-sm text-gray-600 line-clamp-1">{content}</p>
      </div>

      {/* Tags */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-2 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
          title="Edit"
        >
          <BiSolidEdit className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
          title="Delete"
        >
          <LuTrash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
