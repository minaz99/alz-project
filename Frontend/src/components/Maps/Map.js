import { GoogleMap, Marker, MarkerClusterer } from "@react-google-maps/api";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCords,
  getCords,
  removeDublicates,
  setRequestsCount,
} from "../../features/Admin/mapRequestsSlice";
import Mark from "./Mark";
import { getPatients } from "../../features/Admin/userRequestsSlice";
import { google } from "google-maps";
function Map(props) {
  //const center = useMemo(() => ({ lat: 52.2594345, lng: 21.0010801 }), []);
  //const center = { lat: 52.2594345, lng: 21.0010801 };
  const dispatch = useDispatch();
  const { cords, googleUrl, apiKey, Fetching, requestsCount } = useSelector(
    (store) => store.mapRequests
  );
  const [userTypes, setUserTypes] = useState([]);
  let userT = [];
  useEffect(() => {
    /* dispatch(clearCords());
    props.users.forEach((user) => {
      dispatch(getCords(`${googleUrl}${user.addressId}${apiKey}`));
      userT.push({
        id: user.id,
        userType: user.userType,
        addressId: user.addressId,
      });
    });
    setUserTypes(userT);*/
  }, []);

  return <Mark />;
}

export default Map;
