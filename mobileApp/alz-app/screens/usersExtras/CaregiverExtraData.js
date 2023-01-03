import { View, Text } from "react-native";
import React from "react";

const CaregiverExtraData = (props) => {
  return (
    <View>
      <View className="flex-row items-center bg-violet-100 rounded-xl p-2">
        <Text className="text-lg text-violet-500">Needs</Text>
        <Text className="text-lg mx-2 my-2">{props.needs}</Text>
      </View>
    </View>
  );
};

export default CaregiverExtraData;
