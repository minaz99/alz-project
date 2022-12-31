import React from "react";

function MapPatientExtras(props) {
  return (
    <div className="text-white bg-violet-400 rounded-md  p-2">
      <div className="flex text-gray-500">
        Illness:
        <div className="text-white mx-1">{props.illnessType}</div>
      </div>
      <div className="flex text-gray-500">
        Condition description:
        <div className="text-white mx-1">{props.conditionDescription}</div>
      </div>
    </div>
  );
}

export default MapPatientExtras;
