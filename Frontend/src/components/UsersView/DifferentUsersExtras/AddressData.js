import React from "react";

function AddressData(props) {
  return (
    <div className="space-y-4">
      <div className="text-gray-400 flex ">
        Address <div className="text-indigo-400 px-4"> {props.addressId}</div>
      </div>
      <div className="text-gray-400 flex">
        District
        <div className=" rounded-md shadow-stone-300 bg-stone-100 shadow-md text-stone-600 text-center border px-4 mx-2">
          {props.district}
        </div>
      </div>
    </div>
  );
}

export default AddressData;
