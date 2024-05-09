import { createSlice } from "@reduxjs/toolkit";
import { signUpUser, signInUser  } from "./authThunk";
import { toast } from "react-toastify";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder

      .addCase(signUpUser.pending, (state) => {
        console.log("Running");
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        console.log("Completed");
        state.loading = false;
        toast.success("Register Sucessfully.");
        state.user = action.payload.userData;
        console.log(action.payload);
      })
      .addCase(signUpUser.rejected, (state, action) => {
        console.log("Error");
        state.loading = false;
        state.error = action.error.message;
      })

      // Sign in cases
      .addCase(signInUser.pending, (state) => {
        console.log("Running");
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        console.log("Completed");
        toast.success("Login Sucessfully.");
        state.loading = false;
        state.user = action.payload.userData;
        console.log(action.payload);
      })
      .addCase(signInUser.rejected, (state, action) => {
        console.log("Error");
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
