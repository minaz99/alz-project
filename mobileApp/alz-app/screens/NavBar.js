import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftCircleIcon } from "react-native-heroicons/solid";
const NavBar = (props) => {
  return (
    <SafeAreaView>
      <View className="flex-row  space-x-2 p-4">
        <TouchableOpacity
          className="w-1/2 "
          onPress={() => {
            props.setActiveView("pd");
          }}
        >
          {props.activeView === "pd" ? (
            <Text className="text-lg bg-violet-200 text-violet-500 rounded-md p-4">
              Personal data
            </Text>
          ) : (
            <Text className="text-lg bg-violet-100 text-violet-500 rounded-md p-4">
              Personal data
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          className="w-1/2"
          onPress={() => {
            props.setActiveView("moreData");
          }}
        >
          {props.activeView === "pd" ? (
            <Text className="text-lg bg-violet-100 text-violet-500 rounded-md p-4">
              {props.userType === "Patient" ? "Caregivers" : "Patients"}
            </Text>
          ) : (
            <Text className="text-lg bg-violet-200 text-violet-500 rounded-md p-4">
              {props.userType === "Patient" ? "Caregivers" : "Patients"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavBar;
