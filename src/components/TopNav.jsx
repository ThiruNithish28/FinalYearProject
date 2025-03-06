
import { UseAuthContext } from "../util/context/AuthContext";
import { Clock, PenBoxIcon } from "lucide-react";
import {  useNavigate } from "react-router-dom";
const TopNav = ({date, chatHeading}) => {
    const { currentUser } = UseAuthContext();
    const navigate = useNavigate();
  return (
    <nav className="sticky top-0 w-full h-2 p-4 border border-input-dark bg-[#171717] text-white flex justify-around items-center ">
      <div className="hidden lg:flex items-center gap-2">
        <div >{currentUser.email.split("@")[0]}</div>
        <div className="flex items-center text-light-gray">
          <Clock size={15} className="mr-2" />
          {date}
        </div>
      </div>
      <button className="lg:hidden" onClick={() => navigate("/new-chat")}>
        <PenBoxIcon size={20} />
      </button>

      <div>
        {chatHeading}
      </div>

      <div>
        
      </div>
    </nav>
  );
};
export default TopNav;