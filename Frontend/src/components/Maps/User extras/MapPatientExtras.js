import React from "react";
import PatientExtras from "../../UsersView/DifferentUsersExtras/PatientExtras";

function MapPatientExtras(props) {
  return (
    <div className="text-white bg-amber-400 rounded-md  p-2">
      <PatientExtras
        registeredBy={props.registeredBy}
        illnessType={props.illnessType}
        conditionDescription={props.conditionDescription}
        caregivers={props.caregivers}
        id={props.id}
      />
    </div>
  );
}

export default MapPatientExtras;
