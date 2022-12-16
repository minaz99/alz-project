import React from "react";
import { useState } from "react";
import PatientExtraData from "./updateUserExtras/PatientExtraData";
import { updatePatient } from "../../features/Admin/updatePatientSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearCard } from "../../features/Admin/userRequestInfoSlice";
function UpdateUser(props) {
  const { isFetching } = useSelector((store) => store.updatePatient);
  const dispatch = useDispatch();
  const [firstName, setFirstname] = useState(props.firstName);
  const [lastName, setLastname] = useState(props.lastName);
  const [email, setEmail] = useState(props.email);
  //const [dateOfBirth, setDateOfBirth] = useState(props.dateOfBirth);
  //const [gender, setGender] = useState(props.gender);
  const [addressId, setAddressId] = useState(props.addressId);
  const [conditionDescription, setConditionDescription] = useState(
    props.conditionDescription
  );
  const [illnessType, setIllnessType] = useState(props.illnessType);

  return (
    <div>
      {isFetching === false ? (
        <div className="flex">
          <div className="space-y-5 flex-col   border-r-2 p-4  border-gray-200">
            <div className="flex-row  text-gray-400 items-center break-keep">
              First name
              <input
                name="fname"
                type="text"
                value={firstName}
                className=" rounded-md  text-violet-400/90 bg-violet-200/40 p-1 mx-2 w-7/12 "
                required
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
              />
            </div>
            <div className="flex  text-gray-400 items-center">
              Last name
              <input
                name="lname"
                type="text"
                value={lastName}
                className="rounded-md text-violet-400/90 bg-violet-200/40 p-1 mx-2 w-7/12"
                required
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
              />
            </div>
            <div className="flex  text-gray-400 items-center">
              Email
              <input
                name="email"
                type="email"
                value={email}
                className="rounded-md text-violet-400/90 bg-violet-200/40 p-1 mx-2  w-fit"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="flex  text-gray-400 items-center">
              Gender
              <input
                name="gender"
                type="text"
                value={props.gender}
                className="rounded-md text-violet-400/90 bg-violet-200/40 p-1 mx-2 w-8/12"
                disabled
              />
            </div>
          </div>
          <div className="flex-col border-r-2 p-4 space-y-5 border-gray-200">
            <div className="flex  text-gray-400 items-center">
              Address
              <input
                name="address"
                type="text"
                value={addressId}
                className="rounded-md text-violet-400/90 bg-violet-200/40 p-1 mx-2 w-fit"
                required
                onChange={(e) => {
                  setAddressId(e.target.value);
                }}
              />
            </div>
            <div className="flex  text-gray-400 items-center">
              Age
              <input
                name="age"
                type="number"
                value={props.age}
                className="rounded-md text-violet-400/90 bg-violet-200/40 p-1 mx-2 w-10/12"
                disabled
              />
            </div>

            <div className="flex  text-gray-400 items-center">
              Date of birth
              <input
                name="dateOfBirth"
                type="date"
                value={props.dateOfBirth}
                className="rounded-md text-violet-400/90 bg-violet-200/40 p-1 mx-2 w-7/12"
                disabled
              />
            </div>
            <div className="flex  text-gray-400 items-center">
              User type
              <input
                name="userType"
                type="text"
                value={props.userType}
                className="rounded-md text-violet-400/90 bg-violet-200/40 p-1 mx-2 w-8/12"
                disabled
              />
            </div>
          </div>

          <PatientExtraData
            illnessType={illnessType}
            registeredBy={props.registeredBy}
            conditionDescription={conditionDescription}
            setIllnessType={setIllnessType}
            setConditionDescription={setConditionDescription}
          />
          <button
            className="rounded-md my-auto   bg-violet-300/40 p-2 h-5/6 items-end"
            onClick={() => {
              const data = {
                id: props.id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                addressId: addressId,
                illnessType: illnessType,
                conditionDescription: conditionDescription,
              };
              dispatch(updatePatient(data));
            }}
          >
            Save
          </button>
        </div>
      ) : (
        <div>Updating user...</div>
      )}
    </div>
  );
}

export default UpdateUser;
