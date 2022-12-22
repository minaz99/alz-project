import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";

const PatientExtras = (props) => {
  const [displayIllnessList, setDisplayIllnessList] = useState(false);
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setDisplayIllnessList(!displayIllnessList);
        }}
      >
        <Text className="bg-violet-100 p-2 rounded-lg  text-gray-400">
          Select Illness
        </Text>
      </TouchableOpacity>
      {displayIllnessList === true ? (
        <View className="flex-col rounded-lg bg-gray-200 p-2">
          <TouchableOpacity
            onPress={() => {
              props.setIllnessType("Vascular Dementia");
            }}
          >
            <Text className="text-violet-300">Vascular Dementia</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.setIllnessType("Mixed Dementia");
            }}
          >
            <Text className="text-violet-300">Mixed Dementia</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.setIllnessType("Parkinson Disease");
            }}
          >
            <Text className="text-violet-300">Parkinson Disease</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.setIllnessType("Other");
            }}
          >
            <Text className="text-violet-300">Other</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text></Text>
      )}
      <TextInput
        value={props.conditionDescription}
        onChangeText={props.setConditionDescription}
        className="bg-violet-100 rounded-lg text-gray-400 p-2"
        placeholder="Condition description"
      />
    </View>
  );
};

export default PatientExtras;
