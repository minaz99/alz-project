import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EllipsisHorizontalCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { getData } from "../../../features/Admin/managePatientsCaregiversSlice";
function PatientsCaregivers(props) {
  const [showList, setShowList] = useState(false);
  const dispatch = useDispatch();
  const { users, patientsCaregivers } = useSelector(
    (store) => store.managePatientsCaregivers
  );
  useEffect(() => {
    dispatch(getData(`${patientsCaregivers}${props.id}/caregivers`));
  }, []);
  return (
    <div className="flex">
      <div className="mx-2"> {users.length}</div>
      <EllipsisHorizontalCircleIcon
        className="h-6 w-6 cursor-pointer"
        onClick={() => {
          setShowList(!showList);
        }}
      />
      {showList === true ? (
        <div className="border bg-amber-100/60 shadow-md rounded-md mx-2 p-3">
          <ul className="flex-col space-y-1 text-sm">
            {users.map((caregiver) => {
              return (
                <li>
                  <div className=" p-1 rounded-md shadow-amber-300  bg-amber-100 shadow-md text-amber-500 ">
                    {caregiver.firstName} {caregiver.lastName}{" "}
                    <div> {caregiver.email} </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default PatientsCaregivers;
