import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { ChevronDownIcon } from "react-native-heroicons/outline";

const PatientExtras = (props) => {
  const [displayIllnessList, setDisplayIllnessList] = useState(false);
  return (
    <View className="p-6">
      <TouchableOpacity
        className="flex-row items-center border-b-2 border-white"
        onPress={() => {
          setDisplayIllnessList(!displayIllnessList);
        }}
      >
        <Text className="p-2 text-lg flex-1 text-gray-500  ">
          {props.illnessType}
        </Text>
        <ChevronDownIcon color={"white"} className="w-6 h-6" />
      </TouchableOpacity>
      {displayIllnessList === true ? (
        <View className="flex-col rounded-lg  bg-gray-200 p-2">
          <TouchableOpacity
            onPress={() => {
              props.setIllnessType("Vascular Dementia");
              setDisplayIllnessList(!displayIllnessList);
            }}
          >
            <Text className="text-lg ">Vascular Dementia</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.setIllnessType("Mixed Dementia");
              setDisplayIllnessList(!displayIllnessList);
            }}
          >
            <Text className="text-lg ">Mixed Dementia</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.setIllnessType("Parkinson Disease");
              setDisplayIllnessList(!displayIllnessList);
            }}
          >
            <Text className="text-lg ">Parkinson Disease</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.setIllnessType("Other");
              setDisplayIllnessList(!displayIllnessList);
            }}
          >
            <Text className="text-lg ">Other</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text></Text>
      )}
      <TextInput
        multiline={true}
        value={props.conditionDescription}
        onChangeText={props.setConditionDescription}
        className=" bg-white rounded-md text-gray-500 text-lg  p-2"
        placeholder="Condition description"
      />
    </View>
  );
};

export default PatientExtras;
