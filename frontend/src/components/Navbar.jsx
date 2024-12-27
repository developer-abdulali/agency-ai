import { useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend-assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav>
      <div className="w-full flex items-center justify-between font-semibold">
        <div className="flex items-center gap-2">
          <img
            onClick={() => navigate(-1)}
            src={assets.arrow_left}
            alt="arrow_left"
            className="w-8 bg-black p-2 cursor-pointer rounded-full"
          />
          <img
            onClick={() => navigate(1)}
            src={assets.arrow_right}
            alt="arrow_right"
            className="w-8 bg-black p-2 cursor-pointer rounded-full"
          />
        </div>

        <div className="flex items-center gap-4">
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
            Explore Premium
          </p>
          <p className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer">
            Install App
          </p>
          {/* username */}
          <p className="bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center">
            D
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <p className="bg-white text-black px-4 py-1 rounded-2xl cursor-pointer">
          All
        </p>
        <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer">Music</p>
        <p className="bg-black px-4 py-1 rounded-2xl cursor-pointer">
          Podcasts
        </p>
      </div>
    </nav>
  );
};
export default Navbar;
