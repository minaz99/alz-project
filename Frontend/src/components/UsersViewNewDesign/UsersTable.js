import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPatients } from "../../features/Admin/userRequestsSlice";
import UserInfo from "./UserInfo";
import UserRow from "./UserRow";
function UsersTable() {
  const dispatch = useDispatch();
  const { isFetching } = useSelector((store) => store.updatePatient);
  const { Fetching, users, usersUrl, totalUsers } = useSelector(
    (store) => store.userRequest
  );

  const [userDetailShown, setUserDetailShown] = useState("false");
  useEffect(() => {
    dispatch(getPatients(usersUrl));
  }, [totalUsers, isFetching]);
  return (
    <div className="bg-white rounded-md ">
      <div className="p-4">
        <div className=" table-auto  text-purple-600/60">
          <div className="flex text-lg   ">
            <div className=" w-48 border-r flex items-center   border-b border-slate-600">
              <div className="rounded-sm w-3 h-3 mx-2   bg-rose-300 "> </div>
              User
            </div>

            <div className="border-l w-56 border-r flex items-center border-b   border-slate-600">
              <div className="rounded-sm w-3 h-3 bg-indigo-300 mx-2"> </div>
              Email
            </div>
            <div className="border-l border-r w-48 flex items-center border-b  border-slate-600">
              <div className="rounded-sm w-3 h-3 bg-pink-500 mx-2"> </div>
              Gender
            </div>
            <div className="border-l border-r w-48 flex items-center border-b  border-slate-600">
              <div className="rounded-sm w-3 h-3 bg-lime-300 mx-2"> </div>
              Age
            </div>
            <div className="border-l  w-48 flex items-center border-b  border-slate-600">
              <div className="rounded-sm w-3  h-3 bg-amber-600 mx-2"> </div>
              User type
            </div>
          </div>

          {totalUsers > 0 ? (
            users.map((p) => {
              return (
                <UserRow
                  id={p.id}
                  firstName={p.firstName}
                  lastName={p.lastName}
                  age={p.age}
                  email={p.email}
                  userType={p.userType}
                  gender={p.gender}
                  setUserDetailShown={setUserDetailShown}
                  userDetailShown={userDetailShown}
                />
              );
            })
          ) : (
            <div>No users....</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UsersTable;
