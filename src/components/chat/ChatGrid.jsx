import { useEffect, useState } from "react";
import { MessageSquare, MessageCircle, Library } from "lucide-react";
import { marked } from "marked";
import TabSwitcher from "./TabSwitcher";
import ResponseView from "./ResponseView";
import ResourceView from "./ResourceView";

const ChatGrid = ({ query, response, youtube_Resource }) => {
  const renderedResponse = marked(response); // make the response as html

  const [activeTab, setActiveTab] = useState("result");

  return (
    <>
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
              { id: "resource", label: "Resource", icon: <Library /> },
            ]}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {activeTab === "result" ? (
            <ResponseView renderedResponse={renderedResponse} />
          ) : (
            <ResourceView youtube_Resource={youtube_Resource} />
          )}
        </div>
      </div>
    </>
  );
};
export default ChatGrid;
