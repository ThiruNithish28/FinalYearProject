import React, { useState } from "react";
import { Rocket } from "lucide-react";
import MultiSelectTag from "./MultiSelectTag";

const CreatePostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [resources, setResources] = useState("");

  return (
    <main className="flex flex-col lg:flex-row  justify-center h-full  text-gray-text-70">
      <form className="lg:w-[60dvw] w-full h-full  flex flex-col">
        <div className="text-white w-full h-full max-h-[82dvh] rounded-lg overflow-auto bg-[#171717] px-16 py-10">
          <textarea
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="post-title"
            placeholder="New post title here..."
            autoComplete="off"
            className=" text-4xl font-extrabold h-12 w-full mb-4 focus:outline-none resize-none"
          ></textarea>

          <MultiSelectTag />

          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="write your post content here.."
              className="field-sizing-content resize-none p-2 w-full mb-4 focus:outline-none"
            ></textarea>
            <textarea
              value={resources}
              onChange={(e) => setResources(e.target.value)}
              id="resources"
              placeholder="resources links here.."
              className="field-sizing-content resize-none h-full p-2 w-full mb-4 focus:outline-none"
            ></textarea>
          </div>
        </div>
        <div id="form-action" className="p-4 ">
          <button type="submit" className="flex gap-1 font-semibold bg-blue-500 text-white p-2 rounded-md">
            Publish
            <span>
              <Rocket/>
            </span>
          </button>
        </div>
      </form>
      {/* sideBar for guidances to fill the form */}
      <div className="hidden lg:flex flex-col items-start justify-center h-screen p-4">
        <h2 className="text-xl font-bold">Guidelines</h2>
        <p className="mb-2">1. Be respectful and constructive.</p>
        <p className="mb-2">2. No spam or self-promotion.</p>
      </div>
    </main>
  );
};

export default CreatePostForm;
