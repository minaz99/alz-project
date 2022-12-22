import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const UserTypes = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <SafeAreaView className="bg-white p-4 h-full">
      <View className="flex-col space-y-4 my-20">
        <View className="flex-row items-center text-xl pt-8 mx-auto">
          <Text className="text-xl tracking-widest  text-violet-500">
            Welcome to ALZ
          </Text>
          <TouchableOpacity>
            <Image
              source={require("../src/ribbon.png")}
              className="w-12 h-12 "
            ></Image>
          </TouchableOpacity>
        </View>
        <View className="my-auto">
          <Text className=" text-lg text-violet-300  p-2">
            Choose the user type to login
          </Text>
          <View className="flex-col text-center rounded-md space-y-2   ">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login", { userType: "Patient" });
              }}
            >
              <Text className="text-lg p-2 rounded-md tracking-widest shadow-teal-300 bg-teal-100  text-teal-600  ">
                Patient
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login", { userType: "Caregiver" });
              }}
            >
              <Text className=" p-2 text-lg rounded-md tracking-widest  bg-amber-100  text-amber-500  ">
                Caregiver
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login", { userType: "Socialworker" });
              }}
            >
              <Text className=" p-2 text-lg rounded-md tracking-widest shadow-blue-300 bg-blue-100  text-blue-600  ">
                Social worker
              </Text>
            </TouchableOpacity>
            <Text className="text-xs mx-auto bottom-auto  place-items-end">
              ALZ project
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserTypes;
