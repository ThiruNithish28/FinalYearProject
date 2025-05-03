import React, { useState } from "react";
import EditorContent from "./EditorContent";
import TitleInput from "./TitleInput";
import MultiSelectTag from "./MultiSelectTag";
import ActionButtons from "./ActionButton";
import MarkdownPreview from "./MarkdownPreview";

const CreatePostForm2 = ({
  title,
  setTitle,
  content,
  setContent,
  tags,
  setTags,
  activeTab,
  setIsContentGuidence,
  setIsTitleGuidence
}) => {
  return (
    <div className="bg-[#171717] lg:w-[60dvw] md:w-[65dvw] lg:ml-16 md:ml-10 w-full h-full  flex flex-col">
      <div className="p-5 lg:px-16 lg:py-8 md:px-12 md:py-8">
        <TitleInput
          value={title}
          onChange={setTitle}
          placeholder="New post title here..."
          activeTab={activeTab}
          setIsTitleGuidence={setIsTitleGuidence}
        />
        <MultiSelectTag selectedTag={tags} setSelectedTag={setTags} activeTab={activeTab} />
      </div>

      {activeTab === "edit" ? (
        <EditorContent
          value={content}
          onChange={setContent}
          placeholder="write your post content here.."
          setIsContentGuidence={setIsContentGuidence}
        />
      ) : (
        <MarkdownPreview content={content} />
      )}
    </div>
  );
};

export default CreatePostForm2;
