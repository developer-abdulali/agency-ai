import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { PiUserCircle } from "react-icons/pi";

const Forgotpassword = () => {
  const [loading, setLoading] = useState(false);
  const [emailAdd, setEmailAdd] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!emailAdd.trim()) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);

    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/forgot-password`;
      const response = await axios.post(URL, {
        email: emailAdd,
      });

      toast.success(response.data.message || "Reset email sent successfully!");
      setEmailAdd("");

      // Optionally redirect after a few seconds
      setTimeout(() => navigate("/email"), 2000);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-5 bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto">
      <div className="w-fit mx-auto mb-2">
        <PiUserCircle size={80} />
      </div>

      <h3>Enter email to reset password!</h3>

      <form className="grid gap-4 mt-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="bg-slate-100 px-2 py-1 focus:outline-primary"
            value={emailAdd}
            onChange={(e) => setEmailAdd(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-semibold text-white leading-relaxed tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Reseting Password..." : "Reset Password"}
        </button>
      </form>

      <p className="my-3 text-center">
        Remember Password?{" "}
        <Link to={"/email"} className="hover:text-primary font-semibold">
          Login
        </Link>
      </p>
    </section>
  );
};

export default Forgotpassword;
