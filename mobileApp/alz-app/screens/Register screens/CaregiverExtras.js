import { View, Text, TextInput } from "react-native";
import React from "react";

const CaregiverExtras = (props) => {
  return (
    <View className="p-6">
      <TextInput
        multiline={true}
        value={props.needs}
        onChangeText={props.setNeeds}
        className="bg-white text-gray-500 rounded-md p-4 text-lg "
        placeholder="Enter your needs..."
      />
    </View>
  );
};

export default CaregiverExtras;
