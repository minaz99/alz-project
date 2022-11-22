import React from "react";
import UserCard from "./UserCard";
function CardRow(props) {
  //const width = Screen.width;
  console.log(props.users);
  return (
    <div className="flex space-x-3 items-center mx-auto justify-center">
      {props.users.map((user) => {
        return (
          <UserCard
            role={user.role}
            fname={user.fname}
            lname={user.lname}
            address={user.address}
          />
        );
      })}
    </div>
  );
}

export default CardRow;
