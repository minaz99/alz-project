import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { ArrowRightCircleIcon } from "react-native-heroicons/outline";
const PersonalInfo = (props) => {
  return (
    <View className="flex-col space-y-10  p-6 ">
      <TextInput
        value={props.firstName}
        onChangeText={props.setFirstName}
        placeholder="First name"
        className="border-b-2 text-lg p-2 border-white"
      ></TextInput>
      <TextInput
        value={props.lastName}
        onChangeText={props.setLastName}
        placeholder="Last name"
        className="border-b-2 text-lg p-2 border-white"
      ></TextInput>

      <TextInput
        value={props.email}
        onChangeText={props.setEmail}
        placeholder="Email"
        className="border-b-2 text-lg p-2 border-white"
        keyboardType="email-address"
      ></TextInput>
      <TextInput
        value={props.password}
        onChangeText={props.setPassword}
        placeholder="Password"
        secureTextEntry={true}
        className="border-b-2 text-lg p-2 border-white"
      ></TextInput>
    </View>
  );
};

export default PersonalInfo;
