import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import CardRow from "./CardRow";
import { data } from "./patientsFakeData";
import { generateRowData } from "./generateRowData";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
//import { useNavigation } from "react-router-dom";
import { getPatients } from "../../features/Admin/userRequestsSlice";
import UserCardDetails from "./UserCardDetails";
function CardsHolder() {
  //  const { totalUsers } = useSelector((store) => store.getUsers);
  // const navigate = useNavigation();
  const dispatch = useDispatch();
  const { users } = useSelector((store) => store.userRequest);
  const [use, setUsers] = useState(users);
  const [showUserDetails, setShowUserDetails] = useState("false");
  const [userIDToGetDetailsFor, setUserIDToGetDetailsFor] = useState(-1);
  /*useEffect(() => {
    if (isLoggedIn !== true || isError !== false) navigate("/");
  }, [isLoggedIn, isError]);*/

  useEffect(() => {
    //if(use.length !=== 0)
    dispatch(getPatients());
  }, []);

  return (
    <div>
      <div className="p-4 relative ">
        <input
          type="text"
          placeholder="Search by name.."
          className="rounded-md bg-violet-900/10 text-black "
        ></input>
      </div>
      <div className="flex-col space-x space-y-3 p-4  rounded-lg">
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
        <div className="space-y-3">
          {users.map((p) => {
            return (
              <div
                className="z-0 relative"
                key={p.id}
                onClick={() => {
                  setUserIDToGetDetailsFor(p.id);
                  setShowUserDetails("true");
                }}
              >
                <UserCard
                  firstName={p.firstName}
                  lastName={p.lastName}
                  email={p.email}
                ></UserCard>
              </div>
            );
          })}

          <div className="z-10 absolute pointer-events-none inset-y-1/4 inset-x-1/4   ">
            {showUserDetails === "true" ? (
              <UserCardDetails
                id={userIDToGetDetailsFor}
                userType={"patient"}
                setShowUserDetails={setShowUserDetails}
              />
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardsHolder;
