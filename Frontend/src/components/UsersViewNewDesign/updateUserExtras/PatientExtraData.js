import React from "react";

function PatientExtraData(props) {
  return (
    <div className="space-y-2 flex-col p-4">
      <div className="flex  text-gray-400 items-center">
        Registered by
        <input
          name="registeredBy"
          type="text"
          value={props.registeredBy}
          className="text-violet-400/90 rounded-md bg-violet-200/40 p-1 mx-2 w-fit"
          disabled
        />
      </div>
      <div className="flex  text-gray-400 items-center">
        Illness
        <select
          name="Illness"
          className="text-violet-400/90 rounded-md bg-violet-200/40 pl-8 pr-12 text-gray-400 p-1 mx-2 w-"
          value={props.illnessType}
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
      <div className="flex  text-gray-400 items-center">
        Condition description
        <textarea
          name="Current condition description"
          type="text"
          value={props.conditionDescription}
          className="text-violet-400/90 rounded-md bg-violet-200/40 p-1 mx-2 w-9/12 h-44 "
          required
          onChange={(e) => {
            props.setConditionDescription(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default PatientExtraData;
