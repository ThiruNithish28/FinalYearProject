import { faComment, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User2 } from "lucide-react";
import React from "react";
import { formatTimeStamp } from "../../../util/helper";
import { Link } from "react-router-dom";

const PostCard = ({ post, communityName }) => {
  const hastagRandomColor = [
    "red",
    "yellow",
    "green",
    "blue",
    "purple",
    "pink",
    "orange",
    "teal",
    "indigo",
    "violet",
    "amber",
    "rose",
    "emerald",
    "red",
    "orange",
  ];

  
  return (
    <div className="bg-[#171717] w-full  text-white p-4 rounded-md mb-4 flex flex-col gap-4 hover:transform hover:scale-[1.02] transition-transform duration-200">
      <div className="flex items-center gap-2">
        {post?.public_profiles?.avatar_url ? (
          <img src={post.public_profiles.avatar_url} alt={post.public_profiles.user_name} 
          referrerPolicy="no-referrer"
          className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="rounded-full bg-gray-text-30 w-8 h-8 flex items-center justify-center">
            <User2 />
          </div>
        )}
        <div className="text-sm ">
          <p>{post?.public_profiles?.user_name}</p>
          <p className="text-gray-text-50">{formatTimeStamp( post.created_at)}</p>
        </div>
      </div>
      <div className="pl-10">
        <div>
          <Link to={`/${communityName}/post/${post.id}`}  target="_blank">
          <h2 className="font-extrabold text-3xl hover:cursor-pointer hover:text-sky-300">
            {post.title}
          </h2>
          </Link>

          <ul className="flex gap-2 mt-2 text-sm font-extralight">
            {post.tags?.map((tag, index) => (
              <li key={index} className="flex gap-1 items-center">
                <p
                  style={{
                    color:
                      hastagRandomColor[
                        Math.floor(Math.random() * hastagRandomColor.length)
                      ],
                  }}
                >
                  #
                </p>
                {tag}
              </li>
            ))}
          </ul>

          <div className="text-xs bg-sky-600 text-white px-2 py-1 rounded-md mt-2 inline-block">
            {post.type?.toUpperCase() || "POST"}
          </div>
        </div>

        <div className="flex justify-between items-center text-gray-text-50 mt-4">
          <div className="flex gap-4 ">
            <p className="flex gap-1 items-center">
              <span>
                <img src="https://assets.dev.to/assets/sparkle-heart-5f9bee3767e18deb1bb725290cb151c25234768a0e9a2bd39370c382d02920cf.svg" />
              </span>
              {`${post.reactionCount} reactions`}
            </p>
            <p className="flex gap-1 items-center">
              <span>
                <FontAwesomeIcon icon={faComment} />
              </span>
              {`${post.commentCount} comments`}
            </p>
          </div>
          <p className="flex gap-1 items-center">
            <span>
              {/* <View /> */}
              <FontAwesomeIcon icon={faEye} />
            </span>
            {post.viewCount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
