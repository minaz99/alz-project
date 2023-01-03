import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftCircleIcon } from "react-native-heroicons/solid";
const NavBar = (props) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{ paddingRight: 10 }}
      >
        <View className="flex-row  space-x-2 p-4">
          <TouchableOpacity
            className=" "
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
            className=""
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
          {props.userType !== "Patient" ? (
            <TouchableOpacity
              className=""
              onPress={() => {
                //props.setActiveView("register");
                navigation.navigate("Register", {
                  userType: "Patient",
                  registerBy: "caregiver",
                  id: props.id,
                });
              }}
            >
              {props.activeView !== "register" ? (
                <Text className="text-lg bg-violet-100 text-violet-500 rounded-md p-4">
                  Register patient
                </Text>
              ) : (
                <Text className="text-lg bg-violet-200 text-violet-500 rounded-md p-4">
                  Register patient
                </Text>
              )}
            </TouchableOpacity>
          ) : (
            <Text></Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NavBar;
