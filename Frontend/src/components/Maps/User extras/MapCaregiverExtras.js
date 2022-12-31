import React from "react";

function MapCaregiverExtras(props) {
  return (
    <div className="text-white bg-violet-400 rounded-md  p-2">
      <div className="flex text-gray-500">
        Needs:
        <div className="text-white mx-1">{props.needs}</div>
      </div>
    </div>
  );
}

export default MapCaregiverExtras;
