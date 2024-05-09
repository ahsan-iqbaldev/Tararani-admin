import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addCategory,getsingleCategory } from "./categoriesThunk";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    fetchCategories: (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    },
    fetchCategoriesLoader: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(addCategory.pending, (state) => {
        console.log("Running");
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        console.log("Completed");
        state.loading = false;
        toast.success("Category create successfully");
      })
      .addCase(addCategory.rejected, (state, action) => {
        console.log("Error");
        state.loading = false;
        state.error = action.error.message;
      })

  
  },
});
export const { fetchCategories, fetchCategoriesLoader } =
categoriesSlice.actions;
export default categoriesSlice.reducer;
