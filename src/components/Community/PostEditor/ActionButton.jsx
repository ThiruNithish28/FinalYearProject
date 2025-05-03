import { Rocket, Save } from "lucide-react";
import React from "react";

const ActionButton = ({
  onPublish,
  onSaveDraft,
  onRevert,
  saveStatus,
  hasChanges,
  setIsActionBtnGuidence,
}) => {
  return (
    <div
      onMouseEnter={() => setIsActionBtnGuidence(true)}
      onMouseLeave={() => setIsActionBtnGuidence(false)}
      className="flex items-center gap-3 mt-6 lg:ml-16 md:ml-10"
    >
      <button
        onClick={() => onPublish()}
        className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors duration-200 ease-in-out"
      >
        <Rocket size={16} className="mr-2" />
        Publish
      </button>

      <button
        onClick={() => onSaveDraft()}
        disabled={saveStatus === "saving..."}
        className={`${
          saveStatus === "saving..." && "bg-gray-500 cursor-not-allowed "
        } flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-md transition-colors duration-150`}
      >
        <Save size={16} className="mr-2" />
        Save draft
      </button>
      {hasChanges && (
        <button
          onClick={() => onRevert()}
          className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-150"
        >
          Revert changes
        </button>
      )}
    </div>
  );
};

export default ActionButton;
