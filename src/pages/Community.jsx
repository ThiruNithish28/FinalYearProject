import React, { useEffect, useState } from "react";
import HeaderCard from "../components/Community/HeaderCard";
import CommunityNav from "../components/Community/CommunityNav";
import CommunitySideNav from "../components/Community/CommunitySideNav";
import { topContributors } from "../util/CommunityUtils";
import CommunityFeed from "../components/Community/CommunityFeed";
import { useParams } from "react-router-dom";
import { useCommunityContext } from "../context/CommunityContext";
import { supabase } from "../util/supabaseClient";
import { ToastContainer } from "react-toastify";

const Community = () => {
  const { communityName } = useParams();
  const [isSideNavOpen, setIsSideNavOpen] = useState(true); // State to manage the visibility of the side navigation bar

  const {
    selectedCommunity,
    setSelectedCommunity,
    userFollowedCommunity,
    setIsUserFollowedCommunity,
  } = useCommunityContext();
  const [posts, setPosts] = useState([]); // State to store posts for the selected community
  const [isLoadingPosts, setIsLoadingPosts] = useState(false); // State to manage loading state for posts

  // useEffect to fetch the community data when the component mounts or when communityName changes
  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        const { data, error } = await supabase
          .from("communities")
          .select("*")
          .eq("name", communityName.replace(/-/g, " "));
        if (!error && data.length > 0) {
          setSelectedCommunity(data[0]);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        toast.error("Failed to fetch community data.");
      }
    };

    if (
      !selectedCommunity ||
      selectedCommunity.name !== communityName.replace(/-/g, " ")
    ) {
      fetchCommunity();
    }
  }, [communityName, selectedCommunity, setSelectedCommunity]);

  // useEffect to check if the user is already following the community
  useEffect(() => {
    if (selectedCommunity && userFollowedCommunity) {
      const isFollowed = userFollowedCommunity.some(
        (community) => community.id === selectedCommunity.id
      );
      setIsUserFollowedCommunity(isFollowed);
    }
  }, [selectedCommunity, userFollowedCommunity]);

  // useEffect to fetch posts for the selected community
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoadingPosts(true);
      try {
        const { data, error } = await supabase
          .from("posts")
          .select(
            ` id,
              title,
              tags,
              post_type,
              created_at,
              view_count,
              user_id,
              community_id,
              public_profiles!posts_user_id_fkey1 (
                user_name,
                avatar_url
              )`
          )
          .eq("community_id", selectedCommunity?.id);
        if (!error) setPosts(data || []);
      } catch (error) {
        console.error("Unexpected error:", error);
        toast.error("Failed to load posts.");
      } finally {
        setIsLoadingPosts(false);
      }
    };

    if (selectedCommunity?.id) {
      fetchPosts();
    }
  }, [selectedCommunity]);

  // add shimmer loading effect till the community data is fetched
  if (!selectedCommunity) {
    return (
      <div className="bg-[#000000] w-full h-full flex items-center justify-center">
        <h1 className="text-white text-2xl">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="bg-[#000000] w-full h-[100dvh] overflow-x-hidden overflow-y-scroll">
      <ToastContainer position="top-right" autoClose={5000} />

      <CommunityNav />

      <CommunitySideNav

        isSideNavOpen={isSideNavOpen}
        setIsSideNavOpen={setIsSideNavOpen}
        topContributors={topContributors}
      />

      <main className={`w-full ${isSideNavOpen ? "lg:w-4/5 lg:ml-[21%]" : "w-full lg:ml-[5%]"} px-6 py-4 `}>
        <HeaderCard
          isCommunity={true}
          communityName={selectedCommunity?.name}
          bannerSrc={selectedCommunity?.banner_url}
          logoSrc={selectedCommunity?.avatar_url}
        />
        <div className="flex justify-between w-full mt-20">
          {console.log("posts", posts)}
          <CommunityFeed
            isHomePage={false}
            posts={posts}
            communityName={selectedCommunity?.name}
            isLoadingPosts={isLoadingPosts}
          />
        </div>
      </main>
    </div>
  );
};

export default Community;
