import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "autoprefixer";
import axios from "../../api/axios";

const initialState = {
  activateSocialworkerUrl: `https://alzcors.herokuapp.com/https://alz-project.herokuapp.com/social-worker/activate/`,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
};

export const activateSocialworker = createAsyncThunk(
  "/activate/socialworker",
  async (url, thunkAPI) => {
    try {
      const response = await fetch(url, {
        method: "PUT",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
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

const activateSocialworkerSlice = createSlice({
  name: "activateSocialworker",
  initialState,
  reducers: {},
  extraReducers: {
    [activateSocialworker.fulfilled]: (state, { payload }) => {
      //{state.users} = payload.data;
      //console.log(state.email);
      state.isFetching = false;
      state.isSuccess = true;
      //state.isLoggedIn = true;
      return state;
    },
    [activateSocialworker.rejected]: (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isError = true;
      //state.errorMsg = payload.message;
    },
    [activateSocialworker.pending]: (state) => {
      state.isFetching = true;
    },
  },
});
export default activateSocialworkerSlice.reducer;
