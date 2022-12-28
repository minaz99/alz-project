import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { useNavigation, useRoute } from "@react-navigation/native";
import PersonalInfo from "./Registration Stages/PersonalInfo";
import AdditionalInfo from "./Registration Stages/AdditionalInfo";
import Address from "./Registration Stages/Address";
import {
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon,
} from "react-native-heroicons/outline";
import PatientExtras from "../Register screens/PatientExtras";
import CaregiverExtras from "../Register screens/CaregiverExtras";
import {
  registerPatient,
  resetIsSuccess,
} from "../../features/Admin/PatientRegisterSlice";
import BouncyCheckbox from "react-native-bouncy-checkbox";
const Outline = (props) => {
  const dispatch = useDispatch();
  const { patientUrl, caregiverUrl, socialworkerUrl, isSuccess, isFetching } =
    useSelector((store) => store.patientRegister);
  const navigation = useNavigation();
  const {
    params: { userType, registerBy, id },
  } = useRoute();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const [url, setUrl] = useState(
    userType === "Patient"
      ? patientUrl
      : userType === "Caregiver"
      ? caregiverUrl
      : socialworkerUrl
  );
  const [displayCalender, setDisplayCalender] = useState(false);

  const [activeView, setActiveView] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("Set date of birth");
  const [gender, setGender] = useState("Select gender");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressId, setAddressId] = useState("");
  const [illnessType, setIllnessType] = useState("Select type of illness");
  const [conditionDescription, setConditionDescription] = useState("");
  const [needs, setNeeds] = useState("");
  const [age, setAge] = useState("");
  const [registeredBy, setRegisteredBy] = useState(
    registerBy === "Patient"
      ? "PATIENT"
      : registerBy === "Caregiver"
      ? "CAREGIVER"
      : "SOCIAL_WORKER"
  );

  const correctAddress = (street, appNo, district) => {
    setAddressId(`${street}/${appNo} - ${district}`);
  };

  const registeredSuccessfully = () => {
    if (registerBy === "Patient") {
      navigation.navigate("Login", { userType: userType });
    } else {
      if (registerBy === "caregiver")
        navigation.navigate("Home", { id: id, typeOfUser: userType });
      else
        navigation.navigate("HomeSocialworker", {
          id: id,
          typeOfUser: userType,
        });
    }
    dispatch(resetIsSuccess());
  };

  return (
    <SafeAreaView className="p-4 mt-4">
      <View className="space-y-4">
        <Text className="mt-2 bg-blue-300 rounded-md p-4 text-lg text-center font-bold tracking-widest text-white">
          Register as {userType}
        </Text>
        <View className="bg-violet-300  rounded-lg">
          <TouchableOpacity
            onPress={() => {
              activeView > 0
                ? setActiveView(activeView - 1)
                : id === "-1"
                ? navigation.navigate("Login", { userType: userType })
                : registerBy === "caregiver"
                ? navigation.navigate("Home", {
                    typeOfUser: "Caregiver",
                    id: id,
                  })
                : navigation.navigate("HomeSocialworker", {
                    typeOfUser: userType,
                    id: id,
                  });
            }}
            className="p-3"
          >
            <ArrowLeftCircleIcon className="w-8 h-8" color={"white"} />
          </TouchableOpacity>
          {activeView === 0 ? (
            <PersonalInfo
              firstName={firstName}
              lastName={lastName}
              setFirstName={setFirstName}
              setLastName={setLastName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          ) : activeView === 1 ? (
            <AdditionalInfo
              setGender={setGender}
              setDateOfBirth={setDateOfBirth}
              dateOfBirth={dateOfBirth}
              correctAddress={correctAddress}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
          ) : userType === "Patient" ? (
            <PatientExtras
              illnessType={illnessType}
              setIllnessType={setIllnessType}
              conditionDescription={conditionDescription}
              setConditionDescription={setConditionDescription}
            />
          ) : userType === "Caregiver" || userType === "Socialworker" ? (
            <CaregiverExtras needs={needs} setNeeds={setNeeds} />
          ) : (
            <Text></Text>
          )}

          {activeView < 2 ? (
            <TouchableOpacity
              onPress={() => {
                setActiveView(activeView + 1);
              }}
              className="flex-row p-2 mx-auto  items-center space-x-2"
            >
              <Text className="tracking-wider w-4/5 font-bold text-lg  text-center bg-white rounded-md p-2">
                Next
              </Text>
              <ArrowRightCircleIcon className="w-6 h-6 " color={"white"} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                //correctAddress(street, appNo, district);
                dispatch(
                  registerPatient({
                    url,
                    firstName,
                    lastName,
                    email,
                    password,
                    dateOfBirth,
                    age,
                    gender,
                    phoneNumber,
                    addressId,
                    illnessType,
                    conditionDescription,
                    needs,
                    registeredBy,
                  })
                );
              }}
              className="flex-row p-2 mx-auto  items-center space-x-2"
            >
              <Text className="tracking-wider w-4/5 font-bold text-lg  text-center bg-white rounded-md p-2">
                Submit
              </Text>
              <ArrowRightCircleIcon className="w-6 h-6 " color={"white"} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {userType === "Patient" ? (
        <View className="flex-row items-center float-right">
          <BouncyCheckbox
            isChecked={false}
            className="p-2"
            text={`Registering by: ${registerBy}`}
            disabled={true}
          />
        </View>
      ) : (
        <Text></Text>
      )}

      {isFetching === true ? (
        <Text>Registering...</Text>
      ) : isSuccess === true ? (
        registeredSuccessfully()
      ) : (
        <Text></Text>
      )}
    </SafeAreaView>
  );
};

export default Outline;
