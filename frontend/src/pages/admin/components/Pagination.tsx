// import { Button } from "@/components/ui/button";
// import { useMusicStore } from "@/stores/useMusicStore";
// import { useEffect } from "react";

// const Pagination = () => {
//   const { currentPage, totalPages, fetchSongs } = useMusicStore();

//   useEffect(() => {
//     fetchSongs(currentPage);
//   }, [currentPage, fetchSongs]);

//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       fetchSongs(page); // Fetch songs for the new page
//     }
//   };

//   return (
//     <div className="flex justify-center items-center space-x-6 py-6">
//       <Button
//         onClick={() => handlePageChange(currentPage - 1)}
//         disabled={currentPage <= 1}
//         className={`${
//           currentPage <= totalPages
//             ? "bg-gray-500 hover:bg-emerald-600"
//             : "bg-gray-400 cursor-not-allowed "
//         } px-4 py-2 rounded-lg shadow-md transition-colors`}
//       >
//         Previous
//       </Button>

//       <span className="text-lg font-semibold text-zinc-400">
//         Page {currentPage} of {totalPages}
//       </span>

//       <Button
//         onClick={() => handlePageChange(currentPage + 1)}
//         disabled={currentPage >= totalPages}
//         className={`${
//           currentPage >= totalPages
//             ? "bg-gray-400 cursor-not-allowed"
//             : "bg-emerald-500 hover:bg-emerald-600"
//         } px-4 py-2 rounded-lg shadow-md transition-colors`}
//       >
//         Next
//       </Button>
//     </div>
//   );
// };

// export default Pagination;

import { Button } from "@/components/ui/button";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";

const Pagination = () => {
  const { currentPage, totalPages, fetchSongs } = useMusicStore();

  useEffect(() => {
    fetchSongs(currentPage);
  }, [currentPage, fetchSongs]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      fetchSongs(page); // Fetch songs for the new page
    }
  };

  return (
    <div className="flex justify-center items-center space-x-6 py-6">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`${
          currentPage <= 1
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-emerald-500 hover:bg-emerald-600"
        } px-4 py-2 rounded-lg shadow-md transition-colors`}
      >
        Previous
      </Button>

      <span className="text-lg font-semibold text-zinc-400">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`${
          currentPage >= totalPages
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-emerald-500 hover:bg-emerald-600"
        } px-4 py-2 rounded-lg shadow-md transition-colors`}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
