import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
const PatientFamilyForm = (props) => {
  const dispatch = useDispatch();
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, x: -150 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="tracking-wider text-2xl pt-10 text-purple-600/60"
      >
        Illness Form
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, x: -300 }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="p-4"
      >
        <form className="space-y-4 ">
          <div className="space-x-2 flex flex-row justify-center ">
            {" "}
            <select
              name="Illness"
              className="rounded-md bg-violet-200/40 p-2 pl-8 pr-12 text-gray-400"
              required
              onChange={(e) => {
                props.setIllnessType(e.target.value);
              }}
            >
              <option value="none">Select type of Illness</option>
              <option value="Vascular Dementia">Vascular Dementia</option>
              <option value="Mixed Dementia">Mixed Dementia</option>
              <option value="Parkinson Disease">Parkison Disease</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="space-x-2 p-2f flex justify-center">
            <input
              name="Current condition description"
              type="text"
              placeholder="Description of current condition....."
              className="rounded-md bg-violet-200/40 p-2 w-full h-44 "
              required
              onChange={(e) => {
                props.setConditionDescription(e.target.value);
              }}
            />
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PatientFamilyForm;
