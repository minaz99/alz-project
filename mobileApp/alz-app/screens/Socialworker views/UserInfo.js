import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import PatientExtras from "../Register screens/PatientExtras";
import CaregiverExtras from "../Register screens/CaregiverExtras";
import PatientsOrCaregivers from "../PatientsOrCaregivers";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getPatientInfo,
  clearCard,
} from "../../features/Admin/userRequestInfoSlice";
import PatientExtraData from "../usersExtras/PatientExtraData";
import CaregiverExtraData from "../usersExtras/CaregiverExtraData";
import {
  PlusCircleIcon,
  UserPlusIcon,
  XCircleIcon,
} from "react-native-heroicons/outline";
import { deletePCandCP } from "../../features/Admin/deletePCandCPSlice";
import { deleteOneUser } from "../../features/Admin/managePatientsCaregiversSlice";
import { getPatients } from "../../features/Admin/userRequestsSlice";
const UserInfo = (props) => {
  const typeOfUser = props.userType === "PATIENT" ? "Patient" : "Caregiver";
  const {
    isFetching,
    urlPatient,
    urlCaregiver,
    firstName,
    lastName,
    email,
    gender,
    age,
    addressId,
    phoneNumber,
    illnessType,
    conditionDescription,
    needs,
  } = useSelector((store) => store.userRequestInfo);
  const { cp, pc } = useSelector((store) => store.deletePCandCP);
  const dispatch = useDispatch();
  const url = props.userType === "PATIENT" ? urlPatient : urlCaregiver;

  const [emailToAdd, setEmailToAdd] = useState("");
  const [plusUser, setPlusUser] = useState(false);
  const { users, patientUrl, caregiverUrl } = useSelector(
    (store) => store.userRequest
  );
  const [userIdToAdd, setUserIdToAdd] = useState("");
  const url2 = props.userType === "PATIENT" ? caregiverUrl : patientUrl;
  useEffect(() => {
    dispatch(getPatientInfo(`${url}${props.id}`));
    dispatch(getPatients(url2));
  }, []);

  return (
    <View className="bg-amber-50 rounded-lg  h-full w-full z-10 p-4">
      <TouchableOpacity
        className="left-64"
        onPress={() => {
          props.setShowUserInfo(false);
        }}
      >
        <XCircleIcon className="w-6 h-6" color={"gray"} />
      </TouchableOpacity>

      {isFetching === false ? (
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <Text className="text-lg">
            Name: {firstName} {lastName}
          </Text>
          <Text className="text-lg">Email: {email}</Text>
          <Text className="text-lg">Gender: {gender}</Text>
          <Text className="text-lg">Age: {age}</Text>
          <Text className="text-lg">Address: {addressId}</Text>
          <Text className="text-lg">Phone number: +48 {phoneNumber}</Text>
          {props.userType === "PATIENT" ? (
            <PatientExtraData
              illnessType={illnessType}
              conditionDescription={conditionDescription}
            />
          ) : (
            <CaregiverExtraData needs={needs} />
          )}

          <PatientsOrCaregivers
            socialworker={true}
            typeOfUser={typeOfUser}
            id={props.id}
          />
          <TouchableOpacity
            className="mx-auto"
            onPress={() => {
              setPlusUser(!plusUser);
            }}
          >
            <PlusCircleIcon className="w-6 h-6 " color={"gray"} />
          </TouchableOpacity>
          {plusUser === true ? (
            <View className="my-2 bg-violet-100 rounded-md mx-auto p-4 text-lg space-x-2 items-center flex-row">
              <TextInput
                keyboardType="email-address"
                placeholder="Email of user you want to add"
                value={emailToAdd}
                onChangeText={setEmailToAdd}
                className="text-lg"
              />
              <TouchableOpacity
                onPress={() => {
                  let id = -1;
                  users.forEach((person) => {
                    person.email === emailToAdd
                      ? (id = person.id)
                      : setUserIdToAdd(userIdToAdd);
                  });

                  const url =
                    typeOfUser === "Patient"
                      ? `${pc}${props.id}/caregivers?caregiverId=${id}`
                      : `${cp}${props.id}/patients?patientId=${id}`;
                  dispatch(deletePCandCP(url));
                  dispatch(deleteOneUser());
                  setPlusUser(false);
                }}
              >
                <UserPlusIcon className="w-6 h-6" color={"gray"} />
              </TouchableOpacity>
            </View>
          ) : (
            <Text></Text>
          )}
        </ScrollView>
      ) : (
        <Text className="text-center text-lg">Loading...</Text>
      )}
    </View>
  );
};

export default UserInfo;
