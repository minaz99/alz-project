import { configureStore } from "@reduxjs/toolkit";
import getUsersReducer from "./features/Users/getUsersSlice";
import sessionReducer from "./features/Admin/sessionSlice";
export const store = configureStore({
  reducer: { getUsers: getUsersReducer, session: sessionReducer },
});
