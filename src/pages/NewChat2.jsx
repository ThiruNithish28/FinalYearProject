import { useState } from "react";
import { CircleFadingArrowUp } from "lucide-react";

import { useUserChatContext } from "../context/userChatContext";
import { useAuthContext } from "../context/AuthContext";

import SideNav from "../components/chat/SideNav";
import ChatGrid from "../components/chat/ChatGrid";
import TopNav from "../components/chat/TopNav";

import { geminiRun, getKeyWordExtract, getTitle } from "../util/gemini";
import { youtube_Search } from "../util/youtube";
import { getCommunityPosts } from "../util/CommunityUtils";
import { supabase } from "../util/supabaseClient";

const NewChat2 = () => {
  const [currentQuery, setCurrentQuery] = useState("");

  const { allQuery, setAllQuery, activeChatId, setActiveChatId } =
    useUserChatContext();
  const { user } = useAuthContext(); // get the current user from context

  // for get the date that chat created
  let formateDate = new Date().toLocaleString("us-en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  //action perform when user submit the query
  const submitInput = async () => {
    if (currentQuery.trim() === "") return;

    const result = await geminiRun(currentQuery);
    const [chatTitle, keyword] = await Promise.all([
      getTitle(currentQuery, result),
      getKeyWordExtract(currentQuery, result),
    ]);

    const [youtube_resource, communityPosts] = await Promise.all([
      youtube_Search(keyword),
      getCommunityPosts(keyword),
    ]);
    

    const resources = [
      ...youtube_resource.map((resource) => ({ type: "youtube", ...resource })),
      ...(communityPosts || []).map((post) => ({ type: "community_post", ...post })),
    ];
    

    const newChat = {
      chat_id: Date.now(),
      date_created: formateDate,
      title: chatTitle,
      query: currentQuery,
      response: result,
      resources: resources,
    };
    //save to Supabase DB
    const { error } = await supabase
      .from("user_chats")
      .insert([{ ...newChat, user_id: user.id }]);
    if (error) {
      console.error("Error inserting data:", error.message);
    }

    //save to context API
    setAllQuery((prev) => [...prev, newChat]);
    setCurrentQuery("");
    setActiveChatId(newChat.chat_id);
  };

  const activeChat = allQuery.find((chat) => chat.chat_id === activeChatId); // for which chat to display

  return (
    <div className="flex flex-col lg:flex-row bg-[#171717] h-dvh ">
      {console.log("resorces", activeChat?.resources)}
      {/* Sidebar for larger screens */}
      <SideNav />
      {/* Chat area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {activeChat && (
          <TopNav
            date={activeChat.date_created}
            chatHeading={activeChat.title}
          />
        )}
        <div className="flex h-full  flex-col items-center justify-center text-white">
          {activeChat ? (
            <div className="w-full h-full flex justify-center overflow-y-scroll mb-16">
              <ChatGrid
                query={activeChat.query}
                response={activeChat.response}
                resources={activeChat.resources}
              />
            </div>
          ) : (
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold mb-5 text-center">
              What can I help you with?
            </h2>
          )}
          <div className="sticky bottom-3.5 w-full  lg:w-[860px]  p-2 rounded-xl flex border border-gray-border bg-gray-btn shadow-lg hover:border-2 hover:border-white hover:scale-105 transition-transform duration-200 ease-in-out">
            <textarea
              name="currentQuery"
              value={currentQuery}
              onChange={(e) => setCurrentQuery(e.target.value)}
              placeholder="Ask your doubt..."
              className="p-4 w-full field-sizing-content max-h-[200px] overflow-y-auto resize-none focus:outline-none  rounded-l-xl bg-gray-btn text-sm sm:text-base"
            ></textarea>
            <button
              className="flex items-end justify-center p-2 bg-primary hover:bg-primary-dark rounded-r-xl"
              onClick={submitInput}
            >
              <CircleFadingArrowUp size={30} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewChat2;
