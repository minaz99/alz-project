import { View, Text } from "react-native";
import React from "react";

const PatientExtraData = (props) => {
  return (
    <View className="flex-col space-y-2">
      <View className="flex-row items-center bg-violet-100 rounded-xl p-2">
        <Text className="text-lg text-violet-500 ">Illness:</Text>
        <Text className="text-lg mx-2 my-2">{props.illnessType}</Text>
      </View>
      <View className="flex-row items-center bg-violet-100 rounded-xl p-2">
        <Text className="text-lg text-violet-500">Condition description:</Text>
        <Text className="text-lg mx-2 my-2">{props.conditionDescription}</Text>
      </View>
    </View>
  );
};

export default PatientExtraData;