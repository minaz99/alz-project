import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import CardRow from "./CardRow";
import { data } from "./patientsFakeData";
import { generateRowData } from "./generateRowData";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
//import { useNavigation } from "react-router-dom";
import { getPatients } from "../../features/Admin/userRequestsSlice";
function CardsHolder() {
  //  const { totalUsers } = useSelector((store) => store.getUsers);
  // const navigate = useNavigation();
  const dispatch = useDispatch();
  const { isLoggedIn, isError } = useSelector((store) => store.session);
  const { users } = useSelector((store) => store.userRequest);
  /*useEffect(() => {
    if (isLoggedIn !== true || isError !== false) navigate("/");
  }, [isLoggedIn, isError]);*/

  useEffect(() => {
    dispatch(getPatients());
  }, [users]);

  return (
    <div className="h-full">
      <div className="p-4 relative  ">
        <input
          type="text"
          placeholder="Search by name.."
          className="rounded-md bg-violet-900/10 text-black "
        ></input>
      </div>
      <div className="flex-col space-x space-y-3 p-4  rounded-lg overflow-scroll-y">
        {/*<div className="flex ">
          <div className="flex-1 ">
           <ArrowLeftIcon
              color="#766d98"
              className="h-8 w-8 hover:rounded-full hover:bg-purple-900/90 hover:h-11 hover:w-11"
            />
          </div>
          <div className="">
            <ArrowRightIcon
              color="#766d98"
              className="h-8 w-8 flex-none hover:rounded-full hover:bg-purple-900/90 hover:h-11 hover:w-11"
            />
  </div>
  </div>*/}
        {users.map((p) => {
          return (
            <div key={p.id}>
              <UserCard
                firstName={p.firstName}
                lastName={p.lastName}
                dateOfBirth={p.dateOfBirth}
              ></UserCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CardsHolder;
