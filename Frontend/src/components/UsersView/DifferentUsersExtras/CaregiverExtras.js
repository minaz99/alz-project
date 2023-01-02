import React from "react";
import CaregiversPatients from "../../UsersViewNewDesign/updateUserExtras/CaregiversPatients";

function CaregiverExtras(props) {
  return (
    <div className="flex-col p-4 space-y-2 ">
      {props.mapView !== true ? (
        <div className="text-gray-400 flex">
          Phone number
          <div className="text-indigo-400 px-3">{props.phoneNumber}</div>
        </div>
      ) : (
        <div></div>
      )}
      <div className="text-gray-400 flex">
        Needs:
        <div className="text-indigo-400 px-4">{props.needs}</div>
      </div>
      <div className="text-gray-400 flex">
        Patients
        {<CaregiversPatients id={props.id} />}
      </div>
    </div>
  );
}

export default CaregiverExtras;
