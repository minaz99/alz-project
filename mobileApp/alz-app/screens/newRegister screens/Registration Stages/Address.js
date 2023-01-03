import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { ChevronDownIcon } from "react-native-heroicons/outline";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const Address = (props) => {
  const [street, setStreet] = useState("");
  const [appNo, setAppNo] = useState("");
  const [district, setDistrict] = useState("Select district");

  const [showDistrict, setShowDistrict] = useState(false);
  const districts = [
    "Śródmieście",
    "Mokotów",
    "Ochota",
    "Wola",
    "Żoliborz",
    "Praga Południe",
    "Praga Północ",
    "Bemowo",
    "Białołęka",
    "Bielany",
    "Rembertów",
    "Targówek",
    "Ursus",
    "Ursynów",
    "Wawer",
    "Wesoła",
    "Wilanów",
    "Włochy",
  ];
  return (
    <View>
      <View className="flex-row space-x-2  ">
        <TextInput
          placeholder="Street"
          className="text-lg text-gray-500 border-b-2 p-2 flex-1 border-white "
          value={street}
          onChangeText={setStreet}
        ></TextInput>
        <TextInput
          placeholder="Appartment no"
          className="text-lg border-b-2 text-gray-500  p-2 border-white"
          value={appNo}
          onChangeText={setAppNo}
          keyboardType="numeric"
        ></TextInput>
      </View>
      <TouchableOpacity
        className="pt-2 flex-row items-center border-b-2 border-white "
        onPress={() => setShowDistrict(!showDistrict)}
      >
        <Text className="items-center text-gray-500 text-lg p-2 flex-1 rounded-lg  ">
          {district}
        </Text>
        <ChevronDownIcon className=" w-6 h-6" color={"white"} />
      </TouchableOpacity>

      {showDistrict === true ? (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          className="flex-1 z-10  bg-gray-50 rounded-md pb-60"
        >
          {districts.map((d) => {
            return (
              <TouchableOpacity
                className="p-2"
                onPress={() => {
                  setShowDistrict(!showDistrict);
                  setDistrict(d);
                  props.correctAddress(street, appNo, d);
                }}
              >
                <Text className="text-lg  text-gray-500">{d}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <Text></Text>
      )}
    </View>
  );
};

export default Address;
