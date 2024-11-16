import { Edit, Pin, Trash2 } from "lucide-react";
import moment from "moment";

const NoteCard = ({ note, onPinNote, onEdit, onDelete }) => {
  const { title, content, tags, isPinned, createdAt } = note;
  const formattedDate = moment(createdAt).format("MMM Do, YYYY");

  return (
    <div className="group bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-all duration-300 ease-in-out">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 truncate">{title}</h3>
          <p className="text-xs text-gray-500">{formattedDate}</p>
        </div>
        <button
          onClick={onPinNote}
          title="Pin the note"
          className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <Pin
            className={`w-4 h-4 transform transition-transform ${
              isPinned
                ? "text-blue-600 rotate-45"
                : "text-gray-400 group-hover:text-gray-600"
            }`}
          />
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{content}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags?.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={onEdit}
          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
          title="Edit"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
