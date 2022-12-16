import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "autoprefixer";
import axios from "../../api/axios";

const initialState = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  age: "",
  gender: "",
  addressId: "",
  //phoneNumber: "",
  email: "",
  password: "",
  illnessType: "",
  conditionDescription: "",
  caregivers: "",
  regsiteredBy: "",
  // userType: "",
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
};
const url = `https://alzcors.herokuapp.com/https://alz-project.herokuapp.com/patient`;
export const registerPatient = createAsyncThunk(
  "/register",
  async (
    {
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      //age,
      gender,
      addressId,
      //phoneNumber,
      illnessType,
      conditionDescription,
      caregivers,
      registeredBy,
      //userType,
    },
    thunkAPI
  ) => {
    try {
      const response = await fetch(url, {
        method: "POST",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          dateOfBirth,
          //age,
          gender,
          addressId,
          illnessType,
          conditionDescription,
          caregivers,
          registeredBy,
          // userType,
        }),
      });
      let data = await response.status;

      //if (response.status === 200)
      //return { ...data };
      //alert("perfect"); //console.log(data.token);
      //else {
      // return thunkAPI.rejectWithValue(data);
      // }
    } catch (e) {
      //console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const patientRegisterSlice = createSlice({
  name: "patientRegister",
  initialState,
  reducers: {},
  extraReducers: {
    [registerPatient.fulfilled]: (state, { payload }) => {
      //{state.users} = payload.data;
      //console.log(state.email);
      state.isFetching = false;
      state.isSuccess = true;
      //state.isLoggedIn = true;
      return state;
    },
    [registerPatient.rejected]: (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isError = true;
      //state.errorMsg = payload.message;
    },
    [registerPatient.pending]: (state) => {
      state.isFetching = true;
    },
  },
});
export default patientRegisterSlice.reducer;
