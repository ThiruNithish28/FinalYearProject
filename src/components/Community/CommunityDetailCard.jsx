import { CalendarClock } from "lucide-react";
import React from "react";
import { topTags } from "../../util/CommunityUtils";
import { formatTimeStamp } from "../../util/helper";

const CommunityDetailCard = ({ communityName, desc, members, createdAt }) => {
  return (
    <div className="bg-[#171717] p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-2">{communityName}</h2>
      <p className="text-gray-text-40 mb-2">{desc}</p>
      <p className="text-gray-text-40 mb-2">
        <CalendarClock className="inline mr-1.5" size={18} />
        <span>Created on {formatTimeStamp(createdAt)}</span>
      </p>
      <div>
        <p className="flex flex-col">
          {members || 10}
          <span className="text-gray-text-40">members</span>
        </p>
      </div>

      {/* top tags */}
      <div className="mt-2 pt-2 border-t border-gray-text-20">
        <h2 className="uppercase text-sm text-gray-text-60 font-semibold mb-2">top tags</h2>
        <ul className="flex gap-2 flex-wrap ">
          {topTags
            ?.find((t) => t.name === communityName?.toLowerCase().trim())
            ?.tags?.map((tag, index) => (
              <li key={index}
              className="bg-gray-text-20 text-gray-text-80 text-sm rounded-full px-3 py-1"
              >#{tag}</li>
            ))}
        </ul>
      </div>
      
      {/* resourcse   */}
    </div>
  );
};

export default CommunityDetailCard;
