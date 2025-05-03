import React from "react";
import { marked } from "marked";

const PostContent = ({ content }) => {
  const renderedContent = content && marked(content); // make the content as html
  return (
    <div
      dangerouslySetInnerHTML={{ __html: renderedContent}}
      className="bg-[#171717] text-white p-4 h-fit  prose prose-invert max-w-none [&_pre]:overflow-x-auto [&_pre]:p-4 [&_pre]:rounded-lg  [&_code]:text-sm [&_code]:block" 
    ></div>
  );
};

export default PostContent;
