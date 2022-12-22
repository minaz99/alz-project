import { View, Text, TextInput } from "react-native";
import React from "react";

const CaregiverExtras = (props) => {
  return (
    <View>
      <TextInput
        value={props.needs}
        onChangeText={props.setNeeds}
        className="bg-violet-100 rounded-lg text-gray-400 p-2"
        placeholder="Needs"
      />
    </View>
  );
};

export default CaregiverExtras;
