import React from "react";
import { Link, useActionData, useLocation } from "react-router-dom";
import { useCommunityContext } from "../../context/CommunityContext";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";

const CommunityActionButtons = () => {
  const location = useLocation();
  const {
    selectedCommunity,
    handleJoinCommunity,
    handleLeaveCommunity,
    isUserFollowedCommunity,
    setIsUserFollowedCommunity,
    setUserFollowedCommunity,
  } = useCommunityContext();

  const {user} = useAuthContext();

  const handleJoin = async () => {
    if(!user){
      toast.error("Please Log in first..");
      return;
    } 

    if (selectedCommunity) {
      try {
        await handleJoinCommunity(selectedCommunity.id);
        setIsUserFollowedCommunity(true);
        setUserFollowedCommunity((prev) => [...prev, selectedCommunity]);
        toast.success(`You have joined ${selectedCommunity.name}`);
      } catch (error) {
        console.error("Error joining community:", error.message);
        toast.error("Error joining community:", error.message);
      }
    }
  };

  const handleLeave = async () => {
    if (selectedCommunity) {
      try {
        await handleLeaveCommunity(selectedCommunity.id);
        setIsUserFollowedCommunity(false);
        setUserFollowedCommunity((prev) =>
          prev.filter((community) => community.id !== selectedCommunity.id)
      );
      toast.success(`You have left ${selectedCommunity.name}`);
      } catch (error) {
        console.error("Error leaving community:", error.message);
        toast.error("Error leaving community:", error.message);
      }
    }
  };

  return (
    <div>
      <button className="bg-gray-500 text-white hover:cursor-pointer px-4 py-2 rounded-md mr-2">
        <Link
          to={`/community/${selectedCommunity?.name?.replace(/ /g, "-")}/create-post`}
          state={{ from: location }}
        >
          Create Post
        </Link>
      </button>
      {isUserFollowedCommunity ? (
        <button
          onClick={handleLeave}
          className="bg-blue-500 text-white hover:cursor-pointer px-4 py-2 rounded-md mr-2"
        >
          Joined
        </button>
      ) : (
        <button
          onClick={handleJoin}
          className="bg-blue-500 text-white hover:cursor-pointer px-4 py-2 rounded-md mr-2"
        >
          Join
        </button>
      )}
    </div>
  );
};

export default CommunityActionButtons;
