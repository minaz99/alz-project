import "./App.css";
import Login from "./components/Login";
import FormCard from "./components/PatientForm/FormCard";
import CardsHolder from "./components/UsersView/CardsHolder";
import { data } from "./components/UsersView/patientsFakeData";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
function App() {
  //let datas = [];
  //let constant = 5;

  /*for (let i = 0; i < data.length; i = i + constant) {
    datas.push(data.slice(i, i + constant));
  }*/

  return (
    <div className="bg-violet-400/40 h-screen items-center p-4 ">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Dashboard" element={<Dashboard />} />
          {/*<FormCard />*/}
          {/*<CardsHolder />*/}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
