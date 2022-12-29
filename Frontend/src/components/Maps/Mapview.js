import React, { useEffect, useRef, useState } from "react";
import Navigation from "../Dashboard/Navigation";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "./Map";
import { useLoadScript } from "@react-google-maps/api";
import { Alert } from "flowbite-react";
import Mark from "./Mark";
function Mapview() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAJxqZpTKQblkTwa5Lhznl5qtQ-nYQqRLc",
  });
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className="container mx-auto ">
      <div className="bg-violet-400/80 mx-48 items-center h-full  p-2 space-y-2 justify-center rounded-md">
        <Navigation />
        <div>
          <Map></Map>
        </div>
      </div>
    </div>
  );
}

export default Mapview;
