import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";

const UserData = (props) => {
  return (
    <TouchableOpacity
      key={props.id}
      onPress={() => {
        props.setUserId(props.id);
        props.setShowUserInfo(true);
        props.setUserType(props.userType);
      }}
    >
      <View className="p-4 font-bold bg-sky-200/80 rounded-md">
        <Text className="text-lg  text-center tracking-widest text-gray-500">
          {props.userType}
        </Text>

        <ScrollView className="">
          <Text className="text-lg text-black font-bold">
            {props.firstName} {props.lastName}
          </Text>

          <Text className="text-lg text-black">{props.phoneNumber}</Text>
          <Text className="text-lg text-black">{props.addressId}</Text>
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
};

export default UserData;
