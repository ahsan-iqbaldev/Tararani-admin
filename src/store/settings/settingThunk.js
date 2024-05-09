import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  doc,
  setDoc,
  collection,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { toast } from "react-toastify";
import { onSuccess } from "./settingSlice";

export const getSettings = createAsyncThunk(
  "settings/get",
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      const userDocRef = doc(collection(db, "users"), userId);

      onSnapshot(userDocRef, (snapshot) => {
        const data = { ...snapshot.data() };
        dispatch(onSuccess(data));
      });
      return;
    } catch (error) {
      //return rejectWithValue(error);
      console.log(error);
      toast.error("Something wrong on User details. Please try again");
      return rejectWithValue(error.message || "Error processing form data");
    }
  }
);

export const updateSettings = createAsyncThunk(
  "settings/update",
  async ({ formData, userId }, { rejectWithValue }) => {
    try {
      if (formData.firstName) {
        await updateDoc(doc(db, "users", userId), {
          firstName: formData.firstName,
        });
      }

      if (formData.lastName) {
        await updateDoc(doc(db, "users", userId), {
          lastName: formData.lastName,
        });
      }

      return;
    } catch (error) {
      console.log(error);
      toast.error("Something wrong on User details. Please try again");
      return rejectWithValue(error.message || "Error processing form data");
    }
  }
);
