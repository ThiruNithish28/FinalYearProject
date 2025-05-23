import { useState } from "react";
import SideNav from "../components/SideNav";
import { CircleFadingArrowUp } from "lucide-react";
import { geminiRun, getKeyWordExtract, getTitle } from "../util/gemini";

import { useUserChatContext } from "../context/userChatContext";
import Chat from "../components/Chat";
import Accordian from "../components/Accordian"
import TopNav from "../components/TopNav";
import { youtube_Search } from "../util/youtube";

const NewChat = () => {
  const [currentQuery, setCurrentQuery] = useState("");

  const { allQuery, setAllQuery, activeChatId, setActiveChatId } =
    useUserChatContext();

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
    const resource = await youtube_Search(keyword);
    console.log("keyword", keyword);
    const newChat = {
      id: Date.now(),
      dateCreated: formateDate,
      title: chatTitle,
      query: currentQuery,
      response: result,
      resource: resource,
    };
    setAllQuery((prev) => [...prev, newChat]);
    setCurrentQuery("");
    setActiveChatId(newChat.id);
  };

  const activeChat = allQuery.find((chat) => chat.id === activeChatId); // for which chat to display

  return (
    <div className="flex flex-col lg:flex-row bg-[#171717] h-screen ">
      {/* Sidebar for larger screens */}
      <SideNav />
      {/* Chat area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {activeChat && (
          <TopNav
            date={activeChat.dateCreated}
            chatHeading={activeChat.title}
          />
        )}
        <div className="flex h-full  flex-col items-center justify-center text-white">
          {activeChat ? (
            <div className="w-full h-full flex overflow-y-scroll mb-16">
              <Chat
                query={activeChat.query}
                response={activeChat.response}
                youtube_Resource={activeChat.resource}
              />
              
              
            </div>
          ) : (
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold mb-5 text-center">
              What can I help you with?
            </h2>
          )}
          <div className="sticky bottom-3.5 w-full  lg:w-[860px]  p-2 rounded-xl flex border border-gray-border bg-gray-btn shadow-lg">
            <textarea
              name="currentQuery"
              value={currentQuery}
              onChange={(e) => setCurrentQuery(e.target.value)}
              placeholder="Ask your doubt..."
              className="p-4 w-full field-sizing-content max-h-[200px] overflow-y-auto resize-none focus:outline-none focus:ring-2 focus:ring-primary rounded-l-xl bg-gray-btn text-sm sm:text-base"
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

export default NewChat;
// This is the NewChat page where the user can ask a question to the chatbot. The user can type their query in the input field and click on the send button to send the query to the chatbot. The query is stored in the state using the useState hook. The SideNav component is used to display the sidebar for larger screens. The CircleFadingArrowUp icon is used to represent the send button. The input field is styled using tailwindcss classes to provide a clean and modern look. The NewChat page is responsive and works well on different screen sizes.// Path: src/pages/NewChat.jsx
