import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/email");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!password.trim() || !confirmPassword.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setLoading(true);

    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/reset-password/${token}`;
      const response = await axios.post(URL, { token, password });

      toast.success(response.data.message || "Password reset successfully!");
      setTimeout(() => navigate("/email"), 3000);
    } catch (error) {
      // Handle errors
      const errorMsg =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMsg);

      // Reset form fields
      setPassword("");
      setConfirmPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-5 bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto">
      <h3 className="text-center mb-4">Reset Your Password</h3>

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">New Password:</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter new password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="text-gray-500 absolute right-2 top-1 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={24} />
              ) : (
                <AiOutlineEye size={24} />
              )}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm new password"
              className="bg-slate-100 px-2 py-1 focus:outline-primary w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="text-gray-500 absolute right-2 top-1 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible size={24} />
              ) : (
                <AiOutlineEye size={24} />
              )}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-semibold text-white leading-relaxed tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Sending mail..." : "Reset Password"}
        </button>
      </form>
    </section>
  );
};

export default ResetPassword;
