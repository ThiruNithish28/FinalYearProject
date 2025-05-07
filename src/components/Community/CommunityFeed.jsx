import React, { useState } from "react";
import TabSwitcher from "../chat/TabSwitcher";
import PostCard from "./Post/PostCard";

const CommunityFeed = ({ isHomePage,  isSideNavOpen, posts ,communityName}) => {
  const tabs = [
    { label: "All", id: "all" },
    { label: "Articles", id: "article" },
    { label: "Roadmap", id: "roadmap" },
    { label: "Q/A", id: "q/a" },
    { label: "Tips", id: "tips" },
  ];
  const [activeTab, setActiveTab] = useState("all");
  return (
    <div
      className={` ${
        isSideNavOpen ? "lg:w-[65%] lg:ml-[23%]" : isHomePage && "lg:ml-[5%] lg:w-full"
      } w-full  bg-[#000000] px-2 py-4 transition-all duration-500`}
    >
      {!isHomePage && (
        <TabSwitcher
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isCommunityPage={true}
        />
      )}
      <div className="mt-3">
        {/* Map through the posts and render them here */}
        {posts?.length > 0 ? (
          posts?.map((post, index) => <PostCard key={index} post={post} communityName={communityName}  />)
        ) : (
          <div className="text-white text-center mt-4">
            <p>No posts available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityFeed;
