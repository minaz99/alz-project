import React, { useState } from "react";
import { motion } from "framer-motion";
function PatientForm(props) {
  const [birthdayClicked, setBirthdayClicked] = useState(false);
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="tracking-wider text-2xl pt-10 text-purple-600/60"
      >
        Patient Personal Information
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: -200 }}
        transition={{ duration: 1.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="p-4"
      >
        <form className="space-y-4 ">
          <div className="space-x-2 flex flex-row justify-center ">
            <input
              name="fname"
              type="text"
              placeholder="First Name"
              className="rounded-md bg-violet-200/40 p-2 "
              required
              onChange={(e) => {
                props.setFirstname(e.target.value);
              }}
            />
            <input
              name="lname"
              type="text"
              placeholder="Last Name"
              className="rounded-md bg-violet-200/40 p-2 "
              required
              onChange={(e) => {
                props.setLastname(e.target.value);
              }}
            />
          </div>
          <div className="space-x-2 p-2f flex justify-center">
            <input
              placeholder="Birth date"
              name="Birthdate"
              type={birthdayClicked ? "date" : "text"}
              className={
                birthdayClicked
                  ? "rounded-md bg-violet-200/40 p-2 pl-8 pr-6"
                  : "rounded-md bg-violet-200/40 p-2"
              }
              onClick={() => {
                setBirthdayClicked(true);
              }}
              required
              onChange={(e) => {
                props.setDateOfBirth(e.target.value);
              }}
            />
            <select
              name="gender"
              className="rounded-md bg-violet-200/40 p-2 pl-8 pr-12 text-gray-400"
              required
              onChange={(e) => {
                props.setGender("MALE");
              }}
            >
              <option value="none">Select gender</option>
              <option value="male">MALE</option>
              <option value="female">FEMALE</option>
            </select>
          </div>

          <div className=" space-x-2 flex justify-center">
            <input
              name="address"
              type="text"
              placeholder="Address"
              className="rounded-md bg-violet-200/40 p-2"
              required
              onChange={(e) => {
                props.setAddressId(e.target.value);
              }}
            />
            <input
              name="number"
              type="number"
              placeholder="Phone number"
              className="rounded-md bg-violet-200/40 p-2"
              required
            />
          </div>
          <div className=" space-x-2 flex pl-6">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="rounded-md bg-violet-200/40 p-2"
              required
              onChange={(e) => {
                props.setEmail(e.target.value);
              }}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="rounded-md bg-violet-200/40 p-2"
              required
              onChange={(e) => {
                props.setPassword(e.target.value);
              }}
            />
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default PatientForm;
