
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { LucideYoutube } from "lucide-react";

export default function Accordian({title,elements, icon}) {
    const [isCollaspe, setIsCollaspe] = useState(true);
  return (
    <div className="p-1">
      <div className="w-full flex justify-between mt-2 p-1 border border-gray-border">
        <div className="w-full flex gap-1 ">
        {icon ==="youtube" ? <LucideYoutube/>:""}
        <p>{title}</p>
        </div>

        <button onClick={()=> setIsCollaspe(!isCollaspe)} className="text-gray-border hover:cursor-pointer">
           {isCollaspe? <ChevronDown /> : <ChevronUp/>}
        </button>
      </div>
     { !isCollaspe && elements && elements.length > 0 && (
        <div >
          {elements.map((res) => (
            <a
              id={res.id.videoId}
              href={`https://www.youtube.com/watch?v=${res.id.videoId}`}
              target="_blank"
              className="mt-4 block"
            >
              <img
                src={res.snippet.thumbnails.medium.url}
                alt={res.snippet.title}
                className="w-full"
              />
              <p>{res.snippet.title.length > 20 ? res.snippet.title.slice(0,20) + "...": res.snippet.title }</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
