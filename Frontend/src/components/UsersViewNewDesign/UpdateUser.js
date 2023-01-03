import React from "react";
import { useState } from "react";
import PatientExtraData from "./updateUserExtras/PatientExtraData";
import { updatePatient } from "../../features/Admin/updatePatientSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearCard } from "../../features/Admin/userRequestInfoSlice";
import CaregiverExtras from "../UsersView/DifferentUsersExtras/CaregiverExtras";
import CaregiverExtraData from "./updateUserExtras/CaregiverExtraData";
import Card from "./Adding p to c and c to p/Card";
function UpdateUser(props) {
  const { isFetching, urlPatient, urlCaregiver, urlSocialworker } = useSelector(
    (store) => store.updatePatient
  );
  const dispatch = useDispatch();
  const urlType =
    props.userType === "PATIENT"
      ? urlPatient
      : props.userType === "CAREGIVER"
      ? urlCaregiver
      : urlSocialworker;
  const [firstName, setFirstname] = useState(props.firstName);
  const [lastName, setLastname] = useState(props.lastName);
  const [email, setEmail] = useState(props.email);
  const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber);
  const [needs, setNeeds] = useState(props.needs);
  //const [dateOfBirth, setDateOfBirth] = useState(props.dateOfBirth);
  //const [gender, setGender] = useState(props.gender);
  const [addressId, setAddressId] = useState(props.addressId);
  const [conditionDescription, setConditionDescription] = useState(
    props.conditionDescription
  );
  const [illnessType, setIllnessType] = useState(props.illnessType);
  const [addCaregiver, setAddCaregiver] = useState("false");

  return (
    <div>
      {isFetching === false ? (
        <div className="flex z-0">
          <div className="space-y-5 flex-col   border-r-2 p-4  border-gray-200">
            <div className="flex-row  text-gray-400 items-center break-keep">
              First name
              <input
                name="fname"
                type="text"
                value={firstName}
                className=" rounded-md  text-violet-400/90 bg-violet-200/40 p-1 mx-2 w-7/12 "
                //required
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
                //  requiredid
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
                //required
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
            {props.userType === "PATIENT" ? (
              <div className="flex  text-gray-400 items-center">
                Phone number
                <input
                  name="phoneNumber"
                  type="text"
                  value={phoneNumber}
                  className="text-violet-400/90 rounded-md bg-violet-200/40 p-1 mx-2 w-fit"
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="flex-col border-r-2 p-4 space-y-5 border-gray-200">
            <div className="flex  text-gray-400 items-center">
              Address
              <input
                name="address"
                type="text"
                value={addressId}
                className="rounded-md text-violet-400/90 bg-violet-200/40 p-1 mx-2 w-fit"
                // required
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
          {props.userType === "PATIENT" ? (
            <PatientExtraData
              illnessType={illnessType}
              registeredBy={props.registeredBy}
              conditionDescription={conditionDescription}
              setIllnessType={setIllnessType}
              setConditionDescription={setConditionDescription}
              caregivers={props.caregivers}
              id={props.id}
              addCaregiver={addCaregiver}
              setAddCaregiver={setAddCaregiver}
            />
          ) : props.userType === "CAREGIVER" ? (
            <CaregiverExtraData
              setPhoneNumber={setPhoneNumber}
              phoneNumber={phoneNumber}
              needs={needs}
              setNeeds={setNeeds}
              patients={props.patients}
              id={props.id}
              addCaregiver={addCaregiver}
              setAddCaregiver={setAddCaregiver}
            />
          ) : (
            <div></div>
          )}
          <button
            className="rounded-md my-auto   bg-violet-300/40 p-2 h-5/6 items-end"
            onClick={() => {
              const data = {
                url: urlType,
                id: props.id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                addressId: addressId,
                illnessType: illnessType,
                conditionDescription: conditionDescription,
                needs: needs,
                phoneNumber: phoneNumber,
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
      {addCaregiver === "true" ? (
        <div className="z-10 absolute inset-y-1/4 inset-x-5 ">
          <Card
            firstName={firstName}
            lastName={lastName}
            setAddCaregiver={setAddCaregiver}
            userType={props.userType}
            id={props.id}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default UpdateUser;
