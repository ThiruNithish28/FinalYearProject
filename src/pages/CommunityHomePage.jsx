import React, { useEffect, useState } from "react";
import CommunityNav from "../components/Community/CommunityNav";
import CommunitySideNav from "../components/Community/CommunitySideNav";
import {  topContributors } from "../util/CommunityUtils";
import CommunityFeed from "../components/Community/CommunityFeed";
import { supabase } from "../util/supabaseClient";

const CommunityHomePage = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(true); // State to manage the visibility of the side navigation bar
  
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    // Simulate fetching posts from an API or database
    const fetchPosts = async() => {
      const {data, error} = await supabase.from('posts').select(`id,
        title,
        tags,
        post_type,
        created_at,
        view_count,
        community_id,
        user_id,
        public_profiles!posts_user_id_fkey1 (
          user_name,
          avatar_url
        )
        `).order('created_at', { ascending: false });
      // Here you can replace this with your actual data fetching logic
      if(!error) setAllPosts(data);
      else console.error('Error fetching posts:', error.message);
    };

    fetchPosts();
  },[]);

  return (
    <div className="bg-[#000000] w-full h-[100dvh] overflow-x-hidden overflow-y-auto ">
      <CommunityNav />
      <div className="flex h-96">
      {console.log('posts',allPosts)}
        <CommunitySideNav
          isHomePageNav={true}
          isSideNavOpen={isSideNavOpen}
          setIsSideNavOpen={setIsSideNavOpen}
          topContributors={topContributors}
        />
        <CommunityFeed isHomePage={true} posts={allPosts}  isSideNavOpen={isSideNavOpen} />
      </div>
    </div>
  );
};

export default CommunityHomePage;
