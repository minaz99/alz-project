import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneTypeOfUsers } from "../../../features/Admin/patientsAndCaregivers";
import UserData from "./UserData";
import { UserPlusIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { deletePCandCP } from "../../../features/Admin/deletePCandCPSlice";
function AddCaregiverToPatient(props) {
  const { caregiverUrl, users } = useSelector(
    (store) => store.patientsAndCaregivers
  );
  const { patientsCaregivers, Fetching } = useSelector(
    (store) => store.deletePCandCP
  );
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  useEffect(() => {
    dispatch(getOneTypeOfUsers(caregiverUrl));
  }, []);
  return (
    <div className="bg-amber-50 shadow-md rounded-md p-2 space-y-2   ">
      <XCircleIcon
        onClick={() => {
          props.setAddCaregiver("false");
        }}
        className="w-6 h-6 float-right cursor-pointer"
      />
      <div className="text-center">
        Add caregviers to {props.firstName} {props.lastName}
      </div>
      <div className=" flex items-center">
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="bg-violet-100 rounded-md flex-1  justify-center text-center"
          placeholder="Enter caregiver email"
        />
        {Fetching === false ? (
          <UserPlusIcon
            className="w-6 h-6 mx-1 cursor-pointer"
            onClick={() => {
              dispatch(
                deletePCandCP(
                  `${patientsCaregivers}${props.id}/caregivers?caregiverId=${
                    users.find((person) => person.email === email).id
                  }`
                )
              );
            }}
          />
        ) : (
          <div>Adding caregiver....</div>
        )}
      </div>
    </div>
  );
}

export default AddCaregiverToPatient;
