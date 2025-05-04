import { useEffect, useState } from "react";
import { MessageSquare, MessageCircle, Library } from "lucide-react";
import { marked } from "marked";
import TabSwitcher from "./TabSwitcher";
import ResponseView from "./ResponseView";
import ResourceView from "./ResourceView";
import CommunityPostView from "./CommunityPostView";

const ChatGrid = ({ query, response, resources }) => {
  const renderedResponse = marked(response); // make the response as html
  const youtube_resource = resources?.filter((r) => r.type === "youtube") || [
    "no resource",
  ];
  const community_resource = resources?.filter(
    (r) => r.type === "community_post"
  ) || ["no resource"];

  const [activeTab, setActiveTab] = useState("result");

  return (
    <>
      {console.log("youtube_resource", youtube_resource)}
      {console.log("community_resource", community_resource)}
      {/* Top Nav */}
      <div className="h-full  flex  flex-col  items-center  py-4 lg:py-8  text-white">
        {/* user query  */}
        <div className="lg:max-w-[480px]  break-words whitespace-pre-wrap bg-gray-btn self-end text-xl font-semibold rounded-xl mr-8 px-4 py-2.5">
          {query}
        </div>

        <div>
          {/* Tab */}
          <TabSwitcher
            tabs={[
              { id: "result", label: "Response", icon: <MessageCircle /> },
              { id: "youtube", label: "Resource", icon: <Library /> },
              {
                id: "community",
                label: "Community Post",
                icon: <MessageSquare />,
              },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {activeTab === "result" && (
            <ResponseView renderedResponse={renderedResponse} />
          )}

          {activeTab === "youtube" && (
            <ResourceView youtube_Resource={youtube_resource} />
          )}

          {activeTab === "community" && (
            <CommunityPostView posts={community_resource} />
          )}
        </div>
      </div>
    </>
  );
};
export default ChatGrid;
