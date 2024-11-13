import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <section className="w-40 sm:w-60 md:w-80 flex items-center rounded-md px-4 bg-slate-100">
      <input
        type="text"
        placeholder="Search Notes..."
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
        onClick={handleSearch}
      />
      {value && (
        <IoMdClose
          onClick={onClearSearch}
          className="text-slate-500 text-xl cursor-auto hover:text-black mr-3"
        />
      )}

      <FaMagnifyingGlass className="text-slate-500 text-xl cursor-pointer hover:text-black mr-3" />
    </section>
  );
};
export default SearchBar;
