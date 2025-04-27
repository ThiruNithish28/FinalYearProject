import React from "react";
import { Bold, Italic, Link, List, ListOrdered, Code } from "lucide-react";
const EditorToolBar = ({ onAction }) => {
  const toolBarItems = [
    { name: "Bold", label: "Bold", action: () => onAction("bold") },
    { name: "Italic", label: "Italic", action: () => onAction("italic") },
    { name: "Link", label: "Link", action: () => onAction("link") },
    { name: "OrderedList", label: "Ordered List", action: () => onAction("ordered-list") },
    { name: "UnorderedList", label: "Unordered List", action: () => onAction("unordered-list") },
    { name: "Code", label: "Code", action: () => onAction("code") },

  ];

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case "Bold":
        return <Bold size={20} />;
      case "Italic":
        return <Italic size={20} />;
      case "Link":
        return <Link size={20} />;
      case "OrderedList":
        return <ListOrdered size={20} />;
      case "UnorderedList":
        return <List size={20} />;
      case "Code":
        return <Code size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex items-center bg-[#000000] mb-4 px-5 py-2 lg:px-16 md:px-12  ">
      {toolBarItems.map((item) => (
        <button
          key={item.name}
          onClick={item.action}
          className={`p-2 rounded-md transition-colors duration-150 `}
        >
          {getIconComponent(item.name)}
        </button>
      ))}
    </div>
  );
};

export default EditorToolBar;
