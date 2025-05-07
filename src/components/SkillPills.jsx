import React from "react";

const SkillPills = ({label}) => {
  return (
    <span
      className="px-2 py-1 bg-gray-text-10 text-sm text-gray-text-30 rounded-full"
    >
      {label}
    </span>
  );
};

export default SkillPills;
