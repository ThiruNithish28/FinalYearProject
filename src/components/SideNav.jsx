import { ArrowRightFromLine } from "lucide-react";
import { useState } from "react";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`${isOpen ? "w-80" : "w-20"} p-4 bg-input-dark transition-all duration-600`}>
      <div className="flex items-center gap-5">
        <div className={` transition-all duration-300 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"} overflow-hidden `}>
            <h1 className="font-extrabold text-sky-700 text-2xl whitespace-nowrap">
            CodeMastery Hub
          </h1>
        </div>
            
    
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          <ArrowRightFromLine size={30} color="white" />
        </button>
      </div>
        
    </div>
  );
};

export default SideNav;
