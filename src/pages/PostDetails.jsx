import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommunityNav from "../components/Community/CommunityNav";

import {
  ArrowBigDown,
  ArrowBigUp,
  BookmarkIcon,
  EyeIcon,
  HeartIcon,
  MessageSquare,
  Share2Icon,
} from "lucide-react";
import PostContent from "../components/Community/Post/PostContent";
import CommunitySideNav from "../components/Community/CommunitySideNav";
import PostComments from "../components/Community/Post/PostComments";
import AuthorCard from "../components/Community/Post/AuthorCard";
import { supabase } from "../util/supabaseClient";
import { formatTimeStamp } from "../util/helper";
import CommunityDetailCard from "../components/Community/CommunityDetailCard";

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  useEffect(() => {
    if (!postId || postId === "undefined") {
      console.error("Invalid postId:", postId);
      return;
    }

    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select(`*, public_profiles!posts_user_id_fkey1(*), communities(*)`)
          .eq("id", postId)
          .single();
        if (!error) setPost(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);


  return (
    <div className="bg-[#000000] text-white w-full h-[100dvh] overflow-x-hidden overflow-y-auto">
      <CommunityNav />
      <CommunitySideNav isSideNavOpen={isSideNavOpen} setIsSideNavOpen={setIsSideNavOpen}/>
      <div className="flex flex-col mx-auto px-4 py-6 lg:flex-row lg:space-x-6">
        <main className={`bg-[#000000] w-full ${isSideNavOpen ?"lg:w-3/5  lg:ml-[21%]" :"lg:w-3/4 lg:ml-[5%]"} shadow-md rounded-lg `}>
          {/* post heading */}
          <div className="relative rounded-lg">
            <img
              src={post?.cover_img}
              alt="post cover"
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <div className="flex space-x-2 mb-2">
                {post?.tags.map((tag, index) => (
                  <p
                    key={index}
                    className="text-xs bg-blue-500/80 text-white px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </p>
                ))}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">{post?.title}</h1>
            </div>
          </div>

          {/* post metadata */}
          <div className="p-4 border-b border-gray-text-20 flex justify-between items-center bg-[#171717]">
            <div className="flex gap-2 items-center">
              <img
                src={post?.public_profiles?.avatar_url}
                alt={post?.public_profiles?.user_name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p>{post?.public_profiles?.user_name}</p>
                <p className="text-gray-text-50">
                  posted on {formatTimeStamp( post?.created_at)}
                </p>
              </div>
            </div>

            {/* action btn */}
            <div className="flex gap-1 text-gray-text-50 ">
              <button className="p-2 rounded-full  hover:text-red-400 hover:cursor-pointer">
                {" "}
                <HeartIcon />
              </button>
              <button className="p-2 rounded-full  hover:text-sky-400 hover:cursor-pointer">
                {" "}
                <MessageSquare />
              </button>
              <button className="p-2 rounded-full hover:text-yellow-400 hover:cursor-pointer">
                {" "}
                <BookmarkIcon />{" "}
              </button>
              <button className="p-2 rounded-full hover:text-green-700 hover:cursor-pointer">
                <Share2Icon />
              </button>
            </div>
          </div>

          {/* Post Content */}
          <PostContent content={post?.content} />

          {/* Post Engagement */}
          <div className="p-4 border-t border-gray-text-20 flex justify-between items-center bg-[#171717] rounded-b-lg">
            <div className="flex gap-2 items-center">
              <div className="flex gap-1 items-center ">
                <button className="p-1 text-gray-text-50 hover:text-white hover:cursor-pointer rounded-full ">
                  <ArrowBigUp size={20} />
                </button>
                <p>{post?.upvote_count}</p>
                <button className="p-1 text-gray-text-50 hover:text-white hover:cursor-pointer rounded-full ">
                  <ArrowBigDown size={20} />
                </button>
              </div>

              <div className="flex gap-1 items-center text-gray-text-50">
                <MessageSquare className="text-gray-text-50" size={16} />
                <span>{" " + post?.comment_count} comments</span>
              </div>
            </div>
            <div className="flex gap-1 items-center text-gray-text-50">
              <EyeIcon size={20} />
              <span> {post?.view_count} views</span>
            </div>
          </div>

          {/* Post Comments */}
          <PostComments postId={postId} />
        </main>

        {/* side Nav */}
        <aside className="w-full lg:w-1/5 space-y-4 mt-6 lg:mt-0 ">
          <AuthorCard author={post?.public_profiles} />
          {/* <CommunitySideNav
            isHomePageNav={false}
            members={post?.communities?.members_count}
            communityName={post?.communities?.name}
            desc={post?.communities?.description}
            createdAt={post?.communities?.created_at}
          /> */}
          <CommunityDetailCard
           members={post?.communities?.members_count}
           communityName={post?.communities?.name}
           desc={post?.communities?.description}
           createdAt={post?.communities?.created_at}
          />
        </aside>
      </div>
    </div>
  );
};

export default PostDetails;
