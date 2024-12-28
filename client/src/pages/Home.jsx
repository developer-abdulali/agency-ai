import { useEffect } from "react";
import {
  logoutUser,
  setOnlineUser,
  setSocketConnection,
  setUser,
} from "../redux/userSlice";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Logo from "../assets/logo.png";
import io from "socket.io-client";

const Home = () => {
  // const user = useSelector((state) => state.user);

  const location = useLocation();
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

  // socket.io connection
  useEffect(() => {
    const socketConnection = io(process.env.REACT_APP_BACKEND_URL, {
      auth: { token: localStorage.getItem("token") },
    });

    socketConnection.on("onlineUser", (data) => {
      dispatch(setOnlineUser(data));
    });

    dispatch(setSocketConnection(socketConnection));

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const basePath = location.pathname === "/";
  return (
    <div className="grid lg:grid-cols-[320px,1fr] h-screen max-h-screen">
      {/* sidebar */}
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sidebar />
      </section>

      {/* message component */}
      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>

      <section
        className={`${
          !basePath ? "hidden" : "lg:flex"
        } flex-col items-center justify-center gap-2 hidden`}
      >
        <img src={Logo} alt="logo" width={250} />

        <p className="text-lg mt-2 text-slate-500">
          Select user to send message
        </p>
      </section>
    </div>
  );
};
export default Home;
