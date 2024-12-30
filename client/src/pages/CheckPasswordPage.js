import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Avatar from "../components/Avatar";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/userSlice";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const CheckPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    password: "",
    userId: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!location?.state?.name) {
      navigate("/email");
    }
  }, [location, navigate]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/password`;

    try {
      const response = await axios.post(
        URL,
        {
          userId: location?.state?._id,
          password: data.password,
        },
        { withCredentials: true }
      );

      toast.success(response.data.message);

      if (response.data.success) {
        dispatch(setToken(response?.data?.token));
        localStorage.setItem("token", response?.data?.token);

        setData({ password: "" });
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-5 bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto">
      <div className="w-fit mx-auto mb-2 flex justify-center items-center flex-col">
        <Avatar
          width={70}
          height={70}
          name={location?.state?.name}
          imageUrl={location?.state?.profile_pic}
        />
        <h2 className="font-semibold text-lg mt-1">{location?.state?.name}</h2>
      </div>

      <form className="grid gap-4 mt-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password :</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              className="bg-slate-100 px-3 py-2 focus:outline-primary w-full rounded"
              value={data.password}
              onChange={handleOnChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={24} />
              ) : (
                <AiOutlineEye size={24} />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-lg px-4 py-2 hover:bg-secondary rounded mt-4 font-semibold text-white leading-relaxed tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="my-3 text-center">
        <Link
          to={"/forgot-password"}
          className="hover:text-primary font-semibold"
        >
          Forgot password?
        </Link>
      </p>
    </section>
  );
};

export default CheckPasswordPage;
