import React, { useState, useRef, useEffect } from "react";
import EditorToolBar from "./EditorToolBar";
import * as editorUtils from "../../../util/editorUtils";

const EditorContent = ({ value, onChange,  setIsContentGuidence }) => {
  const textareaRef = useRef(null);
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  const updateSelection = () => {
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    setSelection({ start, end });
  };

  const handlekeyDown = (e) => {};

  const handleToolbarAction = (action) => {
    if (!textareaRef.current) return;
    const { selectionStart, selectionEnd } = textareaRef.current;
    let result;

    switch (action) {
      case "bold":
        result = editorUtils.applyBold(value, selectionStart, selectionEnd);
        onChange(result.text);
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.selectionStart = result.newCursorPos;
            textareaRef.current.selectionEnd = result.newCursorPos;
          }
        }, 0);
        break;
      case "italic":
        result = editorUtils.applyItalic(value, selectionStart, selectionEnd);
        onChange(result.text);
        break;
      case "link":
        result = editorUtils.applyLink(value, selectionStart, selectionEnd); 
        onChange(result.text); 
        break;
      case "ordered-list":
        result = editorUtils.applyOrderedList(value,selectionStart, selectionEnd);
        onChange(result.text);
        break;
      case "unordered-list":
        result = editorUtils.applyUnorderList(value,selectionStart, selectionEnd);
        onChange(result.text); 
        break;
      case "code":  
        result = editorUtils.applyCode(value, selectionStart, selectionEnd);
        onChange(result.text);
        break;
    }

    // Re-focus the textarea after action
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(result.newCursorPosition, result.newCursorPosition);
      }
    }, 0);
  };
  return (
    <div>
      <EditorToolBar onAction={handleToolbarAction}  />

      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onClick={() => updateSelection()}
        onKeyUp={updateSelection}
        onMouseUp={updateSelection}
        onKeyDown={handlekeyDown}
        onMouseEnter={() => setIsContentGuidence(true)}
        onMouseLeave={()=> setIsContentGuidence(false)}
        placeholder="write your post content here.."
        className="w-full h-64 px-5 pt-2 pb-6 lg:px-16 md:px-12  text-[18px] text-white placeholder:text-gray-text-40 rounded-md outline-none resize-none"
      ></textarea>
    </div>
  );
};

export default EditorContent;
