import React from "react";
import Navigation from "../Dashboard/Navigation";
function OutlineCard() {
  return (
    <div className="container mx-auto ">
      <div className="bg-violet-400/80 mx-48 items-center h-full  p-2 justify-center rounded-md">
        <Navigation />
        <div className="bg-white rounded-md "> hello there </div>
      </div>
    </div>
  );
}

export default OutlineCard;
