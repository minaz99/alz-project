import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { Style } from "victory";
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import IllnessList from "./IllnessList";
const PatientFamilyForm = (props) => {
  const dispatch = useDispatch();
  const [showIllnessList, setShowIllnessList] = useState(false);
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, x: -150 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="tracking-wider text-2xl  text-purple-600/60"
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
          {" "}
          <div className="space-y-2">
            <div className="rounded-md flex items-center  w-fit mx-auto bg-violet-200/40 p-2 pl-8 pr-12 text-gray-400 space-x-2">
              <div className="">Illnesses</div>
              <div className="bg-white rounded-full w-6 h-6 items-center">
                {props.illnessCount}
              </div>
              <PlusCircleIcon
                onClick={() => setShowIllnessList(true)}
                className="w-6 h-6 cursor-pointer "
                color="gray"
              />
            </div>

            {showIllnessList === true ? (
              <IllnessList
                addDisease={props.addDisease}
                setShowIllnessList={setShowIllnessList}
              />
            ) : (
              <div></div>
            )}
          </div>
          <div className="space-x-2 p-2f flex justify-center">
            <textarea
              name="Current condition description"
              type="text"
              placeholder="Description of current condition....."
              className="rounded-md bg-violet-200/40 p-2 w-9/12 h-44 "
              required
              onChange={(e) => {
                props.setConditionDescription(e.target.value);
              }}
            />
          </div>
          <div className="space-x-2 p-2f flex justify-center">
            <textarea
              name="Needs"
              type="text"
              placeholder="Enter patient's needs....."
              className="rounded-md bg-violet-200/40 p-2 w-9/12  "
              required
              onChange={(e) => {
                props.setNeeds(e.target.value);
              }}
            />
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PatientFamilyForm;
