import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setSearch } from "../../redux/slices/SearchSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <nav className="flex max-sm:flex-col lg:flex-row justify-between py-3 px-10 mx-0 mb-4 w-full">
      <div className="max-sm:mx-auto max-sm:mb-4">
        <Link to="/" className="flex flex-row text-2xl font-bold">
          <img className="h-8 w-8 mr-4" src="/logo.svg" /> Pizza Hut
        </Link>
      </div>
      <div>
        <input
          type="text"
          name="search"
          autoComplete="off"
          placeholder="Search here"
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="search"
        />
      </div>
    </nav>
  );
};

export default Navbar;
