import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addProperty,
  getProperties,
  getsingleProperty,
  updateProperty,
} from "./propertiesThunk";

const initialState = {
  property: [],
  loading: false,
  error: null,
  singleProperty: null,
};

const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    fetchProperties: (state, action) => {
      state.property = action.payload;
      state.loading = false;
    },
    fetchPropertiesLoader: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(addProperty.pending, (state) => {
        console.log("Running");
        state.loading = true;
        state.error = null;
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        console.log("Completed");
        state.loading = false;
        toast.success("Product create successfully");
      })
      .addCase(addProperty.rejected, (state, action) => {
        console.log("Error");
        state.loading = false;
        state.error = action.error.message;
      })

      // // get singleproperty  cases
      .addCase(getsingleProperty.pending, (state) => {
        console.log("Running");
        state.loading = true;
        state.error = null;
      })
      .addCase(getsingleProperty.fulfilled, (state, action) => {
        console.log("Completed");
        state.loading = false;
        state.singleProperty = action.payload;
        console.log(action.payload);
      })
      .addCase(getsingleProperty.rejected, (state, action) => {
        console.log("Error");
        state.loading = false;
        state.error = action.error.message;
      })

      // // get updateProperty cases
      .addCase(updateProperty.pending, (state) => {
        console.log("Running");
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        console.log("Completed");
        state.loading = false;
        toast.success("Update Property successfully");
      })
      .addCase(updateProperty.rejected, (state, action) => {
        console.log("Error");
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { fetchProperties, fetchPropertiesLoader } =
  propertiesSlice.actions;
export default propertiesSlice.reducer;
