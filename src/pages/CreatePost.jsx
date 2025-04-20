import React from "react";
import CreatePostTopNav from "../components/CreatePostTopNav";
import CreatePostForm from "../components/CreatePostForm";

const CreatePost = () => {
  return (
    <div className="bg-[#000000] text-gray-text-70  flex flex-col h-dvh overflow-hidden">
      {/* <TopNav /> */}
      <CreatePostTopNav />
      {/* main form for creating a post */}
      <CreatePostForm />
    </div>
  );
};

export default CreatePost;
