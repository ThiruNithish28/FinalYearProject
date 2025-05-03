import React, { useEffect, useState } from "react";
import CommunityHeader from "../components/Community/CommunityHeader";
import CommunityNav from "../components/Community/CommunityNav";
import CommunitySideNav from "../components/Community/CommunitySideNav";
import { topCommunityLists, topContributors } from "../util/CommunityData";
import CommunityFeed from "../components/Community/CommunityFeed";
import { useParams } from "react-router-dom";
import { useCommunityContext } from "../context/CommunityContext";
import { supabase } from "../util/supabaseClient";
import { ToastContainer } from "react-toastify";

const Community = () => {
  const { communityName } = useParams();

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
    <div className="bg-[#000000] w-full h-full">
      <ToastContainer position="top-right" autoClose={5000} />

      <CommunityNav />
      <main className="px-6 py-4">
        <CommunityHeader communityName={selectedCommunity?.name} />
        <div className="flex justify-between w-full mt-20">
          {console.log('posts',posts)}
          <CommunityFeed
            isHomePage={false}
            posts={posts}
            communityName={selectedCommunity?.name}
            isLoadingPosts={isLoadingPosts}
          />
          <CommunitySideNav
            isHomePageNav={false}
            communityName={selectedCommunity?.name}
            desc={selectedCommunity?.description}
            createdAt={selectedCommunity?.created_at}
            members={selectedCommunity?.followers_count}
            topContributors={topContributors}
            topCommunityLists={topCommunityLists}
          />
        </div>
      </main>
    </div>
  );
};

export default Community;
