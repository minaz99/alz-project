import { UsersIcon } from "@heroicons/react/24/outline";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "autoprefixer";
import axios from "../../api/axios";

const initialState = {
  users: [],
  totalUsers: 0,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
  //url: `https://cors-anywhere.herokuapp.com/https://alz-project.herokuapp.com/patient`,
  //  url2: `https://dummyjson.com/users`,
};
const url = `https://alzcors.herokuapp.com/https://alz-project.herokuapp.com/patient`;
export const getPatients = createAsyncThunk("/patient", async (thunkAPI) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();

    if (response.status === 200) return { ...data }; //console.log(data.token);
    else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (e) {
    //console.log("Error", e.response.data);
    thunkAPI.rejectWithValue(e.response.data);
  }
});

const userRequestsSlice = createSlice({
  name: "userRequest",
  initialState,
  reducers: {
    setOneUser: (state, action) => {
      state.oneUser = true;
    },
    deleteOneUser: (state, action) => {
      state.totalUsers -= 1;
    },
  },
  extraReducers: {
    [getPatients.fulfilled]: (state, { payload }) => {
      //state.users = [];

      //state.users = payload.users;
      //alert(state.users);
      // alert(typeof state.users);
      //state.totalUsers = state.users.length;
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
          caregivers,
          registeredBy,
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
          caregivers,
          registeredBy,
        });
        // thunkAPI.totalUsers++;
      }

      //console.log(state.email);
      state.isFetching = false;
      state.isSuccess = true;
      state.totalUsers = state.users.length;
      return state;
    },
    [getPatients.rejected]: (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isError = true;
      //state.errorMsg = payload.message;
    },
    [getPatients.pending]: (state) => {
      state.isFetching = true;
    },
  },
});
export const { setOneUser, deleteOneUser } = userRequestsSlice.actions;
export default userRequestsSlice.reducer;
