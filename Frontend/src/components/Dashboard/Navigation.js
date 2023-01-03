import React from "react";
import {
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import dashboard from "../../img/dashboard.png";
import users from "../../img/users.png";
import registerUser from "../../img/registerUser.png";
import mapView from "../../img/mapView.png";
import settings from "../../img/settings.png";
import exit from "../../img/exit.png";
import { clearState } from "../../features/Admin/sessionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { BellIcon } from "@heroicons/react/24/solid";
function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, isError, email } = useSelector((store) => store.session);
  const uname = email.slice(0, 3);
  useEffect(() => {
    if (isError || isLoggedIn === false) {
      //dispatch(clearState());
      navigate("/");
    }
  }, [isError, isLoggedIn]);

  return (
    <div className="border-2 shadow-md   border-slate-600/40 p-2 bg-white/30 h-26 w-26 flex rounded-xl space-x-4">
      <div className="border-2 border-slate-600/80 rounded-2xl shadow-lg w-30 h-28 px-1 items-center hover:bg-slate-600/20">
        <div className="p-4">
          <UserCircleIcon
            className="h-16 w-16 bg-white rounded-full"
            color="#6d28d9"
          />
          <h2 className="font-bold text-xs py-1">{uname} (Admin)</h2>
        </div>
      </div>
      <div className="flex flex-auto space-x-4   ">
        <div className="flex items-center">
          <img src={dashboard} className="h-8 w-8" />
          <button
            className="rounded-md h-10 w-24 text-white hover:text-slate-600"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Dashboard
          </button>
        </div>
        <div className="flex  items-center">
          <img src={users} className="h-8 w-8" />
          <button
            className="hover:text-slate-600 rounded-md h-10 w-24 text-white"
            onClick={() => {
              navigate("/users");
            }}
          >
            User's view
          </button>
        </div>
        <div className="flex -space-x-3 items-center">
          <img src={mapView} className="h-9 w-9" />
          <button
            onClick={() => {
              navigate("/mapview");
            }}
            className="hover:text-slate-600 rounded-md h-10 w-24 text-white"
          >
            Map view
          </button>
        </div>
        <div className="flex items-center -space-x-3">
          <img src={registerUser} className="h-9 w-9" />
          <button
            className="hover:text-slate-600 rounded-md h-10 w-24 text-white"
            onClick={() => {
              navigate("/addpatient");
            }}
          >
            Register users
          </button>
        </div>
        <div className="flex  items-center -space-x-3">
          <BellIcon className="h-8 w-8" color="#454545" />
          <button
            onClick={() => {
              navigate("/userrequests");
            }}
            className="hover:text-slate-600  rounded-md h-10 w-24 text-white"
          >
            user Requests
          </button>
        </div>
        <div className="flex  items-center -space-x-3">
          <img src={settings} className="h-8 w-8" />
          <button className="hover:text-slate-600  rounded-md h-10 w-24 text-white">
            Settings
          </button>
        </div>
      </div>
      <div className=" flex float-right items-center space-x-2 cursor-pointer">
        <img src={exit} className=" h-8 w-8 " />
        <button
          className=" text-white  hover:text-slate-600 "
          onClick={() => {
            dispatch(clearState());
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navigation;
