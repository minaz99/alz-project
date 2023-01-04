import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { ChevronDownIcon } from "react-native-heroicons/outline";

const PatientExtras = (props) => {
  const [displayIllnessList, setDisplayIllnessList] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [disabled1, setDisabled1] = useState(false);
  const [disabled2, setDisabled2] = useState(false);
  const [disabled3, setDisabled3] = useState(false);
  const [disabled4, setDisabled4] = useState(false);
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
          //props.changeIllnessToString();
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
            disabled={disabled}
            onPress={() => {
              //  illnesses.push("Vascular Dementia");
              setDisabled(true);
              //   props.setIllnesses(illnesses);
              props.changeIllnessToString("Vascular Dementia");
              //props.setIllnessType("Vascular Dementia");
              //setDisplayIllnessList(!displayIllnessList);
            }}
          >
            <Text className="text-lg ">Vascular Dementia</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={disabled1}
            onPress={() => {
              // illnesses.push("Mixed Dementia");
              setDisabled1(true);
              //  props.setIllnesses(illnesses);
              props.changeIllnessToString("Mixed Dementia");
              //props.setIllnessType("Mixed Dementia");
              //setDisplayIllnessList(!displayIllnessList);
            }}
          >
            <Text className="text-lg ">Mixed Dementia</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={disabled2}
            onPress={() => {
              // illnesses.push("Parkinson Disease");
              setDisabled2(true);
              //props.setIllnesses(illnesses);
              props.changeIllnessToString("Parkinson Disease");
              //props.setIllnessType("Parkinson Disease");
              //setDisplayIllnessList(!displayIllnessList);
            }}
          >
            <Text className="text-lg ">Parkinson Disease</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={disabled3}
            onPress={() => {
              // illnesses.push("Vascular (Post Stroke)");
              // props.setIllnesses(illnesses);
              props.changeIllnessToString("Vascular (Post Stroke)");
              // props.setIllnessType("Vascular (Post Stroke)");
              // setDisplayIllnessList(!displayIllnessList);
              setDisabled3(true);
            }}
          >
            <Text className="text-lg ">Vascular (Post Stroke)</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={disabled4}
            onPress={() => {
              // props.setIllnessType("Alzheimer");
              illnesses.push("Alzheimer");
              // props.setIllnesses(illnesses);
              props.changeIllnessToString("Alzheimer");
              // setDisplayIllnessList(!displayIllnessList);
              setDisabled4(true);
            }}
          >
            <Text className="text-lg ">Alzheimer</Text>
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
