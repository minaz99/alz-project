import React from "react";
import PatientsCaregivers from "../../UsersViewNewDesign/updateUserExtras/PatientsCaregivers";

function PatientExtras(props) {
  return (
    <div className="flex-col p-4 items-center   space-y-2 ">
      <div className="text-gray-400 items-center mx-1  flex">
        Illness{" "}
        {props.illnessType.split("-").map((ill) => {
          return (
            <div className="rounded-md w-fit shadow-fuchsia-300 bg-fuchsia-100 shadow-md text-fuchsia-600 text-center border px-4 mx-1">
              {ill}
            </div>
          );
        })}
      </div>
      <div className="text-gray-400 flex">
        Illness condition description
        <div className="text-indigo-400 px-4 -mx-2">
          {props.conditionDescription}
        </div>
      </div>
      <div className="text-gray-400 flex">
        Needs <div className="text-indigo-400 px-4 -mx-2">{props.needs}</div>
      </div>
      <div className="text-gray-400 flex">
        Caregivers <PatientsCaregivers id={props.id} />
      </div>
    </div>
  );
}

export default PatientExtras;
