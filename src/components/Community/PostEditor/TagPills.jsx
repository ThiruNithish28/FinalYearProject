import React from 'react';

const TagPills = ({ text, onClick, activeTab }) => {
  return (
    <button
      className="p-2 rounded-full hover:cursor-pointer bg-gray-border"
      onClick={() => onClick(text)}
    >
      {"# " + text + " "}
      {activeTab !== 'preview' && (
        <span>&#10005;</span>
      )}
    </button>
  );
};

export default TagPills;
