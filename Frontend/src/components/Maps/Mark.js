import React, { useEffect, useMemo, useState } from "react";
import {
  Circle,
  GoogleMap,
  Marker,
  MarkerClusterer,
  MarkerF,
} from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { setMarkerData } from "../../features/Admin/mapRequestsSlice";
import MapuserData from "./MapuserData";
function Mark(props) {
  //const handleOnLoad = (map) => {};
  const center = useMemo(() => ({ lat: 52.2594345, lng: 21.0010801 }), []);
  //const [cords, setCords] = useState([]);
  const [showData, setShowData] = useState(false);
  //const google = window.google;
  const dispatch = useDispatch();
  const { changingData, cords } = useSelector((store) => store.mapRequests);
  const [UD, setUD] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressId, setaddressId] = useState("");
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [illnessType, setIllnessType] = useState("");
  const [conditionDescription, setConditionDescription] = useState("");
  const [needs, setNeeds] = useState("");
  const [id, setId] = useState("");
  const [patients, setPatients] = useState("");
  const [caregivers, setCaregivers] = useState("");
  const [registeredBy, setRegisteredBy] = useState("");
  const userData = [
    {
      id: 0,
      firstName: "Minato",
      lastName: "Namikaze",
      age: "23",
      gender: "Male",
      userType: "Patient",
      addressId: "Spiska 1, 02-302 Warszawa",
      cords: { lat: 52.2216748, lng: 20.9839958 },
      phoneNumber: "45382984",
      email: "minato@gmail.com",
      dateOfBirth: "1982-03-02",
      illnessType: "Early-onset",
      conditionDescription: "Good",
      patients: "",
      registeredBy: "",
    },
    {
      id: 1,
      firstName: "Kushina",
      lastName: "Uzumaki",
      age: "23",
      gender: "Female",
      userType: "Patient",
      addressId: "Rynek Starego Miasta, 00-272 Warszawa",
      cords: { lat: 52.2497893, lng: 21.0121706 },
      phoneNumber: "45382984",
      email: "kushina@gmail.com",
      dateOfBirth: "1982-03-02",
      illnessType: "Early-onset",
      conditionDescription: "Good",
      patients: "",
      registeredBy: "",
    },
    {
      id: 2,
      firstName: "Naruto",
      lastName: "Uzumaki",
      age: "23",
      gender: "Male",
      userType: "Caregiver",
      addressId: "plac Defilad 1, 00-901 Warszawa",
      cords: { lat: 52.2319896, lng: 21.0067218 },
      phoneNumber: "45382984",
      email: "naruto@gmail.com",
      dateOfBirth: "1982-03-02",
      needs: "Flexible time during the weekend",
      caregivers: "",
    },
    {
      id: 3,
      firstName: "Hinata",
      lastName: "Houyga",
      age: "23",
      gender: "Female",
      userType: "Caregiver",
      addressId: "Warsaw University of Technology",
      cords: { lat: 52.2212012, lng: 21.0080857 },
      phoneNumber: "45382984",
      email: "hinata@gmail.com",
      dateOfBirth: "1982-03-02",
      needs: "Flexible time during the weekend",
      caregivers: "",
    },
    {
      id: 4,
      firstName: "Sasuke",
      lastName: "Uchiha",
      age: "23",
      gender: "Male",
      userType: "Social worker",
      addressId: "al. Jana Pawła II 82, 00-175 Warszawa",
      cords: { lat: 52.2564132, lng: 20.9830183 },
      phoneNumber: "45382984",
      email: "sasuke@gmail.com",
      dateOfBirth: "1982-03-02",
      needs: "Flexible time during the weekend",
    },
    {
      id: 5,
      firstName: "Sakura",
      lastName: "Haruno",
      age: "23",
      gender: "Female",
      userType: "Social worker",
      addressId: "Madalinskiego 108/4 - Mokotow",
      cords: { lat: 52.2019854, lng: 21.0011295 },
      phoneNumber: "45382984",
      email: "sakura@gmail.com",
      dateOfBirth: "1982-03-02",
      needs: "Flexible time during the weekend",
    },
  ];
  const displayUserInfo = (
    id,
    fn,
    ln,
    a,
    phone,
    gend,
    type,
    add,
    em,
    dob,
    ill = "",
    condD = "",
    ne = "",
    patients = "",
    caregivers = "",
    registeredBy = ""
  ) => {
    setId(id);
    setFirstName(fn);
    setLastName(ln);
    setAge(a);
    setPhoneNumber(phone);
    setGender(gend);
    setUserType(type);
    setaddressId(add);
    setEmail(em);
    setDateOfBirth(dob);
    setIllnessType(ill);
    setConditionDescription(condD);
    setNeeds(ne);
    setPatients(patients);
    setCaregivers(caregivers);
    setRegisteredBy(registeredBy);
  };

  useEffect(() => {
    setUD([]);
    setUD(userData);
  }, []);

  return (
    <div className="flex  space-x-2">
      {showData === true ? (
        <MapuserData
          firstName={firstName}
          lastName={lastName}
          age={age}
          gender={gender}
          phoneNumber={phoneNumber}
          addressId={addressId}
          userType={userType}
          setShowData={setShowData}
          email={email}
          dateOfBirth={dateOfBirth}
          illnessType={illnessType}
          conditionDescription={conditionDescription}
          needs={needs}
          id={id}
          patients={patients}
          caregivers={caregivers}
        />
      ) : (
        <div></div>
      )}
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerStyle={{ width: "100%", height: "100vh" }}
      >
        {UD.map((cord, index) => {
          return (
            <div>
              <Marker
                key={index}
                position={{
                  lat: cord.cords.lat,
                  lng: cord.cords.lng,
                }}
                onClick={() => {
                  setShowData(true);
                  displayUserInfo(
                    cord.id,
                    cord.firstName,
                    cord.lastName,
                    cord.age,
                    cord.phoneNumber,
                    cord.gender,
                    cord.userType,
                    cord.addressId,
                    cord.email,
                    cord.dateOfBirth,
                    cord.illnessType,
                    cord.conditionDescription,
                    cord.needs,
                    cord.patients,
                    cord.caregivers,
                    cord.registeredBy
                  );
                }}
              ></Marker>
            </div>
          );
        })}
      </GoogleMap>
    </div>
  );
}

export default Mark;
