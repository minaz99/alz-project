import React from "react";
import { Marker } from "@react-google-maps/api";
function Mark(props) {
  return (
    <Marker position={{ lat: 44, lng: -80 }} onClick={() => alert("hi")} />
  );
}

export default Mark;
