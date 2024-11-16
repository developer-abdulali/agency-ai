import { useState } from "react";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../../redux/user/userSlice";
import axios from "axios";

const Navbar = ({ userInfo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {};

  const onClearSearch = () => {
    setSearchQuery("");
  };

  const onLogout = async () => {
    try {
      dispatch(signOutStart());

      const res = await axios.get("http://localhost:3000/api/auth/signout", {
        withCredentials: true,
      });

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

  // const onLogout = async () => {
  //   try {
  //     dispatch(signOutStart());

  //     const res = axios.get("http://localhost:3000/api/auth/signout", {
  //       withCredentials: true,
  //     });
  //     if (res.data.success === false) {
  //       dispatch(signOutFailure(res.data.message));
  //     }

  //     dispatch(signOutSuccess());

  //     navigate("/login");
  //   } catch (error) {
  //     dispatch(signOutFailure(error.message));
  //   }
  // };

  return (
    <nav className="bg-white flex items-center justify-between drop-shadow px-4">
      {/* logo */}
      <Link to="/">
        <h2 className="text-xl font-medium py-3 text-black">
          <span className="text-slate-600">Good</span>
          <span className="text-slate-900">Notes</span>
        </h2>
      </Link>

      {/* searchbar */}
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      {/* profile info */}
      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </nav>
  );
};
export default Navbar;
