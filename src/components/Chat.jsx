import { UseAuthContext } from "../util/context/AuthContext";
import { Clock, PenBoxIcon } from "lucide-react";

const Chat = ({ query, response, date }) => {
  const { currentUser } = UseAuthContext();
  return (
    <>
      
      <div className="h-full  flex flex-1 flex-col items-center  p-4 lg:p-8 text-white">
        <div className="bg-gray-btn self-end text-xl font-semibold rounded-xl mr-8 px-4 py-2.5">
          {query}
        </div>
        <div className="w-full h-full lg:w-[860px] p-4 rounded-xl  whitespace-pre-wrap">
          {response.replace("*","")}
        </div>
      </div>
    </>
  );
};
export default Chat;
