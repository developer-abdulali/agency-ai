// import React from "react";
// import { FaTags } from "react-icons/fa6";
// import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";
// import moment from "moment";

// const NoteCard = ({
//   title,
//   date,
//   content,
//   tags,
//   isPinned,
//   onPinNote,
//   onEdit,
//   onDelete,
// }) => {
//   return (
//     <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
//       <div className="flex items-center justify-between">
//         <div>
//           <h6 className="text-sm font-medium">{title}</h6>
//           <span className="text-xs text-green-700">
//             {moment(date).format("Do MMM YYYY")}
//           </span>
//         </div>

//         <MdOutlinePushPin
//           className={`icon-btn ${
//             isPinned ? "text-[#2B85FF] " : "text-slate-300"
//           }`}
//           onClick={onPinNote}
//         />
//       </div>

//       <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>

//       <div className="flex items-center justify-between mt-2">
//         <div className="text-xs text-slate-500">
//           {tags}
//           {/* {tags?.map((item) => `#${item} `)} */}
//         </div>

//         <div className="flex items-center gap-2">
//           <MdCreate
//             className="icon-btn hover:text-green-600"
//             onClick={onEdit}
//           />

//           <MdDelete
//             className="icon-btn hover:text-red-500"
//             onClick={onDelete}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NoteCard;

import React from "react";
import { FaTags } from "react-icons/fa6";
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";
import moment from "moment";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onPinNote,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="border rounded-lg p-4 bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h6 className="text-lg font-semibold text-gray-800">{title}</h6>
          <span className="text-xs text-green-600">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>
        <MdOutlinePushPin
          className={`cursor-pointer text-xl ${
            isPinned ? "text-blue-500" : "text-gray-400"
          }`}
          onClick={onPinNote}
        />
      </div>

      <p className="text-sm text-gray-600 mt-2 line-clamp-3">{content}</p>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center text-xs text-blue-500 space-x-1">
          <FaTags className="text-blue-400" />
          <span>{tags}</span>
        </div>

        <div className="flex items-center gap-3">
          <MdCreate
            className="cursor-pointer text-gray-600 hover:text-green-600"
            onClick={onEdit}
            title="Edit"
          />
          <MdDelete
            className="cursor-pointer text-gray-600 hover:text-red-500"
            onClick={onDelete}
            title="Delete"
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
