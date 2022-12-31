import { configureStore } from "@reduxjs/toolkit";
import userRequestsSlice from "./features/Admin/userRequestsSlice";
import sessionReducer from "./features/Admin/sessionSlice";
import patientRegisterSlice from "./features/Admin/PatientRegisterSlice";
import userRequestInfoSlice from "./features/Admin/userRequestInfoSlice";
import deletePatientSlice from "./features/Admin/deletePatientSlice";
import updatePatientSlice from "./features/Admin/updatePatientSlice";
import managePatientsCaregiversSlice from "./features/Admin/managePatientsCaregiversSlice";
import deletePCandCPSlice from "./features/Admin/deletePCandCPSlice";
import patientsAndCaregiversSlice from "./features/Admin/patientsAndCaregivers";
import activateSocialworkerSlice from "./features/Admin/activateSocialworkerSlice";
import mapRequestsSlice from "./features/Admin/mapRequestsSlice";
export const store = configureStore({
  reducer: {
    patientRegister: patientRegisterSlice,
    userRequest: userRequestsSlice,
    session: sessionReducer,
    userRequestInfo: userRequestInfoSlice,
    deletePatient: deletePatientSlice,
    updatePatient: updatePatientSlice,
    managePatientsCaregivers: managePatientsCaregiversSlice,
    deletePCandCP: deletePCandCPSlice,
    patientsAndCaregivers: patientsAndCaregiversSlice,
    activateSocialworker: activateSocialworkerSlice,
    mapRequests: mapRequestsSlice,
  },
});
