import React from "react";
import ContributerCard from "./ContributerCard";
import { User2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCommunityContext } from "../../context/CommunityContext";
import { formatTimeStamp } from "../../util/helper";
import { CalendarClock } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CommunitySideNav = ({
  isHomePageNav,
  communityName,
  desc,
  createdAt,
  members,
  topContributors,
  trendingTags,
}) => {
  const { allCommunities } = useCommunityContext();
  return (
    <div
      className={`hidden lg:block sticky top-0 z-30 ${
        isHomePageNav ? "w-[23dvw]" : "w-[30dvw] "
      } h-fit bg-[#171717]  text-white p-4 mt-4 rounded-sm`}
    >
      {isHomePageNav ? (
        <div>
          {/* top Community */}
          <h2 className="text-lg font-bold capitalize">communities</h2>
          {allCommunities?.length > 0 && (
            <div className="mb-4">
              {allCommunities.map((community, index) => (
                <Link
                  key={index}
                  className="flex items-center gap-2 hover:bg-sky-800 hover:cursor-pointer p-2 rounded-md mb-2"
                  to={`/community/${community.name.replace(/ /g, "-")}`}
                >
                  {community.dp ? (
                    <div className="w-9 h-9 bg-gray-text-30 rounded-full overflow-hidden flex items-center justify-center">
                      <img src={community.dp} alt="community-dp" />
                    </div>
                  ) : (
                    <div className="w-9 h-9 bg-gray-text-30 rounded-full overflow-hidden flex items-center justify-center">
                      <User2 />
                    </div>
                  )}
                  <div>
                    <h2 className="capitalize ">{community.name}</h2>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-2">{communityName}</h2>
          <p className="text-gray-text-40 mb-2">{desc}</p>
          <p className="text-gray-text-40 mb-2">
            <CalendarClock className="inline mr-1.5" size={18}/>
            <span>
              Created on {formatTimeStamp(createdAt)}
            </span>
          </p>
          <div>
            <p className="flex flex-col">
              {members}
              <span className="text-gray-text-40">members</span>
            </p>
          </div>
        </div>
      )}
      <div>
        {/* {top contributer} */}
        <h2 className="text-lg font-bold">Top Contributors</h2>
        {topContributors &&
          topContributors.map((contributer, index) => (
            <ContributerCard
              key={index}
              dp={contributer.Dp}
              name={contributer.name}
              points={contributer.points}
            />
          ))}
      </div>
      {/* Trending tag */}
      <div>
        <h2 className="text-lg font-bold">Trending Tags</h2>
        <div className="flex flex-wrap gap-2">
          <span className="bg-gray-700 text-white px-2 py-1 rounded-md">
            #React
          </span>
          <span className="bg-gray-700 text-white px-2 py-1 rounded-md">
            #JavaScript
          </span>
          <span className="bg-gray-700 text-white px-2 py-1 rounded-md">
            #CSS
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommunitySideNav;
