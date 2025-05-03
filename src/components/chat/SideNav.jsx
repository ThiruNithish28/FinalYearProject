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
  PlusCircle,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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
      <div>
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
          {isOpen ? <Plus /> : <PlusCircle />}
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
                className="w-full my-2  overflow-ellipsis"
                onClick={() => setActiveChatId(chat.chat_id)}
              >
                {chat.title.length > 30
                  ? chat.title.slice(0, 30) + "..."
                  : chat.title}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* user info */}
      <div
        className={`w-full text-white  items-center ${
          isOpen ? "flex justify-between" : "justify-center"
        } `}
      >
        <div className=" flex items-center gap-3">
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
              {user.email.length > 20
                ? user.email.slice(0, 20) + "..."
                : user.email}
            </p>
          )}
          {/**user name */}
        </div>
        <div className="relative flex items-center gap-2 ">
          <EllipsisVertical
            size={16}
            onClick={() => setShowUserOption(!showUserOption)}
            className="hover:cursor-pointer"
          />
          <div>
            {showUserOption && (
              <div className="absolute right-[-350%] top-[-400%] text-[14px] bg-gray-btn rounded-lg shadow-lg px-4 py-2 r">
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
    </div>
  );
};

export default SideNav;
