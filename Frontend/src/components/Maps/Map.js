import { GoogleMap } from "@react-google-maps/api";
import React, { useMemo, useRef, useState } from "react";
import Mark from "./Mark";

function Map(props) {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);
  return (
    <GoogleMap
      zoom={10}
      center={center}
      mapContainerStyle={{ width: "100%", height: "100vh" }}
    >
      <Mark />
    </GoogleMap>
  );
}

export default Map;
