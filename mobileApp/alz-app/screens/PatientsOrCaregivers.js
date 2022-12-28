import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getData,
  deleteOneUser,
} from "../features/Admin/managePatientsCaregiversSlice";
import { useNavigation, useRoute } from "@react-navigation/native";
import NavBar from "./NavBar";
import ResponsibleFor from "./usersExtras/ResponsibleFor";
import { MinusCircleIcon, TrashIcon } from "react-native-heroicons/outline";
import { deletePCandCP } from "../features/Admin/deletePCandCPSlice";
const PatientsOrCaregivers = (props) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const [padding, setPadding] = useState(props.socialworker === true ? 1 : 50);
  const dispatch = useDispatch();
  const {
    users,
    Fetching,
    caregiversPatients,
    patientsCaregivers,
    totalUsers,
  } = useSelector((store) => store.managePatientsCaregivers);
  const { cp, pc } = useSelector((store) => store.deletePCandCP);
  useEffect(() => {
    if (props.typeOfUser === "Patient")
      dispatch(getData(`${patientsCaregivers}${props.id}/caregivers`));
    if (props.typeOfUser === "Caregiver")
      dispatch(getData(`${caregiversPatients}${props.id}/patients`));
    setPadding(padding * users.length);
  }, [totalUsers]);
  return (
    <View className="p-4">
      {props.typeOfUser === "Patient" ? (
        <Text className="mx-auto text-lg tracking-widest text-amber-500">
          Caregivers
        </Text>
      ) : (
        <Text className="mx-auto text-lg tracking-widest text-amber-500">
          Patients
        </Text>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: padding }}
        className="space-y-2"
      >
        {Fetching === false ? (
          totalUsers > 0 ? (
            users.map((person) => {
              return (
                <View>
                  <ResponsibleFor
                    firstName={person.firstName}
                    lastName={person.lastName}
                    gender={person.gender}
                    age={person.age}
                    addressId={person.addressId}
                    phoneNumber={person.phoneNumber}
                  />

                  <TouchableOpacity
                    key={person.id}
                    className="mx-auto"
                    onPress={() => {
                      let url = person.userType === "PATIENT" ? cp : pc;
                      let secondary =
                        person.userType === "PATIENT"
                          ? "patients"
                          : "caregivers";

                      dispatch(
                        deletePCandCP(
                          `${url}${props.id}/${secondary}/${person.id}`
                        )
                      );
                      dispatch(deleteOneUser());
                    }}
                  >
                    <TrashIcon className="w-6 h-6" color={"gray"} />
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <Text>No data...</Text>
          )
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default PatientsOrCaregivers;
