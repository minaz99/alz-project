import React from "react";
import Navigation from "../Dashboard/Navigation";
import UserRequests from "./UserRequests";

function SocialWorkersRequests() {
  return (
    <div className="container mx-auto ">
      <div className="bg-violet-400/80 mx-48 items-center h-full  p-2 justify-center rounded-md">
        <Navigation />
        <UserRequests />
      </div>
    </div>
  );
}

export default SocialWorkersRequests;
