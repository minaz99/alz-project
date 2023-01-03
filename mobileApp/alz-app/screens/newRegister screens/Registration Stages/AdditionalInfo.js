import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import DatePicker from "react-native-modern-datepicker";
import { ChevronDownIcon, CalendarIcon } from "react-native-heroicons/outline";
import Address from "./Address";
import { SafeAreaView } from "react-native-safe-area-context";
const AdditionalInfo = (props) => {
  const [displayGender, setDisplayGender] = useState(false);
  const [displayCalender, setDisplayCalender] = useState(false);
  const [genderText, setGenderText] = useState("Select gender");
  const correctDateFormat = (date) => {
    const newDate = date.split("/");
    props.setDateOfBirth(`${newDate[0]}-${newDate[1]}-${newDate[2]}`);
    //`alert(dateOfBirth);
  };
  return (
    <View className="p-6">
      <View>
        <TouchableOpacity
          className="flex-row items-center border-b-2 border-white "
          onPress={() => setDisplayGender(!displayGender)}
        >
          <Text className="text-gray-500 items-center flex-1 text-lg p-2 rounded-lg  ">
            {genderText}
          </Text>
          <ChevronDownIcon className=" w-6 h-6" color={"white"} />
        </TouchableOpacity>
        {displayGender === true ? (
          <View className="flex-col  rounded-lg bg-violet-100 p-2">
            <TouchableOpacity
              onPress={() => {
                setDisplayGender(!displayGender);
                props.setGender("MALE");
                setGenderText("Male");
              }}
            >
              <Text className="text-lg  ">Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setDisplayGender(!displayGender);
                props.setGender("FEMALE");
                setGenderText("Female");
              }}
            >
              <Text className=" text-lg  ">Female</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text></Text>
        )}
      </View>
      <View className="flex-col">
        <TouchableOpacity
          onPress={() => {
            setDisplayCalender(!displayCalender);
          }}
          className=" p-2 border-b-2 items-center flex-row space-x-2  border-white "
        >
          <Text className="text-lg rounded-lg text-gray-500 ">
            {props.dateOfBirth}
          </Text>
          <CalendarIcon className="w-6 h-6" color={"white"} />
        </TouchableOpacity>
        {displayCalender === true ? (
          <DatePicker
            mode="calender"
            onSelectedChange={(date) => {
              setDisplayCalender(!displayCalender);
              correctDateFormat(date);
            }} //setDateOfBirth(date)}
          />
        ) : (
          <Text></Text>
        )}
      </View>
      <Address correctAddress={props.correctAddress} />
      <View className="items-center flex-row">
        <Text className="text-lg text-gray-500">+48</Text>
        <TextInput
          value={props.phoneNumber}
          onChangeText={props.setPhoneNumber}
          placeholder="Phone number"
          className="border-b-2 text-gray-500  text-lg p-2 border-white"
          keyboardType="numeric"
        ></TextInput>
      </View>
    </View>
  );
};

export default AdditionalInfo;
