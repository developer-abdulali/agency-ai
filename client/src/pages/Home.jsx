import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logoutUser, setUser } from "../redux/userSlice";
import Sidebar from "../components/Sidebar";

const Home = () => {
  // const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`;
      const response = await axios({
        url: URL,
        withCredentials: true,
      });

      dispatch(setUser(response.data.data));

      if (response.data.data.logout) {
        dispatch(logoutUser());
        navigate("/login");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <div className="grid lg:grid-cols-[320px,1fr] h-screen max-h-screen">
      <section className="bg-white">
        <Sidebar />
      </section>
      <section>
        <Outlet />
      </section>
    </div>
  );
};
export default Home;
