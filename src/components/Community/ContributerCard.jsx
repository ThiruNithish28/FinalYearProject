import { User2 } from "lucide-react";
import React from "react";

const ContributerCard = ({ dp, name, points }) => {
  return (
    <div className="flex items-center gap-2 hover:bg-sky-800 p-2 rounded-md mb-2">
      {dp ? (
        <img src={dp} alt="usser-dp" />
      ) : (
        <div className="w-9 h-9 bg-gray-text-30 rounded-full overflow-hidden flex items-center justify-center">
          <User2 />
        </div>
      )}
      <div>
      <h2 className="capitalize ">{name}</h2>
      <p className="text-gray-text-50 font-light text-sm">{points}</p>
      </div>
    </div>
  );
};

export default ContributerCard;
