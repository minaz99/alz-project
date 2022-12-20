import React from "react";

function UserData(props) {
  return (
    <div className="flex-col ">
      <div className="text-violet-400">
        {props.firstName} {props.lastName}
      </div>
      <div className="text-violet-600"> {props.email}</div>
    </div>
  );
}

export default UserData;
