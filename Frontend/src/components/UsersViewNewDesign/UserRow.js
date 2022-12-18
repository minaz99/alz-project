import React from "react";
import { useState } from "react";
import UserInfo from "./UserInfo";
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  setOneUser,
  deleteOneUser,
} from "../../features/Admin/userRequestsSlice";
import { deletePatient } from "../../features/Admin/deletePatientSlice";
import { useDispatch, useSelector } from "react-redux";
function UserRow(props) {
  const { urlPatient, urlCaregiver } = useSelector(
    (store) => store.deletePatient
  );
  const dispatch = useDispatch();
  const [showUserDetails, setShowUserDetails] = useState("false");
  return showUserDetails === "false" ? (
    <div className="flex text-md   " key={props.id}>
      <div className=" border-b w-48 px-2 border-slate-600 p-2">
        <div className="border rounded-md bg-amber-50 text-center text-slate-600 shadow-bg-300 shadow-md  ">
          {props.firstName} {props.lastName}
        </div>
      </div>
      <div className=" border-b w-56 px-2 p-2 border-slate-600">
        <div className="rounded-md shadow-indigo-300 bg-indigo-100 shadow-md text-indigo-400 text-center border">
          {props.email}
        </div>
      </div>
      <div className=" border-b w-48 px-2 p-2 border-slate-600">
        {props.gender === "MALE" ? (
          <div className="rounded-md shadow-sky-300 text-sky-500 bg-sky-200 shadow-md text-center border">
            Male
          </div>
        ) : (
          <div className="rounded-md shadow-pink-300 text-pink-700 bg-pink-200 shadow-md text-center border">
            Female
          </div>
        )}
      </div>
      <div className=" border-b w-48 px-2 p-2 border-slate-600">
        <div className="rounded-md shadow-lime-300 bg-lime-100 shadow-md text-lime-600 text-center border">
          {props.age}
        </div>
      </div>
      <div className=" border-b w-48 px-2 p-2 border-slate-600">
        {props.userType === "PATIENT" ? (
          <div className="rounded-md shadow-teal-300 bg-teal-100 shadow-md text-teal-600 text-center border">
            Patient
          </div>
        ) : props.userType === "CAREGIVER" ? (
          <div className="rounded-md shadow-amber-300 bg-amber-100 shadow-md text-amber-500 text-center border">
            Caregiver
          </div>
        ) : (
          <div className="rounded-md shadow-blue-300 bg-blue-100 shadow-md text-blue-600 text-center border">
            Social worker
          </div>
        )}
      </div>{" "}
      <ChevronDownIcon
        onClick={() => {
          if (props.userDetailShown === "false") {
            setShowUserDetails("true");
            props.setUserDetailShown("true");
          }
        }}
        className="items-center my-auto h-8 w-8 p-1  float-right cursor-pointer "
      />
      <TrashIcon
        onClick={() => {
          // props.setShowUserDetails("false");
          //props.setUpdate(!props.update);
          if (props.userType === "PATIENT") {
            dispatch(deletePatient(`${urlPatient}${props.id}`));
            dispatch(deleteOneUser());
          } else if (props.userType === "CAREGIVER") {
            dispatch(deletePatient(`${urlCaregiver}${props.id}`));
            dispatch(deleteOneUser());
          }
          //alert(props.id);
        }}
        className="items-center my-auto h-7 w-7 p-1  float-right cursor-pointer"
      />
    </div>
  ) : (
    <div className="p-1">
      <UserInfo
        id={props.id}
        userType={props.userType}
        setUserDetailShown={props.setUserDetailShown}
        setShowUserDetails={setShowUserDetails}
      />
    </div>
  );
}

export default UserRow;
