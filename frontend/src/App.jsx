// import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
// import Home from "./pages/Home/Home";
// import Signup from "./pages/Signup/Signup";
// import Login from "./pages/Login/Login";
// import Navbar from "./components/Navbar/Navbar";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";

// const App = () => {
//   const navigate = useNavigate();
//   const { currentUser, loading, errorDispatch } = useSelector(
//     (state) => state.user
//   );
//   const [userInfo, setUserInfo] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     if (currentUser === null) {
//       navigate("/login");
//     } else {
//       setUserInfo(currentUser?.rest);
//     }
//   });

//   return (
//     <BrowserRouter>
//       <Navbar userInfo={userInfo} />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="*" element={<h1>Page not found</h1>} />
//       </Routes>
//     </BrowserRouter>
//   );
// };
// export default App;

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  const showNavbar =
    location.pathname !== "/login" && location.pathname !== "/signup";

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    } else {
      setUserInfo(currentUser?.user);
    }
  }, [currentUser]);

  return (
    <>
      <ToastContainer />
      {showNavbar && <Navbar userInfo={userInfo} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </>
  );
};

export default App;
