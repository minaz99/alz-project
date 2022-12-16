import React from "react";

function PatientExtras(props) {
  return (
    <div className="flex-col p-4 space-y-2 ">
      <div className="text-gray-400 flex">
        Registered by
        <div className="text-indigo-400 px-4">{props.registeredBy}</div>
      </div>
      <div className="text-gray-400 flex">
        Illness{" "}
        <div className="rounded-md shadow-fuchsia-300 bg-fuchsia-100 shadow-md text-fuchsia-600 text-center border px-4 mx-2">
          {props.illnessType}
        </div>
      </div>
      <div className="text-gray-400 flex">
        Illness condition description
        <div className="text-indigo-400 px-4 -mx-2">
          {props.conditionDescription}
        </div>
      </div>
      <div className="text-gray-400 flex">
        Caregivers{" "}
        <div className="text-indigo-400 px-4">{props.caregivers}</div>
      </div>
    </div>
  );
}

export default PatientExtras;
