import React, { useEffect, useState } from "react";

const TitleInput = ({ value, onChange, placeholder, activeTab, setIsTitleGuidence }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 100; // Set the maximum length for the title
  const isWarning = charCount > maxChars * 0.8; // Set the warning threshold to 80% of maxChars
  const isExceeding = charCount > maxChars; // Check if the character limit is exceeded

  useEffect(() => {
    setCharCount(value.length);
  }, [value]);

 
  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
  };
  return (
    <div
      className={`relative transition-all duration-200 ${
        isFocused ? "scale-101" : ""
      }`}
    >
      <textarea
        value={value}
        onChange={handleChange}
        readOnly={activeTab !=='edit'}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 1000)}
        onMouseEnter={()=> setIsTitleGuidence(true)}
        onMouseLeave={()=> setIsTitleGuidence(false)}
        placeholder={placeholder}
        className="w-full py-3 text-4xl font-extrabold text-white  bg-transparent border-none outline-none resize-none dark:text-gray-200 placeholder-gray-text-60 dark:placeholder-gray-400"
        style={{ height: "70px", minHeight: "70px" }}
      />
      {isFocused && (
        <div
          className={`text-xs absolute bottom-0 right-2 ${
            isExceeding
              ? "text-red-500"
              : isWarning
              ? "text-yellow-500"
              : "text-gray-400"
          }`}
        >
          {charCount}/{maxChars}
        </div>
      )}
    </div>
  );
};

export default TitleInput;
