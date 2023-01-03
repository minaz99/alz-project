import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  age: "",
  gender: "",
  addressId: "",
  phoneNumber: "",
  email: "",
  password: "",
  illnessType: "",
  conditionDescription: "",
  needs: "",
  coordinates: "",
  regsiteredBy: "",
  // userType: "",
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
  patientUrl: `https://alz-project.herokuapp.com/patient`,
  caregiverUrl: `https://alz-project.herokuapp.com/caregiver`,
  socialworkerUrl: `https://alz-project.herokuapp.com/social-worker`,
};
const url = `https://alz-project.herokuapp.com/patient`;
export const registerPatient = createAsyncThunk(
  "/register",
  async (
    {
      url,
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      age,
      gender,
      phoneNumber,
      addressId,
      illnessType,
      conditionDescription,
      needs,
      //  caregivers,
      registeredBy,
      coordinates,
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
          age,
          gender,
          phoneNumber,
          addressId,
          illnessType,
          conditionDescription,
          //caregivers,
          registeredBy,
          needs,
          coordinates,
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
  reducers: {
    resetIsSuccess: (state) => {
      state.isSuccess = false;
    },
  },
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
export const { resetIsSuccess } = patientRegisterSlice.actions;
export default patientRegisterSlice.reducer;
