import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getData } from "../features/Admin/managePatientsCaregiversSlice";
import { useNavigation, useRoute } from "@react-navigation/native";
import NavBar from "./NavBar";
import ResponsibleFor from "./usersExtras/ResponsibleFor";
const PatientsOrCaregivers = (props) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const dispatch = useDispatch();
  const {
    users,
    Fetching,
    caregiversPatients,
    patientsCaregivers,
    totalUsers,
  } = useSelector((store) => store.managePatientsCaregivers);
  useEffect(() => {
    if (props.typeOfUser === "Patient")
      dispatch(getData(`${patientsCaregivers}${props.id}/caregivers`));
    if (props.typeOfUser === "Caregiver")
      dispatch(getData(`${caregiversPatients}${props.id}/patients`));
  }, []);
  return (
    <SafeAreaView className="p-4 h-full">
      {props.typeOfUser === "Patient" ? (
        <Text className="mx-auto text-lg tracking-widest text-amber-500">
          Caregivers
        </Text>
      ) : (
        <Text className="mx-auto text-lg tracking-widest text-amber-500">
          Patients
        </Text>
      )}
      <ScrollView showsVerticalScrollIndicator={false} className="space-y-2">
        {Fetching === false ? (
          totalUsers > 0 ? (
            users.map((person) => {
              return (
                <ResponsibleFor
                  firstName={person.firstName}
                  lastName={person.lastName}
                  gender={person.gender}
                  age={person.age}
                  addressId={person.addressId}
                  phoneNumber={person.phoneNumber}
                />
              );
            })
          ) : (
            <Text>No data...</Text>
          )
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientsOrCaregivers;
