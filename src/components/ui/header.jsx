import {
  Menu,
  HelpCircle,
  HandCoins,
  DatabaseIcon,
  LogOut,
  User
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProfile } from "../../redux/getData";
import { signOutApi } from "../../api/Apis";
import {apiFunction} from "../../api/ApiFunction";

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [showProfileModal, setShowProfileModal] = useState(false);
  const avatarRef = useRef(null);

const user = JSON.parse(localStorage.getItem('user') || "{}");


  // const { profile } = useSelector((state) => state.getDataReducer);

  // useEffect(() => {
  //   dispatch(fetchProfile());
  // }, [dispatch]);




  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setShowProfileModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async() => {
    // TODO: Implement your logout API or logic here
    // e.g., clear tokens from localStorage, Redux, etc.
    const response = await apiFunction("get", signOutApi, null, null);
    if(response){
      console.log(response)  
      localStorage.removeItem("user")
      localStorage.removeItem("token");
      navigate("/")
    }
  };

  return (
    <>
      <header className="w-full flex items-center justify-between bg-black px-6 py-3 shadow-sm relative">
        {/* Left: Logo and Menu */}
        <div className="flex items-center gap-4">
          <Menu
            className="w-6 h-6 text-white cursor-pointer"
            onClick={onMenuClick}
          />
          <span className="text-white font-medium">Cloaker</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center md:gap-6 gap-3 relative">
          <div
            id="credit"
            className="flex items-center md:gap-3 gap-1 text-sm text-gray-400 font-medium cursor-pointer"
          >
            <HandCoins className="w-5 h-5 text-white" />
            <DatabaseIcon className="w-5 h-5 text-white" />
          </div>

          <div
            onClick={() => navigate("/contact-us")}
            className="flex items-center gap-2 text-sm text-gray-400 font-medium cursor-pointer"
          >
            <HelpCircle className="w-5 h-5 text-white" />
            <span className="hidden md:flex text-white">Support</span>
          </div>

          {/* Profile Avatar */}
          <div className="relative" ref={avatarRef}>
          <div
            onClick={() => setShowProfileModal(!showProfileModal)}
            className="cursor-pointer"
          >
            {user?.image ? (
              <img
                src={user.image}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold text-sm">
                {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
                
              </div>
            )}
          </div>

            {/* Profile Dropdown */}
            {showProfileModal && (
              <div className="absolute right-0 mt-2 w-40 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1">
                  <button
                    onClick={() => navigate("/my-profile")}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                  >
                    <User className="w-4 h-4 mr-2" /> My Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
