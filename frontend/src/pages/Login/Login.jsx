import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import PasswordInput from "../../components/Input/PasswordInput/PasswordInput";
import { validateEmail } from "../../utils/helper";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      return;
    }

    setError("");

    // Login API
    try {
      dispatch(signInStart());
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/signin`,
        { email, password },
        { withCredentials: true }
      );

      // Check if login failed on the server side
      if (!res.data.success) {
        toast.error(res.data.message || "Login failed");
        dispatch(signInFailure(res.data.message || "Login failed"));
        return;
      }

      // Login successful
      toast.success("Login successful!");
      dispatch(signInSuccess(res.data));
      navigate("/");
    } catch (error) {
      // Handle error response from Axios
      const errorMessage =
        error.response?.data?.message || "An error occurred during login";
      toast.error(errorMessage);
      dispatch(signInFailure(errorMessage));
    }
  };

  // Redirect to home page if user is already logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg px-8 py-10">
        <form onSubmit={handleLogin}>
          <h4 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Login
          </h4>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm pb-2">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Not registered yet?{" "}
            <Link to="/signup" className="text-blue-600 font-medium underline">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
