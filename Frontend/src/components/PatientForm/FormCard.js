import React, { useState } from "react";
import { motion } from "framer-motion";
import health from "../../img/health.png";
import patient from "../../img/patient.png";
import description from "../../img/product-description.png";
import PatientFamilyForm from "./PatientFamilyForm";
import PatientForm from "./PatientForm";
//import IllnessForm from "./IllnessForm";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { registerPatient } from "../../features/Admin/PatientRegisterSlice";
function FormCard() {
  const [currentForm, setCurrentForm] = useState("Patient");
  const formSetter = () => {
    if (currentForm === "Patient") setCurrentForm("Illness");
  };
  const dispatch = useDispatch();
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [addressId, setAddressId] = useState("");
  const [illnessType, setIllnessType] = useState("");
  const [conditionDescription, setConditionDescription] = useState("");
  const [registeredBy, setRegisteredBy] = useState("Admin");
  const [caregivers, setPatientCaregivers] = useState("");

  return (
    <div className=" p-4 text-center mx-auto justify-evenly items-center h-full ">
      <motion.div
        initial={{ opacity: 0, x: -400 }}
        transition={{ duration: 1.5 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="bg-white p-4  mx-auto w-fit shadow-2xl rounded-2xl  h-full "
      >
        {currentForm === "Patient" ? (
          <PatientForm
            setFirstname={setFirstname}
            setLastname={setLastname}
            setDateOfBirth={setDateOfBirth}
            setAge={setAge}
            setAddressId={setAddressId}
            setGender={setGender}
            setEmail={setEmail}
            setPassword={setPassword}
          />
        ) : (
          <PatientFamilyForm
            setRegisteredBy={setRegisteredBy}
            setIllnessType={setIllnessType}
            setConditionDescription={setConditionDescription}
            setPatientCaregivers={setPatientCaregivers}
          />
        )}
        <div className="flex p-8 items-center mx-auto justify-center ">
          <motion.div
            initial={{ opacity: 0, x: -400 }}
            transition={{ duration: 2 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-row items-center space-x-4 "
          >
            {currentForm === "Patient" ? (
              <img src={patient} alt="patient" className="h-12 w-12 " />
            ) : (
              <motion.img
                initial={{}}
                transition={{ duration: 1.5 }}
                whileInView={{ opacity: 1, scale: 0.75 }}
                src={patient}
                alt="patient"
                className="h-12 w-12"
              />
            )}
            {currentForm === "Illness" ? (
              <motion.div
                initial={{}}
                transition={{ duration: 4 }}
                whileInView={{}}
                className="h-1 w-28 bg-purple-600/60"
              />
            ) : (
              <div className="h-1 w-28 bg-gray-400/40" />
            )}
            {currentForm === "Illness" ? (
              <motion.img
                initial={{}}
                transition={{ duration: 1.5 }}
                whileInView={{ scale: 1.1 }}
                src={health}
                alt="family"
                className="h-12 w-12"
              />
            ) : (
              <motion.img
                initial={{}}
                transition={{ duration: 1.5 }}
                whileInView={{ opacity: 1, scale: 0.75 }}
                src={health}
                alt="family"
                className="h-12 w-12"
              />
            )}
          </motion.div>
        </div>

        <button
          type="submit"
          className="flex bg-purple-600/60 text-white rounded-md text-md font-bold p-2 pr-8 pl-8 mx-auto "
          onClick={() => {
            if (currentForm === "Patient") setCurrentForm("Illness");
            else {
              dispatch(
                registerPatient({
                  firstName,
                  lastName,
                  email,
                  password,
                  dateOfBirth,
                  age,
                  gender,
                  addressId,
                  illnessType,
                  conditionDescription,
                  caregivers,
                  registeredBy,
                })
              );
            }
          }}
        >
          {currentForm === "Illness" ? "Submit" : "Next"}
          <div className="pl-2">
            <ArrowRightCircleIcon className="h-6 w-6" />
          </div>
        </button>
      </motion.div>
    </div>
  );
}

export default FormCard;
