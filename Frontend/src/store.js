import { configureStore } from "@reduxjs/toolkit";
import userRequestsSlice from "./features/Admin/userRequestsSlice";
import sessionReducer from "./features/Admin/sessionSlice";
import patientRegisterSlice from "./features/Admin/PatientRegisterSlice";
import userRequestInfoSlice from "./features/Admin/userRequestInfoSlice";
export const store = configureStore({
  reducer: {
    patientRegister: patientRegisterSlice,
    userRequest: userRequestsSlice,
    session: sessionReducer,
    userRequestInfo: userRequestInfoSlice,
  },
});
