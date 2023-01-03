import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  isLoggedIn: false,
};

export const loginUser = createAsyncThunk(
  "/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      let data = await response.json();
      //email = data;
      // console.log("response", data);

      if (response.status === 200)
        return { ...data, email: email }; //console.log(data.token);
      else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      //console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    clearState: (state) => {
      state.email = "";
      state.errorMessage = "";
      state.isError = false;
      state.isFetching = false;
      state.isSuccess = false;
      state.isLoggedIn = false;
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, { payload }) => {
      state.email = payload.email;
      //console.log(state.email);
      state.isFetching = false;
      state.isSuccess = true;
      state.isLoggedIn = true;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
  },
});
export const { clearState } = sessionSlice.actions;
export default sessionSlice.reducer;
