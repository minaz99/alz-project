import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getPatientInfo } from "../features/Admin/userRequestInfoSlice";
import PatientExtraData from "./usersExtras/PatientExtraData";
import CaregiverExtraData from "./usersExtras/CaregiverExtraData";
import NavBar from "./NavBar";
import PatientsOrCaregivers from "./PatientsOrCaregivers";
import { ArrowLeftOnRectangleIcon } from "react-native-heroicons/outline";
const Homepage = () => {
  const [activeView, setActiveView] = useState("pd");
  const dispatch = useDispatch();
  const {
    params: { id, typeOfUser },
  } = useRoute();
  const navigation = useNavigation();
  const {
    firstName,
    lastName,
    email,
    dateOfBirth,
    age,
    gender,
    addressId,
    illnessType,
    conditionDescription,
    caregivers,
    needs,
    patients,
    registeredBy,
    userType,
    phoneNumber,
    urlPatient,
    urlCaregiver,
    urlSocialworker,
  } = useSelector((store) => store.userRequestInfo);
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  useEffect(() => {
    if (typeOfUser === "Patient")
      dispatch(getPatientInfo(`${urlPatient}${id}`));
    if (typeOfUser === "Caregiver")
      dispatch(getPatientInfo(`${urlCaregiver}${id}`));
    if (typeOfUser === "Socialworker")
      dispatch(getPatientInfo(`${urlSocialworker}${id}`));
  }, []);
  return (
    <SafeAreaView className="p-4 h-full">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("UserTypes");
        }}
        className="mx-72 p-2  my-1"
      >
        <ArrowLeftOnRectangleIcon className="w-16 h-16" color="gray" />
      </TouchableOpacity>
      <NavBar
        userType={typeOfUser}
        activeView={activeView}
        setActiveView={setActiveView}
      />
      {activeView === "pd" ? (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
          className="flex-col  p-4 my-4 space-y-2 rounded-xl"
        >
          <View className="rounded-2xl bg-violet-100 p-2">
            <View className="p-3">
              <Text className="rounded-full   text-center bg-teal-100 shadow-md p-2  mx-auto w-10 h-10">
                {firstName.slice(0, 3)}
              </Text>
            </View>
            <View className="flex-row items-center mx-auto p-1">
              <Text className="tracking-widest text-lg text-black ">
                {firstName} {lastName}
              </Text>
            </View>
            <View className="flex-row items-center mx-auto  p-1">
              <Text className="text-lg  text-black ">{email}</Text>
            </View>
          </View>
          <View className="flex-row items-center bg-violet-100 rounded-xl p-2">
            <Text className="text-lg text-violet-500">Date of birth:</Text>
            <Text className="text-lg mx-2 my-2">{dateOfBirth}</Text>
          </View>
          <View className="flex-row items-center bg-violet-100 rounded-xl p-2">
            <Text className="text-lg text-violet-500">Age:</Text>
            <Text className="text-lg mx-2 my-2">{age}</Text>
          </View>
          <View className="flex-row items-center bg-violet-100 rounded-xl p-2">
            <Text className="text-lg text-violet-500">Gender:</Text>
            <Text className="text-lg mx-2 my-2">
              {gender === "MALE" ? "Male" : "Female"}
            </Text>
          </View>
          <View className="flex-row items-center bg-violet-100  rounded-xl p-2">
            <ScrollView horizontal={true}>
              <Text className="text-lg text-violet-500">Address:</Text>
              <Text className="text-lg mx-2 ">{addressId}</Text>
            </ScrollView>
          </View>
          <View className="flex-row items-center bg-violet-100 rounded-xl my-2 p-2">
            <Text className="text-lg text-violet-500">Phone number:</Text>
            <Text className="text-lg mx-2 my-2">+48 {phoneNumber}</Text>
          </View>
          {typeOfUser === "Patient" ? (
            <PatientExtraData
              illnessType={illnessType}
              conditionDescription={conditionDescription}
            />
          ) : typeOfUser === "Caregiver" ? (
            <CaregiverExtraData needs={needs} />
          ) : (
            <Text></Text>
          )}
        </ScrollView>
      ) : (
        <PatientsOrCaregivers typeOfUser={typeOfUser} id={id} />
      )}
    </SafeAreaView>
  );
};

export default Homepage;
