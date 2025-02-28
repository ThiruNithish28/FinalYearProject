import { useState } from "react";
import SideNav from "../components/SideNav";
import { CircleFadingArrowUp } from "lucide-react";

const NewChat = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col lg:flex-row bg-dark-gray-background h-screen">
      {/* Sidebar for larger screens */}
      <SideNav className="hidden lg:block" />

      <div className="flex flex-1 flex-col items-center justify-center p-4 lg:p-8 text-white">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-5 text-center">
          What can I help you with?
        </h2>

        <div className="w-full max-w-md sm:max-w-lg p-2 rounded-xl flex border border-gray-border bg-gray-btn shadow-lg">
          <input
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask your doubt..."
            className="p-4 w-full focus:outline-none focus:ring-2 focus:ring-primary rounded-l-xl bg-gray-btn text-sm sm:text-base"
          />
          <button className="flex items-center justify-center p-2 bg-primary hover:bg-primary-dark rounded-r-xl">
            <CircleFadingArrowUp size={30} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewChat;
// This is the NewChat page where the user can ask a question to the chatbot. The user can type their query in the input field and click on the send button to send the query to the chatbot. The query is stored in the state using the useState hook. The SideNav component is used to display the sidebar for larger screens. The CircleFadingArrowUp icon is used to represent the send button. The input field is styled using tailwindcss classes to provide a clean and modern look. The NewChat page is responsive and works well on different screen sizes.// Path: src/pages/NewChat.jsx
