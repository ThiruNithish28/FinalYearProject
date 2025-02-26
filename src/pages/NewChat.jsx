import { useState } from "react";
import SideNav from "../components/SideNav";
import {CircleFadingArrowUp }from 'lucide-react';

const NewChat = () => {
  const [query, setQuery] = useState("");
  return (
    <div className="flex bg-dark-gray-background h-[100vh]">
      <SideNav />
      <div className="w-full min-h-screen text-white flex flex-col items-center justify-center">
        <h2 className=" text-5xl font-extrabold mb-5"> what can i help you ?</h2>

        <div className="w-[560px] p-2 rounded-xl flex border border-gray-border bg-gray-btn">
          <input
            name="query"
            value={query}
            onChange={(e)=> setQuery(e.target.value)}
            placeholder="Ask your doubt..."
            className="p-4 w-full focus:outline-none focus:ring-0"
          />
          <button className="flex items-end">
            <CircleFadingArrowUp size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default NewChat;
