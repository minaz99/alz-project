import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const NavbarForSocialworker = (props) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{ paddingRight: 10 }}
      >
        <View className="flex-row space-x-3 ">
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
                Users
              </Text>
            ) : (
              <Text className="text-lg bg-violet-200 text-violet-500 rounded-md p-4">
                Users
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            className=""
            onPress={() => {
              //props.setActiveView("register");
              navigation.navigate("Register", {
                userType: "Patient",
                registerBy: "Social worker",
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NavbarForSocialworker;
