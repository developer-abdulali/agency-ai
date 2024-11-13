import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ onLogout }) => {
  return (
    <section className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 bg-slate-100 font-medium">
        {getInitials("Abdul Ali")}
      </div>

      <div>
        <p className="textsm font-medium">Abdul</p>
      </div>

      <button
        onClick={onLogout}
        className="text-sm bg-red-500 p-1 rounded-md text-white hover:opacity-80"
      >
        Logout
      </button>
    </section>
  );
};
export default ProfileInfo;
