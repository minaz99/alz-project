import React from "react";
import {
  UserCircleIcon,
  MapPinIcon,
  EllipsisHorizontalCircleIcon,
} from "@heroicons/react/24/outline";
function UserCard(props) {
  //Main div is the layout for the card first div tells info about the type of user, second div has all the info about the user inside the second div we will have inner divs together
  return (
    <div className="bg-orange-50 rounded-md flex-col cursor-pointer text-violet-900/80 p-4 w-full">
      <div className="text-center text-2xl ">Patient</div>
      <div className="text-xl">First name: {props.firstName}</div>
      <div className="text-xl">Last name: {props.lastName}</div>
      <div className="text-xl">Email: {props.email}</div>
    </div>
    /*<div className="bg-orange-50 rounded-lg cursor-pointer text-violet-900/80 p-4 h-50 w-50">
      <div className="text-center">{props.role}</div>
      <hr class="my-3 h-px bg-violet-400 border-0 dark:bg-gray-700"></hr>
      <div className="space-y-4 p-2">
        <div className="flex space-x-2 capitalize">
          <UserCircleIcon color="#766d98" className="h-6 w-6" />
          <div>
            {props.fname} {props.lname}{" "}
          </div>
        </div>
        <div className="flex space-x-2">
          <MapPinIcon color="#766d98" className="h-6 w-6" />
          <div>{props.address}</div>
        </div>
        <div className="py-4">
          <EllipsisHorizontalCircleIcon
            color="#766d98"
            className="h-6 w-6 mx-auto "
          />
        </div>
      </div>
  </div>*/
  );
}

export default UserCard;
