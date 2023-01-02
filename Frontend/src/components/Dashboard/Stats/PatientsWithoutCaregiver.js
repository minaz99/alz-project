import React from "react";

function PatientsWithoutCaregiver(props) {
  return (
    <div className="bg-slate-700 items-center rounded-lg h-72 w-64 p-4 space-y-2">
      <div className="p-4">
        <h2 className="text-white font-semibold text-center text-2xl">
          Patients without
        </h2>
        <h2 className="text-white font-semibold text-center text-2xl  ">
          caregiver
        </h2>
      </div>
      <div className="p-6 py-12  bg-amber-50 text-slate-700 rounded-md h-32 w-32 mx-auto text-center font-bold text-3xl ">
        {props.count}%
      </div>
    </div>
  );
}

export default PatientsWithoutCaregiver;
