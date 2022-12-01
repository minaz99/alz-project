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
};
const url = `https://cors-anywhere.herokuapp.com/https://alz-project.herokuapp.com/patient`;
const url2 = `https://dummyjson.com/users`;
export const getPatients = createAsyncThunk("/", async (thunkAPI) => {
  try {
    const response = await fetch(url, {
      method: "GET",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    // alert(data.users);
    //for (const [key, value] of Object.entries(data.users)) {
    //alert(data.users[key].firstName);
    //const { id, firstName, lastName, email } = payload[key];
    //state.users.push({ id, firstName, lastName, email });
    // thunkAPI.totalUsers++;
    //}
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
  reducers: {},
  extraReducers: {
    [getPatients.fulfilled]: (state, { payload }) => {
      state.users = payload.users;
      state.totalUsers = state.users.length;
      //for (const [key, value] of Object.entries(payload)) {
      //alert(`${key}: ${value}`);
      //const { id, firstName, lastName, email } = payload[key];
      //state.users.push({ id, firstName, lastName, email });
      // thunkAPI.totalUsers++;
      //}*/

      //console.log(state.email);
      state.isFetching = false;
      state.isSuccess = true;
      state.isLoggedIn = true;
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
export default userRequestsSlice.reducer;
