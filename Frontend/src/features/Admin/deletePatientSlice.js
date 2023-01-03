import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "autoprefixer";
import axios from "../../api/axios";

const initialState = {
  urlPatient: `https://alzcors.herokuapp.com/https://alz-project.herokuapp.com/patient/`,
  urlCaregiver: `https://alzcors.herokuapp.com/https://alz-project.herokuapp.com/caregiver/`,
  urlSocialworkers: `https://alzcors.herokuapp.com/https://alz-project.herokuapp.com/social-worker/`,
  fetching: false,
  isSuccess: false,
  isError: false,
};

//const url1 = `https://alzcors.herokuapp.com/https://alz-project.herokuapp.com/patient/`;
export const deletePatient = createAsyncThunk(
  "/delete",
  async (url, thunkAPI) => {
    try {
      const response = await fetch(`${url}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let data = await response.status;

      //if (data === 200) alert("letshmm"); //alert("hi there");
      //return { ...data }; //console.log(data.token);
      //alert("success");
      // else {
      // return thunkAPI.rejectWithValue(data);
      // }
    } catch (e) {
      //console.log("Error", e.response.data);
      //alert(e);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const deletePatientSlice = createSlice({
  name: "deletePatient",
  initialState,
  reducers: {},
  extraReducers: {
    [deletePatient.fulfilled]: (state, { payload }) => {
      state.isSuccess = true;
      state.fetching = false;
      return state;
    },
    [deletePatient.rejected]: (state, { payload }) => {
      state.fetching = false;
      state.isError = true;
    },
    [deletePatient.pending]: (state) => {
      state.fetching = true;
    },
  },
});
export default deletePatientSlice.reducer;
