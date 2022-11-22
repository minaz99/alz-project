import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Navigation from "./Navigation";
import PatientsWithoutCaregiver from "./Stats/PatientsWithoutCaregiver";
import DivisionOfUsers from "./Stats/DivisionOfUsers";
import UserCount from "./Stats/UserCount";
import {
  userSelector,
  fetchUserBytoken,
  clearState,
  logOut,
} from "../../features/Admin/sessionSlice";
//import Loader from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFetching, isError } = useSelector((store) => store.session);
  /*useEffect(() => {
    dispatch(fetchUserBytoken({ token: localStorage.getItem("token") }));
  }, []);*/
  const { username, email, isLoggedIn } = useSelector((store) => store.session);
  const uname = email.slice(0, 3);
  useEffect(() => {
    if (isError || isLoggedIn === false) {
      //dispatch(clearState());
      navigate("/");
    }
  }, [isError, isLoggedIn]);

  return (
    <div className="container mx-auto ">
      <div className="bg-violet-400/80 mx-48 items-center justify-center rounded-md">
        <Navigation username={uname} />
        <div className="flex p-14 space-x-24 mx-auto items-center justify-center">
          <PatientsWithoutCaregiver />
          <DivisionOfUsers />
        </div>
        <div className="flex p-4 -my-6 mx-auto items-center justify-center space-x-12">
          <UserCount
            user="Users"
            count="105"
            color={"rgb(255 251 235)"}
            shadow="0 4px 6px -1px rgb(255 251 235), 0 2px 4px -2px rgb(255 251 235)"
          />
          <UserCount
            user="Patients"
            count="48"
            color={"rgb(141 242 168)"}
            shadow="0 4px 6px -1px rgb(141 242 168), 0 2px 4px -2px rgb(141 242 168 )"
          />
          <UserCount
            user="Caregivers"
            count="55"
            color={"rgb(244 146 65)"}
            shadow="0 4px 6px -1px rgb(244 146 65), 0 2px 4px -2px rgb(244 146 65)"
          />
          <UserCount
            user="Social workers"
            count="2"
            color={"rgb(73 119 245)"}
            shadow="0 4px 6px -1px rgb(73 119 245), 0 2px 4px -2px rgb(73 119 245)"
          />
        </div>
      </div>
      {/*<Fragment>
        <div className="container mx-auto">
          Welcome back <h3>{email}</h3>
        </div>
        <button
          className="bg-violet-300 rounded-md h-10 w-20"
          onClick={() => {
            dispatch(clearState());
          }}
        >
          Log out
        </button>
        </Fragment>*/}
    </div>
  );
};
export default Dashboard;
