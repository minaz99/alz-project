import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatients } from "../../features/Admin/userRequestsSlice";
import { getPatientInfo } from "../../features/Admin/userRequestInfoSlice";
import UserData from "./UserData";
import UserInfo from "./UserInfo";
const UsersInDistrict = (props) => {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [userId, setUserId] = useState("-1");
  const [userType, setUserType] = useState("");
  const dispatch = useDispatch();
  const { patientsCaregivers, users, Fetching, totalUsers } = useSelector(
    (store) => store.userRequest
  );
  const { urlSocialworker, addressId } = useSelector(
    (store) => store.userRequestInfo
  );
  useEffect(() => {
    dispatch(getPatientInfo(`${urlSocialworker}${props.id}`));
    //dispatch(getPatients(patientsCaregivers));
  }, []);
  useEffect(() => {
    dispatch(getPatients(patientsCaregivers));
  }, [totalUsers]);
  useEffect(() => {
    filterUsers();
  }, [users.length]);

  const [filteredUsers, setFilteredUsers] = useState([]);
  const districtMatching = (userDistrict) => {
    const patientDistrict = userDistrict.split("-")[1];
    const socialWorkerDistrict = addressId.split("-")[1];
    if (patientDistrict === socialWorkerDistrict) return 1;
    else return 0;
  };
  const filterUsers = () => {
    const matchedUsers = [];
    users.forEach((person) => {
      if (districtMatching(person.addressId) === 1) matchedUsers.push(person);
    });
    setFilteredUsers(matchedUsers);
  };
  return (
    <SafeAreaView className="h-full my-2">
      <ScrollView
        className="h-full"
        contentContainerStyle={{ paddingBottom: 200 }}
      >
        {filteredUsers.length > 0 ? (
          filteredUsers.map((person) => {
            return (
              <View className="my-2">
                <UserData
                  firstName={person.firstName}
                  userType={person.userType}
                  lastName={person.lastName}
                  phoneNumber={person.phoneNumber}
                  gender={person.gender}
                  age={person.age}
                  addressId={person.addressId}
                  setUserId={setUserId}
                  setShowUserInfo={setShowUserInfo}
                  id={person.id}
                  setUserType={setUserType}
                />
              </View>
            );
          })
        ) : (
          <Text className="text-center text-lg text-violet-300 font-bold">
            No users in your district...
          </Text>
        )}
      </ScrollView>

      {showUserInfo === true ? (
        <UserInfo
          id={userId}
          userType={userType}
          setShowUserInfo={setShowUserInfo}
        />
      ) : (
        <Text></Text>
      )}
    </SafeAreaView>
  );
};

export default UsersInDistrict;
