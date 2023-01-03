import { View, Text, SafeAreaView } from "react-native";
import React, { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import PatientRegister from "./Register screens/PatientRegister";
import PatientExtras from "./Register screens/PatientExtras";

const Register = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    params: { userType },
  } = useRoute();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  return (
    <SafeAreaView>
      <PatientRegister userType={userType} />
    </SafeAreaView>
  );
};

export default Register;
