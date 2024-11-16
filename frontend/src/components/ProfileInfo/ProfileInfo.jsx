import { LogOut } from "lucide-react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    <div className="border-t border-gray-200">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {userInfo && (
          <div className="flex flex-col md:flex-row md:items-center ">
            <div className="flex items-center space-x-3 px-3 py-2">
              <div className="w-10 h-10 flex items-center justify-center rounded-full text-slate-950 bg-slate-100 font-medium">
                {getInitials(userInfo?.username)}
              </div>

              <span className="text-sm font-medium text-gray-700">
                {userInfo.username}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-3 w-full px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProfileInfo;
