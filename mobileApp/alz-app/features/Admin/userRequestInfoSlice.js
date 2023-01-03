import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "-1",
  firstName: "",
  lastName: "",
  email: "",
  dateOfBirth: "",
  age: "",
  gender: "",
  addressId: "",
  illnessType: "",
  conditionDescription: "",
  caregivers: "",
  needs: "",
  patients: "",
  registeredBy: "",
  userType: "",
  phoneNumber: "",
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
  urlPatient: `https://alz-project.herokuapp.com/patient/`,
  urlCaregiver: `https://alz-project.herokuapp.com/caregiver/`,
  urlSocialworker: `https://alz-project.herokuapp.com/social-worker/`,
};
//const url2 = `https://dummyjson.com/users/`;
//const url1 = `https://alzcors.herokuapp.com/https://alz-project.herokuapp.com/patient/`;
export const getPatientInfo = createAsyncThunk(
  "/patient/",
  async (url, thunkAPI) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();

      if (response.status === 200)
        return { ...data }; //console.log(data.token);
      else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      //console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const userRequestInfoSlice = createSlice({
  name: "userRequestInfo",
  initialState,
  reducers: {
    clearCard: (state, action) => {
      state.id = "-1";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.dateOfBirth = "";
      state.age = "";
      state.gender = "";
      state.addressId = "";
      state.illnessType = "";
      state.conditionDescription = "";
      state.caregivers = "";
      state.registeredBy = "";
      state.userType = "";
      state.needs = "";
      state.patients = "";
      state.phoneNumber = "";
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      state.errorMsg = "";
    },
  },
  extraReducers: {
    [getPatientInfo.fulfilled]: (state, { payload }) => {
      //state.users = payload;

      /*   for (const [key, value] of Object.entries(payload)) {
        //alert(`${key}: ${value}`);
        const {
          id,
          firstName,
          lastName,
          email,
          dateOfBirth,
          age,
          gender,
          addressId,
          illnessType,
          conditionDescription,
          caregivers,
          registeredBy,
        } = payload[key];
*/

      state.id = payload.id;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.email = payload.email;
      state.dateOfBirth = payload.dateOfBirth;
      state.age = payload.age;
      state.gender = payload.gender;
      state.addressId = payload.addressId;
      state.illnessType = payload.illnessType;
      state.conditionDescription = payload.conditionDescription;
      state.caregivers = payload.caregivers;
      state.registeredBy = payload.registeredBy;
      state.userType = payload.userType;
      state.needs = payload.needs;
      state.patients = payload.patients;
      // thunkAPI.totalUsers++;
      state.phoneNumber = payload.phoneNumber;
      //console.log(state.email);
      state.isFetching = false;
      state.isSuccess = true;
      //state.isLoggedIn = true;
      return state;
    },
    [getPatientInfo.rejected]: (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isError = true;
      //state.errorMsg = payload.message;
    },
    [getPatientInfo.pending]: (state) => {
      state.isFetching = true;
    },
  },
});
export const { clearCard } = userRequestInfoSlice.actions;
export default userRequestInfoSlice.reducer;
