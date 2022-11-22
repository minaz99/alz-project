import React, { useState } from "react";
import ribbon from "../img/ribbon.png";
import { useSelector } from "react-redux";
import { store } from "../store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearState } from "../features/Admin/sessionSlice";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/Admin/sessionSlice";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    (store) => store.session
  );

  const onSubmit = (e) => {
    e.preventDefault();
    //console.log(email);
    //console.log("submitting form");
    const data = {
      email: email,
      password: password,
    };
    dispatch(loginUser(data));
  };
  useEffect(() => {
    if (isError) {
      //toast.error(errorMessage);
      alert(errorMessage);
      dispatch(clearState());
    }
    if (isSuccess) {
      //dispatch(clearState());
      navigate("/Dashboard");
    }
  }, [isError, isSuccess]);

  return (
    <div className="items-center  justify-center flex flex-row h-full ">
      <div className="bg-white border-4 rounded-md border-transparent p-24">
        <h2 className="font-bold text-xl p-2">Sign in</h2>
        <form method="POST" onSubmit={onSubmit} className=" space-y-4 grid ">
          <input
            type="text"
            name="uname"
            placeholder="Username"
            className="bg-violet-200/40 rounded-md text-lg p-2 "
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="bg-violet-200/40 rounded-md text-lg p-2"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-black rounded-md p-2 font-bold text-md text-white"
          >
            Sign in
          </button>
          <h3 className="text-sm text-sky-700 cursor-pointer">
            Forgot password?
          </h3>
        </form>
      </div>
      <div className="border-4 shadow-2xl border-transparent rounded-md space-y-2  ">
        <div className="pt-24 pb-28 p-8 items-center text-center">
          <div className="p-4">
            <img
              src={ribbon}
              alt="alzheimer ribbon"
              className="float-right h-24 w-24"
            />
          </div>
          <h1 className=" text-2xl tracking-wider p-2 ">
            Welcome to admin panel
          </h1>
          <div className="space-y-4 p-4">
            <h2 className="text-sm ">Need a new admin account?</h2>
            <button className=" bg-violet-400/40 rounded-md p-2 text-violet-600 s">
              Request new admin account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
