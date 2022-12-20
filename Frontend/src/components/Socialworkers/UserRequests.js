import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOneTypeOfUsers,
  deleteOneUser,
} from "../../features/Admin/patientsAndCaregivers";
import SocialworkerCard from "./SocialworkerCard";
function UserRequests() {
  const dispatch = useDispatch();
  const { users, socialworkersUrl, Fetching, totalUsers } = useSelector(
    (store) => store.patientsAndCaregivers
  );
  useEffect(() => {
    dispatch(getOneTypeOfUsers(socialworkersUrl));
  }, [totalUsers]);
  return (
    <div className="flex-col">
      {totalUsers > 0 ? (
        users.map((socialworker) => {
          return (
            <SocialworkerCard
              firstName={socialworker.firstName}
              lastName={socialworker.lastName}
              email={socialworker.email}
              address={socialworker.addressId}
              gender={socialworker.gender}
              age={socialworker.age}
              phoneNumber={socialworker.phoneNumber}
              deleteOneUser={deleteOneUser}
              id={socialworker.id}
            />
          );
        })
      ) : (
        <div className="text-violet-100">No requests....</div>
      )}
    </div>
  );
}

export default UserRequests;
