import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";

const PatientExtraData = (props) => {
  return (
    <View className="flex-col space-y-2">
      <View className="flex-row items-center bg-violet-100 rounded-xl p-2">
        <Text className="text-lg text-violet-500 ">Illness:</Text>
        <Text className="text-lg mx-2 my-2">{props.illnessType}</Text>
      </View>
      <ScrollView horizontal={true}>
        <View className="flex-row items-center bg-violet-100 rounded-xl p-2">
          <Text className="text-lg text-violet-500">
            Condition description:
          </Text>
          <Text className="text-lg mx-2 my-2">
            {props.conditionDescription}
          </Text>
        </View>
      </ScrollView>
      <ScrollView horizontal={true}>
        <View className="flex-row items-center bg-violet-100 rounded-xl p-2">
          <Text className="text-lg text-violet-500">Needs:</Text>
          <Text className="text-lg mx-2 my-2">{props.needs}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PatientExtraData;
