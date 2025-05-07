import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useUserChatContext } from "../../context/userChatContext";
import {
  Settings,
  EllipsisVertical,
  UserCircle2,
  SidebarClose,
  SidebarOpen,
  LogOut,
  MessageSquareDiff,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showUserOption, setShowUserOption] = useState(false);
  const { user, profile, signOut } = useAuthContext();
  const { allQuery, setActiveChatId } = useUserChatContext();

  const navigate = useNavigate();

  return (
    <div
      className={`${
        isOpen ? "w-72" : "w-20"
      } p-4 hidden lg:flex flex-col justify-between items-center bg-input-dark transition-all duration-600`}
    >
      <div className="h-[90%] flex flex-col">
        <nav className="flex justify-center items-center">
          <div
            className={` transition-all duration-200 ${
              isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
            } overflow-hidden `}
          >
            <h1 className="font-extrabold text-sky-700 text-2xl mr-3 whitespace-nowrap">
              CodeMastery Hub
            </h1>
          </div>

          <button
            type="button"
            className="text-light-gray"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <SidebarClose /> : <SidebarOpen />}
          </button>
        </nav>

        {/* new chat button */}
        <div
          onClick={() => setActiveChatId(null)}
          className="flex justify-center items-center gap-2 bg-gray-btn text-white p-4 mt-5 rounded-md cursor-pointer "
        >
          <MessageSquareDiff />
          <span className={`capitalize  ${isOpen ? "block" : "hidden"} `}>
            new chat
          </span>
        </div>

        {/* chat history */}
        {isOpen && (
          <div className="w-full mt-9  text-white hover:cursor-pointer">
            {allQuery?.map((chat) => (
              <div
                key={chat.chat_id}
                className="w-full overflow-ellipsis hover:bg-gray-text-30 rounded-md p-2 text-sm font-medium text-light-gray hover:text-white"
                onClick={() => setActiveChatId(chat.chat_id)}
              >
                {chat.title.length > 30
                  ? chat.title.slice(0, 30) + "..."
                  : chat.title}
              </div>
            ))}
          </div>
        )}

        {/* Community button */}
        {isOpen && <div className="mt-auto w-full">
          <Link
            to={"/community"}
            className="flex justify-center items-center gap-2 bg-sky-700 hover:bg-sky-900 hover:cursor-pointer hover:font-bold text-white w-full p-4 mt-5 rounded-md transition-all duration-200 ease-in-out"
          >
            <span className={`capitalize ${isOpen ? "block" : "hidden"}`}>
              Explore Community
            </span>
          </Link>
        </div>}

      </div>

      {/* user info */}
      <div
        className={`w-full h-[10%] mt-5 text-white  items-center ${
          isOpen ? "flex justify-between" : "justify-center"
        } `}
      >
        <div className=" flex items-center justify-center gap-3">
          {/**user icon */}
          {profile?.avatar_url ? (
            <img
              src={profile?.avatar_url}
              alt="user"
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <UserCircle2 />
          )}
          {isOpen && user && (
            <p className="text-[14px] font-medium">
              {user.email.length > 25
                ? user.email.slice(0, 25) + "..."
                : user.email}
            </p>
          )}
          {/**user name */}
        </div>
        <div className="relative flex items-center justify-center">
          <EllipsisVertical
            size={16}
            onClick={() => setShowUserOption(!showUserOption)}
            className="hover:cursor-pointer"
          />
          
            {showUserOption && (
              <div className={`absolute ${isOpen ?"right-[-350%] top-[-400%] ": " "} text-[14px] bg-gray-btn rounded-lg shadow-lg px-4 py-2 r`}>
                <div
                  className="flex items-center gap-2 mb-2 text-light-gray cursor-pointer"
                  onClick={() => signOut()}
                >
                  <LogOut size={14} />{" "}
                  {isOpen && <span className="text-sm">Logout</span>}
                </div>
                <div
                  onClick={() => navigate("/user")}
                  className="flex items-center gap-2 text-light-gray cursor-pointer"
                >
                  <Settings size={14} />{" "}
                  {isOpen && <span className="text-sm">Settings</span>}
                </div>
              </div>
            )}
          
        </div>
      </div>
    </div>
  );
};

export default SideNav;
