import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  deleteDoc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { fetchCategories, fetchCategoriesLoader } from "./categoriesSlice";

export const addCategory = createAsyncThunk(
  "user/addCategory",
  async ({ formData, onSuccess, uid }, { rejectWithValue }) => {
    try {
      const { Categoryimage } = formData;

      const amenity = Categoryimage;
      const storageRef = ref(storage, `Categoryimage/${amenity.name}`);
      await uploadBytes(storageRef, amenity);
      const downloadURL = await getDownloadURL(storageRef);

      const propertiesCollectionRef = collection(db, "categories");
      const documentRef = doc(propertiesCollectionRef);

      await setDoc(documentRef, {
        title: formData?.title,
        Categoryimage: downloadURL,
        createdAt: serverTimestamp(),
        createdBy: uid,
        products: 0,
      });

      onSuccess();
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message || "Error processing form data");
    }
  }
);

export const getCategory = createAsyncThunk(
  "user/getCategory",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(fetchCategoriesLoader(true));

      const propertiesCollection = collection(db, "categories");
      const propertiesQuery = query(propertiesCollection);

      onSnapshot(propertiesQuery, (querySnapshot) => {
        const allProperties = [];
        querySnapshot.forEach((doc) => {
          allProperties.push({ id: doc.id, ...doc.data() });
        });
        thunkAPI.dispatch(fetchCategories(allProperties));
      });
    } catch (error) {
      console.error(error);
      thunkAPI.dispatch(fetchCategoriesLoader(false));

      throw error;
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "user/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const propertyRef = doc(db, "categories", id);
      await deleteDoc(propertyRef);
      return id;
    } catch (error) {
      console.error("Error deleting property:", error);
      return rejectWithValue(error.message);
    }
  }
);
