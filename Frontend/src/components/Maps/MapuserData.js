import { XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import MapCaregiverExtras from "./User extras/MapCaregiverExtras";
import MapPatientExtras from "./User extras/MapPatientExtras";
import MapSocialworkerExtras from "./User extras/MapSocialworkerExtras";

function MapuserData(props) {
  return (
    <div className="bg-white w-fit rounded-lg   flex-col float-right h-screen p-2 items-start space-y-4">
      <XCircleIcon
        className="w-6 h-6 float-right cursor-pointer"
        color={"violet"}
        onClick={() => props.setShowData(false)}
      />
      <div className="text-center text-violet-300 text-lg tracking-wider">
        {props.userType}
      </div>
      <div className="text-white bg-indigo-400 rounded-md p-2">
        <div className="flex text-gray-500">
          Name:
          <div className="mx-1 text-white">
            {props.firstName} {props.lastName}
          </div>
        </div>
        <div className="flex text-gray-500">
          Email:
          <div className="text-white mx-1">{props.email}</div>
        </div>
      </div>
      <div className="text-white bg-teal-400/80 rounded-md p-2">
        <div className="flex text-gray-500">
          Gender:
          <div className="mx-1 text-white"> {props.gender}</div>
        </div>

        <div className="flex text-gray-500">
          Date of birth:
          <div className="mx-1 text-white">{props.dateOfBirth}</div>
        </div>
        <div className="flex text-gray-500">
          Age:
          <div className="mx-1 text-white">{props.age}</div>
        </div>
      </div>
      <div className="text-white bg-amber-400 rounded-md  p-2">
        <div className="flex text-gray-500">
          Address:
          <div className="text-white mx-1">{props.addressId}</div>
        </div>
        <div className="flex text-gray-500">
          Phone number:
          <div className="text-white mx-1">{props.phoneNumber}</div>
        </div>
      </div>
      {props.userType === "Patient" ? (
        <MapPatientExtras
          illnessType={props.illnessType}
          conditionDescription={props.conditionDescription}
        />
      ) : props.userType === "Caregiver" ? (
        <MapCaregiverExtras needs={props.needs} />
      ) : (
        <MapSocialworkerExtras needs={props.needs} />
      )}
    </div>
  );
}

export default MapuserData;
