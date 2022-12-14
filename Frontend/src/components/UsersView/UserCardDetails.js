import React from "react";
import PatientExtras from "./DifferentUsersExtras/PatientExtras";
import CaregiverExtras from "./DifferentUsersExtras/CaregiverExtras";
import SocialWorkerExtras from "./DifferentUsersExtras/SocialWorkerExtras";
import { useDispatch, useSelector } from "react-redux";
import {
  getPatientInfo,
  clearCard,
} from "../../features/Admin/userRequestInfoSlice";
import {
  getPatients,
  setOneUser,
  deleteOneUser,
} from "../../features/Admin/userRequestsSlice";
import { useEffect } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { deletePatient } from "../../features/Admin/deletePatientSlice";
function UserCardDetails(props) {
  const {
    firstName,
    lastName,
    email,
    dateOfBirth,
    age,
    gender,
    addressId,
    illnessType,
    conditionDescription,
    caregivers,
    registeredBy,
    isFetching,
  } = useSelector((store) => store.userRequestInfo);
  const { fetching } = useSelector((store) => store.deletePatient);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatientInfo(props.id));
  }, []);
  const userType = "Patient";
  return (
    <div
      id="patientCard"
      className=" bg-violet-300/80 mx-auto p-4 text-xl justify-center right-1/4 left-1/4 rounded-lg pointer-events-auto absolute "
    >
      <XCircleIcon
        className="h-12 w-12 float-right cursor-pointer"
        color="#8b5cf6"
        onClick={() => {
          props.setShowUserDetails("false");
          // props.setUpdate(!props.update);
          dispatch(clearCard());
        }}
      />
      {isFetching === false ? (
        <div className="p-6 flex-col space-y-2">
          <div id="a1" className="text-center text-violet-600">
            {userType}
          </div>
          <div className="text-neutral-600">
            Name: {firstName} {lastName}
          </div>
          <div className="text-neutral-600">Email: {email}</div>
          <div className="text-neutral-600">Date of birth: {dateOfBirth}</div>
          <div className="text-neutral-600">Age: {age}</div>
          <div className="text-neutral-600">Gender: {gender}</div>
          <div className="text-neutral-600">Address: {addressId}</div>
          {userType === "Patient" ? (
            <PatientExtras
              illness={illnessType}
              description={conditionDescription}
              caregivers={caregivers}
              registeredBy={registeredBy}
            />
          ) : userType === "Caregiver" ? (
            <CaregiverExtras />
          ) : (
            <SocialWorkerExtras />
          )}
          <button
            onClick={() => {
              props.setShowUserDetails("false");
              //props.setUpdate(!props.update);
              dispatch(deletePatient(props.id));
              dispatch(deleteOneUser());
            }}
            className="bg-black font-semibold text-violet-500 rounded-md p-2 float-right"
          >
            Delete
          </button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default UserCardDetails;