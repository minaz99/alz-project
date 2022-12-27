import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import DatePicker from "react-native-modern-datepicker";
import { ArrowDownIcon } from "react-native-heroicons/outline";
import PatientExtras from "./PatientExtras";
import CaregiverExtras from "./CaregiverExtras";
import { useDispatch } from "react-redux";
import { registerPatient } from "../../features/Admin/PatientRegisterSlice";
import { useSelector } from "react-redux";
const PatientRegister = (props) => {
  //const [date, setDate] = useState("09-10-2020");
  //const [selectedDate, setSelectedDate] = useState("");
  const dispatch = useDispatch();
  const { patientUrl, caregiverUrl } = useSelector(
    (store) => store.patientRegister
  );
  const [url, setUrl] = useState(
    props.userType === "Patient" ? patientUrl : caregiverUrl
  );
  const [displayCalender, setDisplayCalender] = useState(false);
  const [displayGender, setDisplayGender] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressId, setAddressId] = useState("");
  const [illnessType, setIllnessType] = useState("");
  const [conditionDescription, setConditionDescription] = useState("");
  const [needs, setNeeds] = useState("");
  const [age, setAge] = useState("");
  const [registeredBy, setRegisteredBy] = useState(
    props.userType === "Patient" ? "PATIENT" : "CAREGIVER"
  );
  const correctDateFormat = (date) => {
    const newDate = date.split("/");
    setDateOfBirth(`${newDate[0]}-${newDate[1]}-${newDate[2]}`);
    //`alert(dateOfBirth);
  };
  return (
    <SafeAreaView>
      <Text className="text-lg mx-auto top-6">Register</Text>
      <ScrollView className="p-8">
        <View className="flex-col space-y-4">
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            className="bg-violet-100 rounded-lg  p-2 flex-1"
            placeholder="First name"
          ></TextInput>
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last name "
            className="bg-violet-100 p-2 rounded-lg"
          ></TextInput>
        </View>
        <View className="flex-col space-y-4 pt-4">
          <TextInput
            value={email}
            onChangeText={setEmail}
            className="bg-violet-100 p-2 rounded-lg"
            placeholder="Email"
          ></TextInput>
          <TextInput
            value={password}
            onChangeText={setPassword}
            className="bg-violet-100 p-2 rounded-lg"
            placeholder="Password"
            secureTextEntry={true}
          ></TextInput>
        </View>
        <View className="flex-col">
          <TouchableOpacity
            onPress={() => {
              setDisplayCalender(!displayCalender);
            }}
            className="pt-4 "
          >
            <Text className="bg-violet-100 p-2 rounded-lg text-gray-400">
              Set date of birth
            </Text>

            {displayCalender === true ? (
              <DatePicker
                current="2022-12-25"
                mode="calender"
                onSelectedChange={(date) => correctDateFormat(date)} //setDateOfBirth(date)}
              />
            ) : (
              <Text></Text>
            )}
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            className="pt-4"
            onPress={() => setDisplayGender(!displayGender)}
          >
            <Text className="bg-violet-100 p-2 rounded-lg text-gray-400">
              Select gender
            </Text>
          </TouchableOpacity>
          {displayGender === true ? (
            <View className="flex-col rounded-lg bg-gray-200 p-2">
              <TouchableOpacity
                onPress={() => {
                  setGender("MALE");
                }}
              >
                <Text className="text-violet-300">Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setGender("FEMALE");
                }}
              >
                <Text className="text-violet-300">Female</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text></Text>
          )}
        </View>

        <View className="flex-col space-y-4 pt-4 pb-4 ">
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            className="bg-violet-100 p-2 rounded-lg text-gray-400"
            placeholder="Phone number"
          ></TextInput>
          <TextInput
            value={addressId}
            onChangeText={setAddressId}
            className="bg-violet-100 p-2 rounded-lg text-gray-400"
            placeholder="Address"
          ></TextInput>
        </View>
        {props.userType === "Patient" ? (
          <PatientExtras
            illnessType={illnessType}
            setIllnessType={setIllnessType}
            conditionDescription={conditionDescription}
            setConditionDescription={setConditionDescription}
          />
        ) : (
          <CaregiverExtras needs={needs} setNeeds={setNeeds} />
        )}
        <TouchableOpacity
          className="pt-2"
          onPress={() => {
            dispatch(
              registerPatient({
                url,
                firstName,
                lastName,
                email,
                password,
                dateOfBirth,
                age,
                gender,
                phoneNumber,
                addressId,
                illnessType,
                conditionDescription,
                registeredBy,
              })
            );
          }}
        >
          <Text className="text-lg rounded-lg bg-amber-50 p-2 text-center">
            Register
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientRegister;
