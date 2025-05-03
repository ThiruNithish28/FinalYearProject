import { CalendarDays, Github, MapPin, Twitter } from "lucide-react";
import React from "react";
import { formatTimeStamp } from "../../../util/helper";

const AuthorCard = ({ author }) => {
  return (
    <div className="bg-[#171717] p-4 rounded-lg ">
      {/* card header */}
      <div className="flex gap-1 items-center mb-4">
        <img
          src={author?.avatar_url}
          alt="author"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="text-sm font-semibold">{author?.user_name}</p>
          <p className="text-xs text-gray-text-50">{author?.user_role}</p>
        </div>
      </div>

      <p className="text-sm mb-4 text-gray-text-70">{author?.bio}</p>

      <div className="text-sm space-y-2 text-gray-text-50 mb-4">
        <div className="flex items-center space-x-2">
          <MapPin size={16} />
          <span>{author?.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <CalendarDays size={16} />
          <span>{formatTimeStamp( author?.joined_at)}</span>
        </div>
      </div>

      {/* skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {author?.skills &&
          author.skills.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-text-10 text-sm text-gray-text-30 rounded-full"
            >
              {skill}
            </span>
          ))}
      </div>

      {/* social Links */}
      <div className="flex space-x-3 mb-4">
        {author?.social?.github && (
          <a
            href={author.social.github}
            className="p-2 rounded-full text-gray-text-30 bg-gray-text-10"
          >
            <Github size={16} />
          </a>
        )}
        {author?.social?.twitter && (
          <a
            href={author.social.twitter}
            className="p-2 rounded-full text-gray-text-30 bg-gray-text-10"
          >
            <Twitter size={16}  />
          </a>
        )}
      </div>

      {/* action btn */}
      <div className="border-t border-gray-text-30 pt-2.5">
        <button className="text-white bg-sky-900 hover:bg-sky-600 hover:cursor-pointer w-full font-semibold px-4 py-2 rounded-md">Follow</button>
      </div>
    </div>
  );
};

export default AuthorCard;
