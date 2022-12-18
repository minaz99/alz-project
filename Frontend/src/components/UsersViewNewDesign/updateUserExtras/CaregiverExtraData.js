import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePCandCP } from "../../../features/Admin/deletePCandCPSlice";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { getData } from "../../../features/Admin/managePatientsCaregiversSlice";
function CaregiverExtraData(props) {
  const dispatch = useDispatch();
  const { users, caregiversPatients } = useSelector(
    (store) => store.managePatientsCaregivers
  );
  const { Fetching } = useSelector((store) => store.deletePCandCP);
  useEffect(() => {
    dispatch(getData(`${caregiversPatients}/${props.id}/patients`));
  }, [Fetching]);
  return (
    <div className="space-y-2 flex-col p-4">
      <div className="flex  text-gray-400 items-center">
        Phone number
        <input
          name="phoneNumber"
          type="text"
          value={props.phoneNumber}
          className="text-violet-400/90 rounded-md bg-violet-200/40 p-1 mx-2 w-fit"
          onChange={(e) => {
            props.setPhoneNumber(e.target.value);
          }}
        />
      </div>

      <div className="flex  text-gray-400 items-center">
        Needs
        <textarea
          name="Current condition description"
          type="text"
          value={props.needs}
          className="text-violet-400/90 rounded-md bg-violet-200/40 p-1 mx-2 w-9/12 h-44 "
          //required
          onChange={(e) => {
            props.setNeeds(e.target.value);
          }}
        />
      </div>
      <div className="flex  text-gray-400 items-center">
        Patients{" "}
        <div className="border bg-teal-100/60 shadow-md rounded-md mx-2 p-3">
          <ul className="flex-col space-y-1 text-sm">
            {users.map((patient) => {
              return (
                <li>
                  <div
                    key={patient.id}
                    className=" flex items-center p-1 rounded-md shadow-teal-300 bg-teal-100 shadow-md text-teal-600 "
                  >
                    {patient.firstName} {patient.lastName}
                    <div className="items-center">
                      <MinusCircleIcon
                        className="h-5 w-5 mx-1 cursor-pointer "
                        onClick={() => {
                          dispatch(
                            deletePCandCP(
                              `${caregiversPatients}/${props.id}/patients/${patient.id}`
                            )
                          );
                        }}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <PlusCircleIcon className="h-6 w-6 cursor-pointer mx-auto my-1" />
        </div>
      </div>
    </div>
  );
}

export default CaregiverExtraData;
