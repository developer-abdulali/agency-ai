import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../../redux/user/userSlice";
import { Menu, X, Search } from "lucide-react";
import axios from "axios";
import ProfileInfo from "../ProfileInfo/ProfileInfo";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
    setShowSearch(false);
  };

  const onLogout = async () => {
    try {
      dispatch(signOutStart());
      const res = await axios.get(
        `https://mern-note-server-ecru.vercel.app/api/auth/signout`,
        {
          withCredentials: true,
        }
      );

      if (!res.data.success) {
        dispatch(signOutFailure(res.data.message));
        return;
      }

      dispatch(signOutSuccess());
      navigate("/login");
    } catch (error) {
      console.log(error);
      dispatch(signOutFailure(error.response?.data?.message || error.message));
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) onSearchNote(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <nav className="bg-white shadow-sm sticky top-0">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-slate-600 to-slate-900 bg-clip-text text-transparent">
                <span className="text-slate-500">Good</span>
                <span className="text-slate-900">Notes</span>
              </h2>
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes..."
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={onClearSearch}
                  className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={handleSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {userInfo && (
              <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            showSearch ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-3 px-2">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={onClearSearch}
                  className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={handleSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
