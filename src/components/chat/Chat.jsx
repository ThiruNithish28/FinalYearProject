import { useEffect } from "react";
import { marked } from "marked";
import Accordian from "../Accordian";



const Chat = ({ query, response, youtube_Resource }) => {
  const renderedResponse = marked(response); // make the response as html

  useEffect(() => {
    const codeBlocks = document.querySelectorAll("pre"); // select all the code blocks
    codeBlocks.forEach((block) => {
      if (!block.querySelector(".copy-btn")) {
        const button = document.createElement("button"); // create a button
        button.innerText = "📋copy";
        button.className =
          "copy-btn bg-gray-btn text-white p-2 rounded-lg absolute right-2 top-2";
        button.addEventListener("click", () => {
          const code = block.querySelector("code"); // select the code inside the block
          if (code) {
            navigator.clipboard.writeText(code.textContent); // copy the code to clipboard
            button.innerText = "✅copied"; // change the button text to copied
            setTimeout(() => {
              button.innerText = "📋copy";
            }, 1000);
          }
        });
        block.style.position = "relative";
        block.appendChild(button);
      }
    });
  }, [renderedResponse]);

  return (
    <>
      <div className="h-full  flex  flex-col  items-center  py-4 lg:py-8  text-white">
        {/* user query  */}
        <div className="w-[350px] break-words whitespace-pre-wrap bg-gray-btn self-end text-xl font-semibold rounded-xl mr-8 px-4 py-2.5">
          {query}
        </div>
        {/* response  */}
        <div
          dangerouslySetInnerHTML={{ __html: renderedResponse }}
          className="w-full h-full lg:w-[860px] py-4 pl-8 pr-4 rounded-xl whitespace-pre-wrap prose prose-invert max-w-none [&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:rounded-lg  [&_code]:text-sm [&_code]:block"
        ></div>
      </div>
      {/* resoucre */}

      <aside className="w-[300px] h-full">
      <Accordian icon="youtube" title="videos" elements={youtube_Resource}/>
      </aside>
    </>
  );
};
export default Chat;


