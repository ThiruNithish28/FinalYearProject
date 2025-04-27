import React from "react";
import { useNavigate } from "react-router-dom";


const CreatePostTopNav = ({ activeTab,setActiveTab }) => {
  const navigate = useNavigate();

  const handleClsoe = () =>{
    navigate('/community');
  }

  return (
    <nav className="sticky top-0 w-full h-2 px-9 py-6 border-b border-gray-border  text-white flex justify-between items-center z-10">
      <div className="flex items-center justify-between gap-4 lg:w-[62dvw] md:w-[65dvw] w-full">
        <div>
          <h1 className="hidden lg:block text-2xl font-bold">
            CodeMastery Community
          </h1>
          <p>create post</p>
        </div>
        {/* options */}
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "edit"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab("edit")}
          >
            Edit
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "preview"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab("preview")}
          >
            preview
          </button>
          <button className="lg:hidden hover:cursor-pointer " id="close-btn" onClick={()=> navigate('/community')}>
            &#10006;
          </button>
        </div>
      </div>
      <button className="hidden  hover:cursor-pointer lg:block" id="close-btn"  onClick={()=> navigate('/community')}>
        &#10006;
      </button>
    </nav>
  );
};

export default CreatePostTopNav;
