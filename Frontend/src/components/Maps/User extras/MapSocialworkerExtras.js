import React from "react";

function MapSocialworkerExtras(props) {
  return (
    <div className="">
      <div className="flex text-gray-500">
        Needs:
        <div className="text-blue-500 mx-1">{props.needs}</div>
      </div>
    </div>
  );
}

export default MapSocialworkerExtras;
