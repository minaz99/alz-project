import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { ChevronDownIcon } from "react-native-heroicons/outline";

const PatientExtras = (props) => {
  const [displayIllnessList, setDisplayIllnessList] = useState(false);

  const illnesses = [];
  const changeIllnessToString = (array) => {
    let ilnes = "";
    let stringAsAWhole = "";
    let size = array.length;
    array.forEach((illness) => {
      ilnes = `${illness}`;
      stringAsAWhole += ilnes;
      size--;
      if (size !== 0) stringAsAWhole += "-";
    });
    props.setIllnessType(stringAsAWhole);
    //alert(stringAsAWhole);
  };
  return (
    <View className="p-6 space-y-2">
      <TouchableOpacity
        className="flex-row items-center border-b-2 border-white"
        onPress={() => {
          changeIllnessToString(illnesses);
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
              illnesses.push("Vascular Dementia");
              //props.setIllnessType("Vascular Dementia");
              //setDisplayIllnessList(!displayIllnessList);
            }}
          >
            <Text className="text-lg ">Vascular Dementia</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              illnesses.push("Mixed Dementia");
              //props.setIllnessType("Mixed Dementia");
              //setDisplayIllnessList(!displayIllnessList);
            }}
          >
            <Text className="text-lg ">Mixed Dementia</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              illnesses.push("Parkinson Disease");
              //props.setIllnessType("Parkinson Disease");
              //setDisplayIllnessList(!displayIllnessList);
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

export default PatientExtras;
