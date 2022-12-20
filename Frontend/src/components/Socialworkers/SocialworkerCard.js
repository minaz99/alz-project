import React from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { deletePatient } from "../../features/Admin/deletePatientSlice";
import { activateSocialworker } from "../../features/Admin/activateSocialworkerSlice";
function SocialworkerCard(props) {
  const dispatch = useDispatch();
  const { activateSocialworkerUrl } = useSelector(
    (store) => store.activateSocialworker
  );
  const { urlSocialworkers } = useSelector((store) => store.deletePatient);
  return (
    <div className="flex bg-blue-300 shadow-md w-full rounded-md my-2 p-2 mx-2 shadow-blue-200 ">
      <div className="flex-colflex-1" key={props.id}>
        <div className="flex text-gray-600 ">
          Name{" "}
          <div className="mx-2 text-amber-50">
            {props.firstName} {props.lastName}
          </div>
        </div>
        <div className="flex text-gray-600">
          Email <div className="mx-2 text-amber-50">{props.email}</div>
        </div>
        <div className="flex text-gray-600">
          Address<div className="mx-2 text-amber-50">{props.address}</div>
        </div>
      </div>
      <div className="flex-col mx-16 flex-1">
        <div className="flex text-gray-600">
          Gender <div className="mx-2 text-amber-50">{props.gender}</div>
        </div>
        <div className="flex text-gray-600">
          Age <div className="mx-2 text-amber-50">{props.age}</div>
        </div>
        <div className="flex text-gray-600">
          Phone number{" "}
          <div className="mx-2 text-amber-50">{props.phoneNumber}</div>
        </div>
      </div>
      <div className="flex items-center mx-8 space-x-4">
        <CheckCircleIcon
          className="w-10 h-10 cursor-pointer"
          color="#059669"
          onClick={() => {
            alert(`${activateSocialworkerUrl}${props.id}`);
            dispatch(
              activateSocialworker(`${activateSocialworkerUrl}${props.id}`)
            );
            dispatch(props.deleteOneUser());
          }}
        />
        <XCircleIcon
          className="w-10 h-10 cursor-pointer"
          color="#e11d48"
          onClick={() => {
            dispatch(deletePatient(`${urlSocialworkers}${props.id}`));
            dispatch(props.deleteOneUser());
          }}
        />
      </div>
    </div>
  );
}

export default SocialworkerCard;
