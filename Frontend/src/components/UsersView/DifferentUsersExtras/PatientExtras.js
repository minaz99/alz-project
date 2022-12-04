import React from "react";

function PatientExtras(props) {
  return (
    <div className="text-neutral-600 space-y-2">
      <div>Illness type: {props.illness}</div>
      <div>Condition description: {props.description}</div>
      <div>Caregivers: {props.caregivers}</div>
      <div>Registered by: {props.registeredBy}</div>
    </div>
  );
}

export default PatientExtras;
