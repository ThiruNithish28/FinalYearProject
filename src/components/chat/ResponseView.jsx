import { useEffect } from "react";

const ResponseView = ({ renderedResponse }) => {
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
    <div
      dangerouslySetInnerHTML={{ __html: renderedResponse }}
      className="w-[100vw] h-full lg:w-[860px] lg:p-4 p-5 rounded-xl whitespace-pre-wrap prose prose-invert max-w-none [&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:rounded-lg  [&_code]:text-sm [&_code]:block"
    ></div>
  );
};
export default ResponseView;