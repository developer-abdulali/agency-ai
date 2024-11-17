import React from "react";

const EmptyCard = ({
  isSearch,
  imgSrc,
  message,
  onAction,
  actionLabel = "Add Note",
}) => {
  return (
    <div className="flex flex-col items-center justify-center mt-16 px-4 md:px-8">
      {/* Image */}
      {imgSrc && (
        <div className="bg-gray-100 rounded-lg p-4 shadow-md transition-transform duration-200 hover:scale-105">
          <img
            src={imgSrc}
            alt="No content available"
            className="w-40 md:w-56 lg:w-64"
          />
        </div>
      )}

      {/* Message */}
      <p className="mt-6 text-center text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed max-w-lg">
        {message}
      </p>

      {/* Optional Action Button */}
      {!isSearch && (
        <button
          onClick={onAction}
          className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 active:scale-95 transition duration-200"
        >
          Add Note
        </button>
      )}
    </div>
  );
};

export default EmptyCard;
