import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPatients } from "./userRequestsSlice";

const initialState = {
  requestsCount: 0,
  Fetching: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
  cords: [],
  changingData: false,
  googleUrl: `https://alzcors.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?address=`,
  apiKey: `&key=AIzaSyAJxqZpTKQblkTwa5Lhznl5qtQ-nYQqRLc`,
};
export const getCords = createAsyncThunk(
  "/maprequest",
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
        //console.log(data);
        return { ...data }; //console.log(data.token);
      else {
        // alert("got here");
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      //console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const mapRequestsSlice = createSlice({
  name: "mapRequests",
  initialState,
  reducers: {
    removeDublicates: (state, action) => {
      const newCords = state.cords.filter(
        (value, index, self) =>
          index ===
          self.findIndex((t) => t.lat === value.lat && t.lng === value.lng)
      );
      // state.cords = newCords;
      state.requestsCount = newCords.length;
    },
    clearCords: (state, action) => {
      state.cords = [];
    },
    setMarkerData: (state, action) => {
      for (let i = 0; i < action.payload.length; i++) {
        state.cords.forEach((c) => {
          if (c.add.includes(action.payload[i].addressId)) {
            c.id = action.payload[i].id;
            c.userType = action.payload[i].userType;
          }
        });
      }
      // state.changingData = true;
    },
  },
  extraReducers: {
    [getCords.fulfilled]: (state, { payload }) => {
      state.Fetching = false;
      state.isSuccess = true;
      let add = "";
      let cordy = {};
      //alert(payload.results.geometry);
      for (const [key, value] of Object.entries(payload.results[0])) {
        if (key === "formatted_address") {
          add = value;
        }
        if (key === "geometry") {
          cordy = value.location;
        }
      }

      state.cords.push({ cordy, add });
      return state;
    },
    [getCords.rejected]: (state, { payload }) => {
      console.log("payload", payload);
      state.Fetching = false;
      state.isError = true;
      //state.errorMsg = payload.message;
    },
    [getCords.pending]: (state) => {
      state.isSuccess = false;
      state.Fetching = true;
    },
  },
});
export const { removeDublicates, clearCords, setMarkerData } =
  mapRequestsSlice.actions;
export default mapRequestsSlice.reducer;
