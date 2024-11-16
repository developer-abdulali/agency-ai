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

    // Signup API
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/signup",
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
    }
  };

  // Redirect to home page if user is already logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  });

  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleSignup}>
          <h4 className="text-2xl mb-7">Sign Up</h4>

          <input
            type="text"
            placeholder="Name"
            className="input-box"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Email"
            className="input-box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

          <button type="submit" className="btn-primary">
            SIGNUP
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-medium text-[#2B85FF] underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
