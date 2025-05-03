import { createContext, use, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { supabase } from "../util/supabaseClient";
import { useEffect, useState } from "react";

const CommunityContext = createContext();

export const CommunityContextProvider = ({ children }) => {
  const { user } = useAuthContext(); // get the user from auth context

  const [selectedCommunity, setSelectedCommunity] = useState(null); // for selected community
  const [allCommunities, setAllCommunities] = useState([]);
  const [userFollowedCommunity, setUserFollowedCommunity] = useState([]); // for users who follow the community
  const [isUserFollowedCommunity, setIsUserFollowedCommunity] = useState(false); // for check if user followed the community

  useEffect(() => {
    const fetchAllCommunities = async () => {
      const { data, error } = await supabase.from("communities").select("*");
      if (!error) setAllCommunities(data);
    };
    fetchAllCommunities();
  }, []);

  useEffect(() => {
    const followedCommunities = async () => {
      const { data, error } = await supabase
        .from("community_members")
        .select("community_id, communities(*)")
        .eq("user_id", user?.id);
      if (!error) {
        const joinedCommunities = data.map((item) => item.communities);
        setUserFollowedCommunity(joinedCommunities);
      }
    };
    followedCommunities();
  }, [user]);

  const handleJoinCommunity = async (communityId) => {
    const { error } = await supabase
      .from("community_members")
      .insert([{ community_id: communityId, user_id: user?.id }]);

    if (error) {
      console.error("Error joining community:", error.message);
      throw error;
    } else {
      setUserFollowedCommunity((prev) => [...prev, communityId]);
    }
  };

  const handleLeaveCommunity = async (communityId) => {
    const { error } = await supabase.
      from("community_members")
      .delete()
      .eq("community_id", communityId)
      .eq("user_id", user?.id);
    if(error) throw error;
  }

  return (
    <CommunityContext.Provider
      value={{
        allCommunities,
        selectedCommunity,
        setSelectedCommunity,
        userFollowedCommunity,
        isUserFollowedCommunity,
        setIsUserFollowedCommunity,
        setUserFollowedCommunity,
        handleJoinCommunity,
        handleLeaveCommunity,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunityContext = () => useContext(CommunityContext);
