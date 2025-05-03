import React, { useState } from "react";
import {
  Bell,
  Plus,
  User2,
  Settings,
  SearchIcon,
  LucideLogOut,
} from "lucide-react";
import NavLinks from "../NavLinks";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const CommunityNav = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userDp = useAuthContext().profile?.avatar_url; // Assuming you have a user object with an avatar_url property

  const userMenuItems = [
    {
      name: "view profile",
      icon: userDp ? (
        <img src={userDp} alt="User Avatar" className="user-avatar w-8 h-8 rounded-full" />
      ) : (
        <User2 className="user-avatar" />
      ),
    },
    { name: "settings", icon: <Settings /> },
    { name: "logout", icon: <LucideLogOut /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#171717] text-white  flex items-center justify-between px-10 py-4">
      {/* logo */}
      <div className="flex gap-2 items-center">
        <h1 id="logo" className="font-extrabold text-sky-700 text-2xl">
          CodeMastery Hub
        </h1>
        <div className="h-fit bg-gray-text-30 rounded-4xl  flex items-center ml-4 p-2">
          <input
            type="text"
            placeholder="Search..."
            className="search-bar focus:outline-none "
          />
          <button className="search-button">
            <SearchIcon />
          </button>
        </div>
      </div>
      {/* nav actions */}
      <div>
        <ul className="flex gap-6 items-center">
          <li className="flex items-center  bg-gray-text-30 hover:bg-sky-700 hover:cursor-pointer rounded-4xl px-2 py-1">
            <Plus />
            <Link to={"/community/create-post"}>create</Link>
          </li>
          <li>
            <Bell />
          </li>
          <li
            className="hover:cursor-pointer"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            {userDp ? (
              <img src={userDp} alt="User Avatar" className="user-avatar w-8 h-8 rounded-full" />
            ) : (
              <div className="rounded-full bg-gray-text-30 w-8 h-8 flex items-center justify-center">
                {/* Placeholder for user avatar */}
                <User2 className="user-avatar" />
              </div>
            )}
          </li>
        </ul>
      </div>
      {/* user menu */}
      {isUserMenuOpen && userMenuItems.length > 0 && (
        <div className="absolute right-3 top-[74px] bg-[#171717] rounded-lg shadow-lg p-4 z-10">
          <NavLinks links={userMenuItems} hasIcon={true} />
        </div>
      )}
    </nav>
  );
};

export default CommunityNav;
