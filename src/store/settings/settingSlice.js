import { createSlice } from "@reduxjs/toolkit";
import { getSettings, updateSettings } from "./settingThunk";
import { toast } from "react-toastify";

const initialState = {
  userData: null,
  loading: false,
  updateLoading: false,
  error: null,
};

const settingSlice = createSlice({
  name: "settings",
  initialState,

  reducers: {
    onSuccess: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(getSettings.pending, (state) => {
        console.log("Running");
        state.loading = true;
        state.error = null;
      })
      .addCase(getSettings.rejected, (state, action) => {
        console.log("Error");
        state.loading = false;
        state.error = action.error.message;
      })
      
      
      .addCase(updateSettings.pending, (state) => {
        console.log("Running");
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateSettings.fulfilled, (state ) => {
        console.log("Completed");
        toast.success("Setting Updated.");
        state.updateLoading = false;
      })
      .addCase(updateSettings.rejected, (state, action) => {
        console.log("Error");
        state.updateLoading = false;
        state.error = action.error.message;
      })
  },
});
export const { onSuccess } = settingSlice.actions;
export default settingSlice.reducer;
