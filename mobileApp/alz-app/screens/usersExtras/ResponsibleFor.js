import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { MinusCircleIcon } from "react-native-heroicons/outline";

const ResponsibleFor = (props) => {
  return (
    <View className="p-2">
      <View className="flex-col bg-amber-100 p-4 rounded-lg">
        <View className="pb-2">
          <Text className="rounded-full w-10 h-10 text-lg pt-1 shadow-md  bg-sky-100 mx-auto text-center">
            {props.firstName[0]}
          </Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity>
            <View className="flex-row">
              <Text className="text-lg text-amber-500">Name: </Text>
              <Text className="text-lg mx-2">
                {props.firstName} {props.lastName}
              </Text>
            </View>
            <View className="flex-row">
              <Text className="text-lg text-amber-500">Gender:</Text>
              <Text className="text-lg mx-2">{props.gender}</Text>
            </View>
            <View className="flex-row">
              <Text className="text-lg text-amber-500">Age: </Text>
              <Text className="text-lg mx-2">{props.age}</Text>
            </View>
            <View className="flex-row">
              <Text className="text-lg text-amber-500">Address:</Text>
              <Text className="text-lg mx-2">{props.addressId}</Text>
            </View>
            <View className="flex-row">
              <Text className="text-lg text-amber-500">Phone number: </Text>
              <Text className="text-lg mx-2">+48 {props.phoneNumber}</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default ResponsibleFor;
