import { useEffect, useState } from "react";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import Loading from "./Loading";
import SearchUserCard from "./SearchUserCard";
import toast from "react-hot-toast";
import axios from "axios";

const SearchUser = ({ onClose }) => {
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearchUser = async (e) => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/search-user`;
    try {
      const response = await axios.post(URL, { search });
      setSearchUser(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    handleSearchUser();
  }, [search]);

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2">
      <div className="w-full max-w-lg mx-auto mt-10">
        {/* input for search user */}
        <div className="bg-white rounded h-14 overflow-hidden flex">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search user by name or email"
            className="w-full outline-none py-1 h-full px-4"
          />
          <div className="h-14 w-14 flex items-center justify-center">
            <IoSearchOutline size={25} />
          </div>
        </div>

        {/* display search users */}
        <div className="bg-white mt-2 w-full p-4 rounded">
          {/* no user found ui */}
          {searchUser.length === 0 && !loading && (
            <p className="text-center text-slate-500">No user found!</p>
          )}

          {/* loading */}
          {loading && <Loading />}

          {searchUser.length !== 0 &&
            !loading &&
            searchUser.map((user, i) => {
              return (
                <SearchUserCard key={user._id} user={user} onClose={onClose} />
              );
            })}
        </div>
      </div>

      <div
        className="absolute top-0 right-0 text-2xl p-2 lg:text-4xl hover:text-white"
        onClick={onClose}
      >
        <button>
          <IoClose />
        </button>
      </div>
    </section>
  );
};
export default SearchUser;
