import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
function Navigation(props) {
  const navigate = useNavigate();
  return (
    <div className=" border-2 shadow-md border-slate-600/40 p-2 bg-red-300/20 h-26 w-26 flex rounded-lg space-x-4">
      <div className="border-2 border-stone-300 rounded-2xl shadow-lg w-30 h-28 px-1 items-center hover:bg-slate-600/20">
        <div className="p-4">
          <UserCircleIcon
            className="h-16 w-16 bg-white rounded-full"
            color="#6d28d9"
          />
          <h2 className="font-bold text-xs py-1">{props.username} (Admin)</h2>
        </div>
      </div>
      <div className="space-x-24 p-4 py-8">
        <button className="bg-violet-600/60 rounded-md h-10 w-24 text-white hover:bg-slate-600">
          Dashboard
        </button>
        <button
          className="bg-slate-600/80 rounded-md h-10 w-24 text-white"
          onClick={() => {
            navigate("/users");
          }}
        >
          User's view
        </button>
        <button className="bg-slate-600/80 rounded-md h-10 w-24 text-white">
          Map view
        </button>
        <button
          className="bg-slate-600/80 rounded-md h-10 w-24 text-white"
          onClick={() => {
            navigate("/addpatient");
          }}
        >
          Add users
        </button>
        <button className="bg-slate-600/80 rounded-md h-10 w-24 text-white">
          Settings
        </button>
      </div>
    </div>
  );
}

export default Navigation;
