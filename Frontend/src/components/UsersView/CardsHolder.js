import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import CardRow from "./CardRow";
import { data } from "./patientsFakeData";
import { generateRowData } from "./generateRowData";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
function CardsHolder() {
  const { totalUsers } = useSelector((store) => store.getUsers);
  return (
    <div>
      <div className="p-4 relative">
        <input
          type="text"
          placeholder="Search by name.."
          className="rounded-md bg-violet-900/10 text-black "
        ></input>
      </div>
      <div className="flex-col space-x space-y-3 p-4 bg-violet-900  rounded-lg h-full overflow-scroll-y">
        <div className="flex ">
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
        </div>
        {/*props.users.map((userArray) => {
          return <CardRow users={userArray} />;
        })*/}
        <div>Total number of users: {totalUsers}</div>
      </div>
    </div>
  );
}

export default CardsHolder;
