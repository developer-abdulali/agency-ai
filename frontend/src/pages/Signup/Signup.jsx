import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import PasswordInput from "../../components/Input/PasswordInput/PasswordInput";
import { validateEmail } from "../../utils/helper";
import { useSelector } from "react-redux";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      toast.error("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter a password");
      toast.error("Please enter a password");
      return;
    }

    setError("");

    // Set loading to true when the signup process begins
    try {
      setLoading(true); // Start loading

      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/auth/signup`,
        {
          username: name,
          email,
          password,
        },
        { withCredentials: true }
      );

      if (!res.data.success) {
        setError(res.data.message);
        toast.error(res.data.message || "Signup failed");
        return;
      }

      // If signup is successful
      toast.success("Signup successful");
      navigate("/login");
    } catch (error) {
      // Handle error response
      const errorMessage =
        error.response?.data?.message || "An error occurred during signup";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
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
        <form onSubmit={handleSignup}>
          <h4 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Sign Up
          </h4>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            disabled={loading}
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
