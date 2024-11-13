import { useState } from "react";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Implement search logic here
  };

  const onClearSearch = () => {
    setSearchQuery("");
  };

  const onLogout = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-white flex items-center justify-between drop-shadow">
      {/* logo */}
      <h2 className="text-xl font-medium py-3 text-black">
        <span className="text-slate-600">Good</span>
        <span className="text-slate-900">Notes</span>
      </h2>

      {/* searchbar */}
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      {/* profile info */}
      <ProfileInfo onLogout={onLogout} />
    </nav>
  );
};
export default Navbar;
