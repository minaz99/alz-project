import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  //toFetch: "users",
  patientsCount: 0,
  caregiversCount: 0,
  socialworkersCount: 0,
  totalUsers: 0,
  Fetching: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
  patientUrl: `https://alzcors.herokuapp.com/https://alz-project.herokuapp.com/patient`,
  caregiverUrl: `https://alzcors.herokuapp.com/https://alz-project.herokuapp.com/caregiver`,
  usersUrl: `https://alzcors.herokuapp.com/https://alz-project.herokuapp.com/users`,
  socialworkersUrl: `https://alzcors.herokuapp.com/http://alz-project.herokuapp.com/social-worker/notActivated`,
};
//const url = `https://alzcors.herokuapp.com/https://alz-project.herokuapp.com/patient`;
export const getOneTypeOfUsers = createAsyncThunk(
  "/allUsersOfType",
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

const patientsAndCaregiversSlice = createSlice({
  name: "patientsAndCaregivers",
  initialState,
  reducers: {
    setOneUser: (state, action) => {
      state.oneUser = true;
    },
    deleteOneUser: (state, action) => {
      state.totalUsers -= 1;
    },
    getPatientsCount: (state, action) => {
      state.patientsCount = 0;
      state.users.forEach((user) =>
        user.userType === "PATIENT"
          ? state.patientsCount++
          : state.patientsCount
      );
    },
    getCaregiversCount: (state, action) => {
      state.caregiversCount = 0;
      state.users.forEach((user) =>
        user.userType === "CAREGIVER"
          ? state.caregiversCount++
          : state.caregiversCount
      );
    },
    getSocialworkersCount: (state, action) => {
      state.socialworkersCount = 0;
      state.users.forEach((user) =>
        user.userType === "SOCIAL-WORKER"
          ? state.socialworkersCount++
          : state.socialworkersCount
      );
    },
  },
  extraReducers: {
    [getOneTypeOfUsers.fulfilled]: (state, { payload }) => {
      state.users = [];
      for (const [key, value] of Object.entries(payload)) {
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
          needs,
          patients,
          caregivers,
          registeredBy,
          userType,
          phoneNumber,
        } = payload[key];

        state.users.push({
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
          needs,
          patients,
          caregivers,
          registeredBy,
          userType,
          phoneNumber,
        });
      }

      //console.log(state.email);
      state.Fetching = false;
      state.isSuccess = true;
      state.totalUsers = state.users.length; //state.patients.length + state.caregivers.length;
      //state.allUsers = [];
      //state.allUsers = [...state.patients, ...state.caregivers];
      return state;
    },
    [getOneTypeOfUsers.rejected]: (state, { payload }) => {
      console.log("payload", payload);
      state.Fetching = false;
      state.isError = true;
      //state.errorMsg = payload.message;
    },
    [getOneTypeOfUsers.pending]: (state) => {
      state.Fetching = true;
    },
  },
});
export const {
  setOneUser,
  deleteOneUser,
  setUrlType,
  getPatientsCount,
  getCaregiversCount,
} = patientsAndCaregiversSlice.actions;
export default patientsAndCaregiversSlice.reducer;
