import React from "react";

export default function TabSwitcher({ tabs, activeTab, onTabChange }) {
  return (
    <div className="sticky top-0 z-30 flex gap-2 font-semibold text-[14px] mt-4 mb-2 bg-[#171717] border-b border-b-gray-border w-full lg:w-[860px] ">
      {tabs.map((tab) => (
        <p
          onClick={() => onTabChange(tab.id)}
          className={`${
            activeTab === tab.id
              ? "border-b border-b-white text-white"
              : "text-light-gray"
          } flex items-center gap-2  p-2 hover:cursor-pointer hover:bg-gray-btn`}
        >
          {tab.icon}
           <span>{tab.label}</span>
        </p>
      ))}
    </div>
  );
}
