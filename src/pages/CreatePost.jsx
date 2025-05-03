import React, { useState } from "react";
import CreatePostForm2 from "../components/Community/PostEditor/CreatePostForm2";
import CreatePostTopNav from "../components/Community/PostEditor/CreatePostTopNav";
import ActionButtons from "../components/Community/PostEditor/ActionButton";
import { ToastContainer, toast } from "react-toastify";
import Guidence from "../components/Community/PostEditor/Guidence";
import { supabase } from "../util/supabaseClient";
import { useAuthContext } from "../context/AuthContext";
import { useCommunityContext } from "../context/CommunityContext";

const CreatePost = () => {
  // getting data from context
  const userId = useAuthContext().user.id;
  const { selectedCommunity, setSelectedCommunity, userFollowCommunity } = useCommunityContext();

  // state for the post form
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [activeTab, setActiveTab] = useState("edit");
  const [tags, setTags] = useState([]);
  const [chosenCommunity, setChosenCommunity] = useState(selectedCommunity ||null);
  const [originalPost, setOriginalPost] = useState(null);
  const [saveStatus, setSaveStatus] = useState("saved");

  // state for the action buttons
  const [isTitleGuidence, setIsTitleGuidence] = useState(false);
  const [isContentGuidence, setIsContentGuidence] = useState(false);
  const [isActionBtnGuidence, setIsActionBtnGuidence] = useState(true);

  

  const handlePublish = async () => {
    if (title === "") {
      toast.error("please enter title before publish.");
      return;
    } else if (content === "") {
      toast.error("please enter content before publish.");
      return;
    }
    setOriginalPost({ title, content, tags, published: false });
    const { error } = await supabase.from("posts").insert([
      {
        title: title,
        content: content,
        tags: tags,
        created_at: new Date(),
        user_id: userId,
        community_id: chosenCommunity.id,
        post_type:"article",
      },
    ]);
    if (error) {
      toast.error("Error publishing post", error);
      console.error("Error publishing post:", error.message);
    } else {
      toast.success(`Published post: ${title}`);
    }
    // Reset the form after publishing
    setTitle("");
    setContent("");
    setTags([]);
    setActiveTab("edit");
    setOriginalPost(null);
  };
  const handleSaveDraft = () => {
    console.log("handleSave draft");
    if (title === "") {
      toast.error("please enter title before save draft.");
      return;
    } else if (content === "") {
      toast.error("please enter content before save draft.");
      return;
    }

    toast.info("Draft saving...");
    setSaveStatus("saving...");
    setTimeout(() => {
      setOriginalPost({ title, content, tags, published: false });
      setSaveStatus("saved");
      toast.success(`Draft saved: ${title}`);
    }, 3000);
  };

  const handleRevert = () => {
    if (originalPost) {
      setTitle(originalPost.title);
      setContent(originalPost.content);
      setTags(originalPost.tags);
      toast.success(`Reverted to original post: ${originalPost.title}`);
    } else {
      toast.error("No original post to revert to.");
    }
  };

  const hasChanges =
    originalPost &&
    (title !== originalPost?.title ||
      content !== originalPost?.content ||
      tags.length !== originalPost?.tags.length);

  return (
    <div className="bg-[#000000] relative text-gray-text-60  flex flex-col justify-center h-full ">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      {/* <TopNav /> */}
      <CreatePostTopNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* main form for creating a post */}
      <CreatePostForm2
        activeTab={activeTab}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        tags={tags}
        setTags={setTags}
        setIsContentGuidence={setIsContentGuidence}
        setIsTitleGuidence={setIsTitleGuidence}
      />

      <ActionButtons
        setIsActionBtnGuidence={setIsActionBtnGuidence}
        onPublish={handlePublish}
        onSaveDraft={handleSaveDraft}
        onRevert={handleRevert}
        saveStatus={saveStatus}
        hasChanges={Boolean(hasChanges)}
      />

      <div
        className={`hidden md:block lg:block absolute right-0 lg:right-10 w-[30dvw] ${
          isTitleGuidence ? "top-16" : "bottom-32"
        }`}
      >
        <Guidence
          isActionBtnGuidence={isActionBtnGuidence}
          isContentGuidence={isContentGuidence}
          isTitleGuidence={isTitleGuidence}
          activeTab={activeTab}
        />
      </div>
    </div>
  );
};

export default CreatePost;
