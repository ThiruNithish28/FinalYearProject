import React, { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function Accordian({ isCommunityList, title, elements, icon }) {
  const [isCollapse, setIsCollaspe] = useState(false);
  return (
    <div>
      <div className="w-full flex justify-between mb-2">
        <h2 className="text-sm font-semibold text-gray-text-50 uppercase">
          {title}
        </h2>

        <button
          onClick={() => setIsCollaspe(!isCollapse)}
          className="text-white hover:cursor-pointer"
        >
          {isCollapse ? <ChevronDown /> : <ChevronUp />}
        </button>
      </div>
      {!isCollapse && (
        <>
          {elements && elements.length > 0 && isCommunityList ? (
            <ul>
              <li className="text-gray-text-70 flex items-center space-x-2 hover:bg-gray-text-10 hover:cursor-pointer rounded-md px-2 py-1 mb-2">
                <Plus />
                <span>create a community</span>
              </li>
              {elements.map((community, index) => (
                <Link
                  key={index}
                  className="flex items-center justify-between hover:bg-gray-text-10 hover:cursor-pointer rounded-md mb-2 "
                  to={`/community/${community.name.replace(/ /g, "-")}`}
                >
                  <div className="flex items-center gap-2 ">
                    {community.avatar_url ? (
                      <div className="w-8 h-8 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src={community.avatar_url} alt="community-dp" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-gray-text-30 rounded-full overflow-hidden flex items-center justify-center">
                        <User2 />
                      </div>
                    )}
                    <div>
                      <h2 className="capitalize text-gray-text-80 ">
                        {community.name}
                      </h2>
                    </div>
                  </div>
                  <Star size={15} className="text-gray-text-80" />
                </Link>
              ))}
            </ul>
          ) : (
            <ul className="text-gray-text-70" >
              {elements?.map((element, index) => (
                <li key={index} className="py-1 hover:bg-gray-text-10 hover:cursor-pointer rounded-md mb-1">
                  <Link to={`/community/tags/${element}`}>
                  #{element}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
