import {
  Menu,
  HelpCircle,
  Database,
  CoinsIcon,
  HandCoins,
  DatabaseIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProfile } from "../../redux/getData";

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [showProfileModal, setShowprofileModal] = useState(false);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile());
   
  }, [dispatch]);

  const { profile} = useSelector(
    (state) => state.getDataReducer
  );

  const avatarRef = useRef();

  console.log(profile)

  return (
    <>
      <header className="w-full flex items-center justify-between bg-black px-6 py-3  shadow-sm">
        {/* Left: Logo and Menu */}
        <div className="flex items-center gap-4">
          <Menu
            className="w-6 h-6 text-gray-700 cursor-pointer text-white"
            onClick={onMenuClick}
          />
          {/* <img
            id="image"
            src="/unigrowLogo.png"
            alt="Unigrow"
            className="w-20 h-8"
          /> */}
          <span className="text-white">Cloaker</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center md:gap-6 gap-3">
          <div
            id="credit"
            className="flex items-center md:gap-3 gap-1 text-sm text-gray-700 font-medium cursor-pointer"
          >
            <div className="flex flex-row md:gap-2 gap-1">
              <HandCoins className="w-5 h-5 text-gray-600 text-white" />
              
            </div>

            <div className="flex flex-row md:gap-2 gap-1">
              <DatabaseIcon className="w-5 h-5 text-gray-600 text-white" />
             
            </div>
          </div>
          <div
            onClick={() => navigate("/contact-us")}
            className="flex items-center gap-2 text-sm text-gray-700 font-medium cursor-pointer"
          >
            <HelpCircle className="w-5 h-5 text-gray-600 text-white" />
            <span className="hidden md:flex text-white">Support</span>
          </div>
          {/* Avatar circle */}
          <div
            id="profile"
            ref={avatarRef}
            onClick={() => setShowprofileModal(!showProfileModal)}
          >
            {profile?.image ? (
              <img
                src={profile?.image}
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold cursor-pointer"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold text-sm cursor-pointer">
                {profile?.name ? profile.name.charAt(0).toUpperCase() : ""}
              </div>
            )}
          </div>
        </div>

    
     
      </header>
    </>
  );
};

export default Header;
