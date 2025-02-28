import { useState } from "react";
import { UseAuthContext } from "../util/context/AuthContext";
import { User, SidebarClose, LogOut } from "lucide-react";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { currentUser, logOut } = UseAuthContext();

  return (
    <div
      className={`${
        isOpen ? "w-80" : "w-20"
      } p-4 flex flex-col justify-between items-center bg-input-dark transition-all duration-600`}
    >
      <nav className="flex items-center">
        <div
          className={` transition-all duration-300 ${
            isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
          } overflow-hidden `}
        >
          <h1 className="font-extrabold text-sky-700 text-2xl mr-3 whitespace-nowrap">
            CodeMastery Hub
          </h1>
        </div>

        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          <SidebarClose  color="white" />
        </button>
      </nav>

      {/* user info */}
      <div className="w-full text-white flex items-center justify-between">
        <div className=" flex items-center gap-1">
          <User />
          {isOpen && currentUser && currentUser.email}
        </div>
        {isOpen && (

            <LogOut  onClick={()=>logOut()}/>
        )}
      </div>
    </div>
  );
};

export default SideNav;
