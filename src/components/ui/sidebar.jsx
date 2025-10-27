import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Building,
  Database,
  Notebook,
  UserSearch,
  Save,
  Unlock,
  X,
  ChevronDown,
  ChevronUp,
  Power,
  HandCoins,
  NotepadText,
} from "lucide-react";
import { useSelector } from "react-redux";

const SidebarContent = ({ isCollapsed, mobileVisible, onCloseMobile }) => {
  const location = useLocation();
  const [databaseOpen, setDatabaseOpen] = useState(false);
  const showFull = !isCollapsed;


  const { employer } = useSelector((state) => state.getDataReducer);
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Dashboard",
      icon: <Building size={20} color="#0784C9" />,
      route: "/employerHome/Jobs",
    },
    { label: "Campaign", icon: <Database size={20} color="#0784C9" /> ,route:"/Dashboard/Campaign"},
    
    {
      label: "IP Listing",
      icon: <HandCoins size={20} color="#0784C9" />,
      route: "/Dashboard/IpListings",
    },
    {
      label: "Ana   lytics",
      icon: <HandCoins size={20} color="#0784C9" />,
      route: "/Dashboard/analytics",
    },
    {
      label: "Report",
      icon: <NotepadText size={20} color="#0784C9" />,
      
    },
    {
      label: "Pricing",
      icon: <HandCoins size={20} color="#0784C9" />,
      route: "/employerHome/credits",
    },
  ];

  const databaseSubItems = [
    {
      label: "Click Logs",
      route: "/Dashboard/clickLogs",
    },
    {
      label: "Stats Overview", 
      route: "/employerHome/SavedSearch",
    },
    {
      label: "Tracking",
      route: "/employerHome/UnlockedCandidates",
    },
    {
      label: "Group By Stats",
      route: "/employerHome/UnlockedCandidates",
    },
    {
      label: "Cost Management",
      route: "/employerHome/UnlockedCandidates",
    },
    {
      label: "Campaign Timeline",
      route: "/employerHome/UnlockedCandidates",
    },
    {
      label: "Delete Campaigns",
      route: "/employerHome/UnlockedCandidates",
    },
  ];

  const handleNavigate = (route) => {
    navigate(route);
    if (mobileVisible) onCloseMobile(); // auto-close sidebar on mobile
  };

  const logout = () => {
    localStorage.removeItem("TokenId");
    localStorage.removeItem("User");
    navigate("/");
  };

  const isDatabaseActive = databaseSubItems.some(
    (sub) => location.pathname === sub.route
  );

  return (
    <div
      className={`h-full flex flex-col py-4 px-2 bg-[#0F172B] ${
        isCollapsed ? "w-16" : "w-60"
      } transition-all duration-500 ease-in-out`}
    >
      {/* Logo & Avatar */}
      <div
        className={`px-2 mb-4 flex items-center ${
          showFull ? "gap-3" : "justify-center"
        }`}
      >
        {employer?.company?.logoUrl ? (
          <img
            src={employer?.company.logoUrl}
            alt="Logo"
            className="w-8 h-8 rounded-[8px] object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-[8px] bg-green-500 text-white flex items-center justify-center text-sm font-semibold">
            {employer?.company?.companyName.charAt(0).toUpperCase()}
          </div>
        )}
        {showFull && (
          <h1 className="text-14 font-semibold">
            {employer?.company?.companyName}
          </h1>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 ">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.route;
          const isDatabase = item.label === "Report";
          const isItemActive = isActive || (isDatabase && isDatabaseActive);

          return (
            <div key={index}>
              <div
                id={item.label}
                onClick={() => {
                  if (isDatabase) {
                    setDatabaseOpen(!databaseOpen);
                  } else if (item.route) {
                    handleNavigate(item.route);
                  }
                }}
                className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors  ${
                  isItemActive
                    ? "bg-light text-gray-700"
                    : "text-white-700 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`${
                      isItemActive ? "text-gray-700" : "text-gray-600"
                    }`}
                  >
                    {item.icon}
                  </span>
                  {showFull && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </div>
                {isDatabase && showFull && (
                  <span className="text-gray-400">
                    {databaseOpen ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </span>
                )}
              </div>

              {/* Submenu */}
              {isDatabase && (
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    databaseOpen && showFull ? "max-h-96 mt-1" : "max-h-0"
                  }`}
                >
                  <div className="ml-6 flex flex-col gap-1">
                    {databaseSubItems.map((sub, subIndex) => {
                      const isSubActive = location.pathname === sub.route;
                      return (
                        <div
                          key={subIndex}
                          onClick={() => handleNavigate(sub.route)}
                          className={`flex items-center gap-2 px-2 py-1 rounded-md text-sm cursor-pointer transition-colors ${
                            isSubActive
                              ? "bg-light text-gray-700"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {sub.icon}
                          <span>{sub.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>
      {/* logout button */}
      <div className="border-t-[2px] w-full h-[10vh] mt-auto flex justify-center items-center ">
        <div
          onClick={logout}
          className={`flex items-center ${
            showFull ? "gap-3" : "justify-center"
          } cursor-pointer`}
        >
          <Power size={28} className="text-white bg-red-500 rounded-full p-1" />
          {showFull && (
            <p className="text-16 font-semibold text-grey-800">Sign Out</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ collapsed, mobileVisible, onCloseMobile }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className="hidden md:block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={`h-[93vh] mt-[-8vh] bg-white shadow-md ${
            collapsed && !hovered ? "w-16" : "w-60"
          } transition-[width] duration-500 ease-in-out`}
        >
          <div className="h-full flex mt-[8vh] flex-col justify-end">
            <SidebarContent isCollapsed={collapsed && !hovered} mobileVisible={mobileVisible} onCloseMobile={onCloseMobile} />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {mobileVisible && (
        <div className="absolute inset-0 z-50 flex md:hidden">
          <div className="w-60 bg-white shadow-lg h-[95vh] py-4 overflow-hidden">
            <div className="flex justify-end pr-4">
              <X
                className="cursor-pointer text-gray-600"
                onClick={onCloseMobile}
              />
            </div>
            <div className="h-full flex flex-col justify-end">
              <SidebarContent isCollapsed={false} />
            </div>
          </div>
          {/* <div className="flex-1 bg-black bg-opacity-50" onClick={onCloseMobile} /> */}
        </div>
      )}
    </>
  );
};

export default Sidebar;
