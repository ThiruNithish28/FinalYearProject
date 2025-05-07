import React from "react";
import CommunityActionButtons from "./CommunityActionButtons";
import ProfileActionbuttons from "./ProfileActionbuttons";

const HeaderCard = ({
  isCommunity,
  communityName,
  profileName,
  logoSrc,
  bannerSrc,
  userCurrentRole,
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
          alt="Banner"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Community Info Section */}
      <div className="absolute top-[120px] left-3 right-0 mx-auto w-full max-w-[1200px]">
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
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex justify-between items-center w-full">
            <div>
              <h1 className="text-4xl font-extrabold text-white">
                {isCommunity ? communityName : profileName}
              </h1>
              <p className="text-sm text-gray-text-50">
                {!isCommunity && userCurrentRole}
              </p>
            </div>

            {isCommunity ? (
              <CommunityActionButtons communityName={communityName} />
            ) : (
              <ProfileActionbuttons />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderCard;
