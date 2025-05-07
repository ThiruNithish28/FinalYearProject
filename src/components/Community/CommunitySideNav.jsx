import React, { useState } from "react";

import { useCommunityContext } from "../../context/CommunityContext";
import { trendingTags } from "../../util/CommunityUtils";

import ContributerCard from "./ContributerCard";
import Accordian from "../Accordian";
import { Link } from "react-router-dom";
import { AlignJustifyIcon, Home, User2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";

const CommunitySideNav = ({
  isHomePageNav,
  isSideNavOpen,
  setIsSideNavOpen,
}) => {
  const { allCommunities } = useCommunityContext();
  const [isNavHover, setIsNavHover] = useState(false);
  return (
    <div className="relative">
      {/* hamburger icon */}
      {/* close button */}
      <div className="lg:block hidden">
        <button
          onClick={() => setIsSideNavOpen(!isSideNavOpen)}
          className={`fixed top-24 z-40
          ${isSideNavOpen ? "left-[20%]" : "left-4"}
          w-8 h-8 flex items-center justify-center 
          bg-[#262626] rounded-full shadow-md 
          text-gray-300 hover:text-white transition-all duration-300 border border-gray-600`}
        >
          <AlignJustifyIcon size={20} />
        </button>
      </div>

      {/* side nav */}
      <div
        onMouseEnter={() => setIsNavHover(true)}
        onMouseLeave={() => setIsNavHover(false)}
        className={`hidden lg:block fixed z-30 transition-all duration-300 ease-in-out ${
          isSideNavOpen ? "w-[21%] " : "w-4"
        } px-4 h-[calc(100dvh-70px)] overflow-y-scroll ${
          isNavHover ? " visible-scrollbar " : " custom-scrollbar "
        } bg-[#171717]  text-gray-text-80  border-r border-white/10`}
      >
        {/* options */}
        <div>
          <ul className="text-gray-text-80 font-semibold border-b border-gray-text-10 px-6 py-4 mb-4 ">
            <li className="hover:bg-gray-text-10 hover:text-white hover:cursor-pointer  py-2 rounded-md ">
              <Link to={"/community"} className="flex items-center gap-4">
                <Home size={25} />
                <span>Home</span>
              </Link>
            </li>

            <li className="hover:bg-gray-text-10 hover:text-white hover:cursor-pointer py-2 rounded-md">
              <Link to={"/new-chat"} className="flex items-center gap-4">
                <FontAwesomeIcon icon={faRobot} size="lg" />
                <span>AI chat</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* top Community */}

        <div className=" w-full max-w-[300px] border-b border-gray-text-10 px-6  mb-4">
          {allCommunities?.length > 0 && (
            <div className="mb-4">
              <Accordian
                isCommunityList={true}
                title="communities"
                elements={allCommunities}
              />
            </div>
          )}
        </div>

        {/* {top contributer} */}
        {/* <div>
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
        </div> */}

        {/* Trending tag */}
        <div className="w-full max-w-[300px] border-b border-gray-text-10 px-6  mb-4">
          {console.log("trending tags", trendingTags)}
          <Accordian title="trending tags" elements={trendingTags} />
        </div>
      </div>
    </div>
  );
};

export default CommunitySideNav;
