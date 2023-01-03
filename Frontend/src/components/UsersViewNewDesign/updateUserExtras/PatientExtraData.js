import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePCandCP } from "../../../features/Admin/deletePCandCPSlice";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { getData } from "../../../features/Admin/managePatientsCaregiversSlice";
import Card from "../Adding p to c and c to p/Card";
function PatientExtraData(props) {
  const dispatch = useDispatch();
  const { users, patientsCaregivers } = useSelector(
    (store) => store.managePatientsCaregivers
  );
  const { Fetching } = useSelector((store) => store.deletePCandCP);
  useEffect(() => {
    dispatch(getData(`${patientsCaregivers}${props.id}/caregivers`));
  }, [Fetching]);
  return (
    <div className="space-y-2 flex-col p-4">
      <div className="flex  text-gray-400 items-center">
        Registered by
        <input
          name="registeredBy"
          type="text"
          value={props.registeredBy}
          className="text-violet-400/90 rounded-md bg-violet-200/40 p-1 mx-2 w-fit"
          disabled
        />
      </div>
      <div className="flex  text-gray-400 items-center">
        Illness
        <select
          name="Illness"
          className="text-violet-400/90 rounded-md bg-violet-200/40 pl-8 pr-12 text-gray-400 p-1 mx-2 w-"
          value={props.illnessType}
          required
          onChange={(e) => {
            props.setIllnessType(e.target.value);
          }}
        >
          <option value="none">Select type of Illness</option>
          <option value="Vascular Dementia">Vascular Dementia</option>
          <option value="Mixed Dementia">Mixed Dementia</option>
          <option value="Parkinson Disease">Parkison Disease</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="flex  text-gray-400 items-center">
        Condition description
        <textarea
          name="Current condition description"
          type="text"
          value={props.conditionDescription}
          className="text-violet-400/90 rounded-md bg-violet-200/40 p-1 mx-2 w-9/12 h-44 "
          required
          onChange={(e) => {
            props.setConditionDescription(e.target.value);
          }}
        />
      </div>
      <div className="flex  text-gray-400 items-center">
        Caregivers
        <div className="border bg-amber-100/60 shadow-md rounded-md mx-2 p-3">
          <ul className="flex-col space-y-1 text-sm">
            {users.map((patient) => {
              return (
                <li>
                  <div
                    key={patient.id}
                    className="  items-center p-1 rounded-md shadow-amber-300 bg-amber-100 shadow-md text-amber-500"
                  >
                    {patient.firstName} {patient.lastName}
                    <div> {patient.email} </div>
                    <div className="mx-auto">
                      <MinusCircleIcon
                        className="h-5 w-5 my-1 mx-auto cursor-pointer "
                        onClick={() => {
                          dispatch(
                            deletePCandCP(
                              `${patientsCaregivers}/${props.id}/caregivers/${patient.id}`
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
          <PlusCircleIcon
            onClick={() => {
              props.setAddCaregiver("true");
              //alert(props.addCaregiver);
            }}
            className="h-6 w-6 cursor-pointer mx-auto my-2"
          />
        </div>
      </div>
    </div>
  );
}

export default PatientExtraData;
