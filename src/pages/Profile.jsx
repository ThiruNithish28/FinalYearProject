import React, { useState } from "react";
import HeaderCard from "../components/Community/HeaderCard";
import { Link, useParams } from "react-router-dom";
import CommunityNav from "../components/Community/CommunityNav";
import CommunitySideNav from "../components/Community/CommunitySideNav";
import { formatTimeStamp } from "../util/helper";
import {
  Book,
  BookMarkedIcon,
  CalendarDays,
  GithubIcon,
  Heart,
  LinkedinIcon,
  MapPin,
  MessageSquare,
  TwitchIcon,
  TwitterIcon,
  Users2,
} from "lucide-react";
import SkillPills from "../components/SkillPills";
import TabSwitcher from "../components/chat/TabSwitcher";
import { kimbieDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Profile = () => {
  const { profileId } = useParams();


  const profile = {
    name: "thiru",
    avatar_url: "",
    banner_url: "",
    bio: "a passionate Full Stack Developer with a drive to innovate and solve real-world problems through technology. I'm currently pursuing my B.Tech in Computer Science & Business System at K Ramakrishnan College Of Engineering and actively honing my skills through internships and personal projects",
    user_role: "software deverolper @Neeyamo",
    joined_at: "2025-05-02 01:07:55.666217",
    skills: [
      "react",
      "java",
      "web3",
      "bootstrap",
      "front end",
      "SQL",
      "javaScript",
      "Git",
      "github",
    ],
    total_posts: 4,
    total_likes: "2.4k",
    total_comments: 40,
    location: "thanjavur,tamilnadu",
    followers_count: 200,
    linkedin_url: "https://www.linkedin.com/in/thirumavalavan-p-196872248/",
    github_url: "https://github.com/ThiruNithish28",
  };

  const [isSideNavOpen, setIsSideNavOpen] = useState(true);
  const tabs = ["posts", "comments", ""];
  const [activeTab, setActiveTab] = useState("posts");
  return (
    <div className="bg-[#000000] w-full h-full">
      <CommunityNav />
      <CommunitySideNav
        isSideNavOpen={isSideNavOpen}
        setIsSideNavOpen={setIsSideNavOpen}
      />
      <main
        className={`w-full ${
          isSideNavOpen ? "lg:w-4/5 lg:ml-[21%]" : "lg:w-[95%] lg:ml-[5%]"
        } px-6 py-4 `}
      >
        <HeaderCard
          isCommunity={false}
          profileName={profile.name}
          logoSrc={profile.avatar_url}
          bannerSrc={profile.banner_url}
          userCurrentRole={profile.user_role}
        />
        <div className="text-gray-text-70 mt-28 ml-4">
          {/* bio */}
          <p>{profile.bio}</p>

          <div className="flex gap-5 my-4">
            <p className="flex items-center space-x-1">
              <MapPin size={18} /> <span>{profile.location}</span>
            </p>
            <p className="flex items-center space-x-1">
              <CalendarDays size={18} />
              <span>Joined {formatTimeStamp(profile.joined_at)}</span>
            </p>
            <p className="flex items-center space-x-1">
              <Users2 size={18} />
              <span>{profile.followers_count} followers</span>
            </p>
          </div>

          {/* skills */}
          {profile.skills && (
            <div className="flex gap-2 mb-4">
              {profile.skills.map((skill, index) => (
                <SkillPills key={index} label={skill} />
              ))}
            </div>
          )}

          {/* socila links */}
          <div className="flex gap-2">
            {profile.github_url && (
              <button className="hover:bg-gray-text-10 p-2 rounded-full">
                <Link to={profile.github_url}>
                  <GithubIcon size={18} />
                </Link>
              </button>
            )}

            {profile.linkedin_url && (
              <button className="hover:bg-gray-text-10 p-2  rounded-full">
                <Link to={profile.linkedin_url}>
                  <LinkedinIcon size={18} />
                </Link>
              </button>
            )}

            {profile.twitter_url && (
              <button className="hover:bg-gray-text-10 p-2 rounded-full">
                <Link to={profile.twitter_url}>
                  <TwitterIcon size={18} />
                </Link>
              </button>
            )}
          </div>
        </div>
        {/* user actions */}
        <div className="flex gap-4 justify-between w-full px-4 my-2">
          <div className="flex items-center justify-between bg-gray-text-20 p-3 rounded-md w-[32%]">
            <div>
              <p
                className={`text-sm text-gray-text-60`}
              >
                Total Posts
              </p>
              <p className="text-2xl text-white font-bold">{profile.total_posts || "0"}</p>
            </div>
            <div
              className={`p-3 rounded-full bg-blue-500/10 text-blue-400`}
            >
              <BookMarkedIcon size={24} />
            </div>
          </div>

          <div className="flex items-center justify-between bg-gray-text-20 p-3 rounded-md w-[32%]">
            <div>
              <p
                className={`text-sm text-gray-text-60`}
              >
                Total Likes
              </p>
              <p className="text-2xl text-white font-bold">{profile.total_likes || "0"}</p>
            </div>
            <div
              className={`p-3 rounded-full bg-red-500/10 text-red-400`}
            >
              <Heart size={24} />
            </div>
          </div>

          <div className="flex items-center justify-between bg-gray-text-20 p-3 rounded-md w-[32%]">
            <div>
              <p
                className={`text-sm text-gray-text-60`}
              >
                Total Comments
              </p>
              <p className="text-2xl text-white font-bold">{profile.total_comments||"0"}</p>
            </div>
            <div
              className={`p-3 rounded-full bg-green-500/10 text-green-400`}
            >
              <MessageSquare size={24} />
            </div>
          </div>
        </div>
        <TabSwitcher
          isCommunityPage={true}
          tabs={[
            { id: "posts", label: "Posts" },
            { id: "comments", label: "Comments" },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </main>
    </div>
  );
};

export default Profile;
