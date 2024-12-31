import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../helpers/uploadFile";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const RegisterPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });
  const [uploadPhoto, setUploadPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadPhoto = async (e) => {
    setUploadLoading(true);
    const file = e.target.files[0];

    const uploadPhoto = await uploadFile(file);

    setUploadPhoto(file);
    setUploadLoading(false);

    setData((preve) => {
      return {
        ...preve,
        profile_pic: uploadPhoto?.url,
      };
    });
  };
  const handleClearUploadPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setLoading(true);

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`;

    try {
      const response = await axios.post(URL, data);

      toast.success(response.data.message);

      if (response.data.success) {
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: "",
        });

        navigate("/email");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-5 bg-white w-full max-w-md rounded overflow-hidden p-4 mx-auto">
      <h3>Welcome to Chat app!</h3>

      <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            className="bg-slate-100 px-2 py-1 focus:outline-primary"
            value={data.name}
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="bg-slate-100 px-2 py-1 focus:outline-primary"
            value={data.email}
            onChange={handleOnChange}
            required
          />
        </div>

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

        <div className="flex flex-col gap-1">
          <label htmlFor="profile_pic">
            Photo :
            <div className="h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer">
              {uploadLoading ? (
                "Uplading..."
              ) : (
                <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                  {uploadPhoto?.name
                    ? uploadPhoto?.name
                    : "Upload profile photo"}
                </p>
              )}
              {uploadPhoto?.name && !uploadLoading && (
                <button
                  className="text-lg ml-2 hover:text-red-600"
                  onClick={handleClearUploadPhoto}
                >
                  <IoClose />
                </button>
              )}
            </div>
          </label>

          <input
            type="file"
            id="profile_pic"
            name="profile_pic"
            disabled={uploadLoading}
            className="bg-slate-100 px-2 py-1 focus:outline-primary hidden"
            onChange={handleUploadPhoto}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-semibold text-white leading-relaxed tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="my-3 text-center">
        Already have account ?{" "}
        <Link to={"/email"} className="hover:text-primary font-semibold">
          Login
        </Link>
      </p>
    </section>
  );
};

export default RegisterPage;
