import React from "react";

function UserCount(props) {
  return (
    <div
      style={{ color: `${props.color}` }}
      className="  bg-cyan-900 h-48 w-48 rounded-md shadow-lg p-4"
    >
      <h2 className="text-xl text-center font-semibold">{props.user}</h2>
      <hr style={{ background: `${props.color}` }} className=" h-0.5 my-1" />
      <div className="relative flex mx-auto items-center justify-center py-4">
        <div
          style={{ boxShadow: `${props.shadow}` }}
          className="rounded-full h-24 w-24"
        ></div>
        <h3 className="absolute text-3xl">{props.count}</h3>
      </div>
    </div>
  );
}

export default UserCount;
