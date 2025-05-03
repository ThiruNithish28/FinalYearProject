import React from "react";
import CommunityActionButtons from "./CommunityActionButtons";

const CommunityHeader = ({
  communityName,
  logoSrc,
  bannerSrc,
}) => {
  return (
    <div className="relative">
      {/* Banner image */}
      <div className="w-full h-[140px] overflow-hidden rounded-lg">
        <img
          src={
            bannerSrc ||
            "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
          }
          alt="Community Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Community Info Section */}
      <div className="absolute top-[100px] left-0 right-0 mx-auto w-full max-w-[1200px]">
        <div className="flex items-end gap-3">
          {/* Logo with dark circular background */}
          <div className="relative w-[110px] h-[100px] rounded-full bg-[#1A1A1B] border-4 border-black z-10 overflow-hidden">
            <img
              src={
                logoSrc ||
                "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
              }
              alt="Community Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div className="flex justify-between items-center w-full">
            <h1 className="text-4xl font-extrabold text-white">
              {communityName}
            </h1>
            <CommunityActionButtons
              communityName={communityName}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;
