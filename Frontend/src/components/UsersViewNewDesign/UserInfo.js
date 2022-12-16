import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPatientInfo,
  clearCard,
} from "../../features/Admin/userRequestInfoSlice";
import PatientExtras from "../UsersView/DifferentUsersExtras/PatientExtras";
import { XCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import AddressData from "../UsersView/DifferentUsersExtras/AddressData";
import { useState } from "react";
import UpdateUser from "./UpdateUser";
import PatientExtraData from "./updateUserExtras/PatientExtraData";
function UserInfo(props) {
  const [editUser, setEditUser] = useState("false");
  const {
    id,
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
    userType,
    isFetching,
  } = useSelector((store) => store.userRequestInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatientInfo(props.id));
  }, []);
  return (
    <div className="bg-amber-50 rounded-md   ">
      <div className="flex float-right items-center">
        <PencilSquareIcon
          className="h-7 w-7 cursor-pointer"
          onClick={() => {
            setEditUser("true");
          }}
        />
        <XCircleIcon
          className=" h-10 w-10 p-1  float-right cursor-pointer "
          color="#8b5cf6"
          onClick={() => {
            props.setShowUserDetails("false");
            props.setUserDetailShown("false");
            dispatch(clearCard());
          }}
        />
      </div>
      {isFetching === false ? (
        editUser === "false" ? (
          <div className="flex">
            <div className="flex-col border-r-2 p-4 space-y-2 border-gray-200">
              <div className="text-gray-400 flex  ">
                Name
                <div className="text-indigo-400 px-4 ">
                  {firstName} {lastName}
                </div>
              </div>
              <div className="text-gray-400 flex">
                Email<div className="text-indigo-400 px-4"> {email} </div>
              </div>
              <div className="text-gray-400 flex">
                Age <div className="text-indigo-400 px-4">{age}</div>
              </div>
              <div className="text-gray-400 flex ">
                Gender{" "}
                {gender === "MALE" ? (
                  <div className="rounded-md shadow-sky-300 text-sky-500 bg-sky-200 shadow-md text-center border px-4 mx-2">
                    Male
                  </div>
                ) : (
                  <div className="rounded-md shadow-pink-300 text-pink-700 bg-pink-200 shadow-md text-center border px-4 mx-2">
                    Female
                  </div>
                )}
              </div>
              <div className="text-gray-400 flex">
                Date of birth{" "}
                <div className="text-indigo-400 px-3">{dateOfBirth}</div>
              </div>
            </div>
            <div className="flex-col border-r-2 p-4 space-y-6 border-gray-200">
              <AddressData addressId={addressId} district="Śródmieście" />

              <div className="text-gray-400 flex ">
                User type
                {userType === "PATIENT" ? (
                  <div className="rounded-md shadow-teal-300 bg-teal-100 shadow-md text-teal-600 text-center border px-4 mx-2">
                    Patient
                  </div>
                ) : userType === "CAREGIVER" ? (
                  <div className="rounded-md shadow-amber-300 bg-amber-100 shadow-md text-amber-500 text-center border px-4 mx-2">
                    Caregiver
                  </div>
                ) : (
                  <div className="rounded-md shadow-blue-300 bg-blue-100 shadow-md text-blue-600 text-center border px-4">
                    Social worker
                  </div>
                )}
              </div>
            </div>
            {userType === "PATIENT" || userType === "CAREGIVER" ? (
              <PatientExtras
                userType={userType}
                registeredBy={registeredBy}
                illnessType={illnessType}
                conditionDescription={conditionDescription}
                caregivers={caregivers}
              />
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <UpdateUser
            id={id}
            firstName={firstName}
            lastName={lastName}
            email={email}
            age={age}
            dateOfBirth={dateOfBirth}
            gender={gender}
            addressId={addressId}
            userType={userType}
            illnessType={illnessType}
            registeredBy={registeredBy}
            conditionDescription={conditionDescription}
          />
        )
      ) : (
        <div className="w-full text-center text-2xl mx-auto ">
          Loading user data...
        </div>
      )}
    </div>
  );
}

export default UserInfo;
