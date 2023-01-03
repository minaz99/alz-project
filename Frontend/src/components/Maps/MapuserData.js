import { XCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import MapCaregiverExtras from "./User extras/MapCaregiverExtras";
import MapPatientExtras from "./User extras/MapPatientExtras";
import MapSocialworkerExtras from "./User extras/MapSocialworkerExtras";
import PatientExtras from "../UsersView/DifferentUsersExtras/PatientExtras";
import CaregiverExtras from "../UsersView/DifferentUsersExtras/CaregiverExtras";
function MapuserData(props) {
  return (
    <div className="bg-white  rounded-lg   flex-col float-right h-screen p-2 items-start space-y-4">
      <XCircleIcon
        className="w-6 h-6 float-right cursor-pointer"
        color={"violet"}
        onClick={() => props.setShowData(false)}
      />
      <div className="text-center text-violet-300 text-lg tracking-wider">
        {props.userType}
      </div>
      <div className="text-white  bg-indigo-400 rounded-md p-2">
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
      <div className="text-white  bg-teal-400/80 rounded-md p-2">
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
      <div className="text-white  bg-amber-400 rounded-md  p-2">
        <div className="flex text-gray-500">
          Address:
          <div className="text-white mx-1">{props.addressId}</div>
        </div>
        <div className="flex text-gray-500">
          Phone number:
          <div className="text-white mx-1">{props.phoneNumber}</div>
        </div>
      </div>
      <div className="bg-violet-100 rounded-md  p-2">
        {props.userType === "PATIENT" ? (
          <div>
            <PatientExtras
              illnessType={props.illnessType}
              conditionDescription={props.conditionDescription}
              caregivers={props.caregivers}
              id={props.id}
              needs={props.needs}
            />

            <div className="text-gray-400 mx-4 flex">
              Registered by
              <div className="text-indigo-400 px-4">{props.registeredBy}</div>
            </div>
          </div>
        ) : props.userType === "CAREGIVER" ? (
          <CaregiverExtras
            needs={props.needs}
            patients={props.patients}
            id={props.id}
            mapView={true}
          />
        ) : (
          <MapSocialworkerExtras needs={props.needs} />
        )}
      </div>
    </div>
  );
}

export default MapuserData;
