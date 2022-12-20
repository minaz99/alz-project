import "./App.css";
import Login from "./components/Login";
import FormCard from "./components/PatientForm/FormCard";
import CardsHolder from "./components/UsersView/CardsHolder";
import { data } from "./components/UsersView/patientsFakeData";
import { BrowserRouter as Router, Routes, Route, Form } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import PatientForm from "./components/PatientForm/PatientForm";
import OutlineCard from "./components/UsersViewNewDesign/OutlineCard";
import { useState } from "react";
import SocialWorkersRequests from "./components/Socialworkers/SocialWorkersRequests";
function App() {
  return (
    <div className="bg-violet-400/40 h-screen overflow-y-auto items-center p-4 ">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          {/*<FormCard />*/}
          <Route exact path="/addpatient" element={<FormCard />} />
          <Route exact path="/users" element={<OutlineCard />} />
          <Route
            exact
            path="/userrequests"
            element={<SocialWorkersRequests />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
