import React from "react";
import AddCaregiverToPatient from "./AddCaregiverToPatient";
import AddPatientToCaregiver from "./AddPatientToCaregiver";

function Card(props) {
  return (
    <div className=" w-96 mx-auto my-20 ">
      {props.userType === "PATIENT" ? (
        <AddCaregiverToPatient
          firstName={props.firstName}
          lastName={props.lastName}
          setAddCaregiver={props.setAddCaregiver}
          id={props.id}
        />
      ) : (
        <AddPatientToCaregiver
          firstName={props.firstName}
          lastName={props.lastName}
          setAddCaregiver={props.setAddCaregiver}
          id={props.id}
        />
      )}
    </div>
  );
}

export default Card;
