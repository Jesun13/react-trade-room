import React from "react";
import { CgSandClock } from "react-icons/cg";

export const Timer = ({ minutes, seconds, userId, time }) => {
  return (
    userId === time ? (
     
     <div className="move_time">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
        <div>
          <CgSandClock size="1.5em" className="move_item_clock" />
        </div>
      </div>
      
    ) : null
    
  );
};

