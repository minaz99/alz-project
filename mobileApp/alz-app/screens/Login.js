import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import UserTypes from "./UserTypes";
import { useDispatch, useSelector } from "react-redux";
import { getPatients } from "../features/Admin/userRequestsSlice";
import { ArrowLeftCircleIcon } from "react-native-heroicons/outline";
const Login = () => {
  const dispatch = useDispatch();
  const {
    params: { userType },
  } = useRoute();
  const navigation = useNavigation();
  const {
    patientUrl,
    caregiverUrl,
    socialworkerUrl,
    notSocialworkerUrl,
    users,
  } = useSelector((store) => store.userRequest);
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState("false");
  const [errorMsg, setErrorMsg] = useState("Incorrect email or password");
  useEffect(() => {
    // alert(userType);
    if (userType === "Patient") dispatch(getPatients(patientUrl));
    if (userType === "Caregiver") dispatch(getPatients(caregiverUrl));
    if (userType === "Socialworker") dispatch(getPatients(socialworkerUrl));
  }, []);

  const validateSocialworker = (email) => {
    let id = -1;
    users.forEach((person) => {
      person.email === email ? (id = person.id) : id;
    });

    if (id === -1) {
      setIncorrect("true");
      setErrorMsg("Account not yet activated");
    } else if (id > -1) {
      setIncorrect("false");
      navigation.navigate("Home", { id: id, typeOfUser: userType });
    }
  };
  const validateUser = (email) => {
    if (userType !== "Socialworker") {
      let found = 0;
      let id = -1;
      users.forEach((person) => {
        person.email === email ? (id = person.id) : id;
      });

      if (id === -1) setIncorrect("true");
      if (id > -1) {
        setIncorrect("false");
        navigation.navigate("Home", { id: id, typeOfUser: userType });
      }
    } else {
      validateSocialworker(email);
    }
  };

  return (
    <SafeAreaView className="h-full p-6">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("UserTypes");
        }}
        className="pt-2"
      >
        <ArrowLeftCircleIcon className=" w-16 h-16" color={"gray"} />
      </TouchableOpacity>
      <Text className="text-lg text-center pt-6 pb-6">Login</Text>
      <View className="space-y-4">
        <TextInput
          className="rounded-md p-2 w-full text-lg bg-amber-50 "
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={setEmail}
        ></TextInput>
        <TextInput
          className="rounded-md p-2 w-full text-lg bg-amber-50 "
          placeholder="Password"
          keyboardType="default"
          textContentType="password"
          secureTextEntry={true}
          onChangeText={setPassword}
        ></TextInput>
        <TouchableOpacity
          onPress={() => {
            validateUser(email);
          }}
        >
          <Text className="bg-sky-300 text-lg rounded-md p-2  text-center">
            Login
          </Text>
        </TouchableOpacity>
        <View className="flex-row">
          <TouchableOpacity className="flex-1">
            <Text className="text-sm text-blue-300">Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register", { userType: userType });
            }}
          >
            <Text className="text-sm">Create new account</Text>
          </TouchableOpacity>
        </View>
        {incorrect === "true" ? (
          <Text className="font-bold text-xl text-center text-slate-500">
            {errorMsg}
          </Text>
        ) : (
          <Text></Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Login;
