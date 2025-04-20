import { Tag } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import TagPills from "./TagPills";

const MultiSelectTag = () => {
  const [tags, setTags] = useState([]);
  const [tagEntered, setTagEntered] = useState("");
  const [selectedTag, setSelectedTag] = useState([]);
  const [selectedTagSet, setSelectedTagSet] = useState(new Set());
  const [IsSugesstionVisible, setIsSugesstionVisible] = useState(false);

  const inputRef = useRef(null);

  const popularTag = [
    "react",
    "javascript",
    "css",
    "html",
    "python",
    "java",
    "DSA",
  ];
  const [suggestedTags, setSuggestedTags] = useState(popularTag);

  useEffect(() => {
    const filteredTags = popularTag.filter((tag) => {
      return (
        tag.toLowerCase().includes(tagEntered.toLowerCase()) &&
        !tags.includes(tag)
      );
    });
    setSuggestedTags(filteredTags);
  }, [tagEntered]);

  const handleSelectTag = (tag) => {
    if (selectedTag.length >= 4) return;
    setSelectedTag([...selectedTag, tag]);
    setSelectedTagSet(new Set([...selectedTagSet, tag]));
    setTagEntered("");
    inputRef.current.focus();
  };

  const handlekeyDown = (e) => {
    if (e.key === "Enter" && tagEntered) {
      e.preventDefault();
      if (selectedTag.length >= 4) return;
      handleSelectTag(tagEntered);
    } else if (e.key === "Backspace" && tagEntered === "") {
      const newTags = [...selectedTag];
      newTags.pop();
      setSelectedTag(newTags);
      setSelectedTagSet(new Set(newTags));
    }
  };

  return (
    <div className="w-full mb-3">
      {console.log("selectedTag", selectedTag)}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {/* tag pills  */}
        {selectedTag.length > 0 &&
          selectedTag.map((tag, index) => <TagPills key={index} text={tag} />)}
        <div>
          <input
            type="text"
            name="tag"
            id="tag"
            value={tagEntered}
            onChange={(e) => setTagEntered(e.target.value)}
            onKeyDown={handlekeyDown}
            ref={inputRef}
            autoComplete="off"
            placeholder="Add up to 4 tags..."
            className="focus:outline-none"
          />
        </div>
      </div>

      {/* suggested tag */}
      {suggestedTags.length > 0 && (
        <ul className="max-h-32 px-3 py-1 shadow-lg overflow-y-scroll gap-2 mt-2">
            <p className="pb-3 border-b border-gray-border">Top Tags</p>
          {suggestedTags.map((tag, index) => {
            return !selectedTagSet.has(tag) ? (
              <li
                key={index}
                className="px-2 py-1  cursor-pointer"
                onClick={() => handleSelectTag(tag)}
              >
                {"#" + tag}
              </li>
            ) : (
              <></>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectTag;
