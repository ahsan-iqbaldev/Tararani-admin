import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  doc,
  setDoc,
  collection,
  getDocs,
  serverTimestamp,
  deleteDoc,
  getDoc,
  query,
  onSnapshot,
  where,
  updateDoc,
  increment,
  orderBy,
} from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { toast } from "react-toastify";
import { fetchProperties, fetchPropertiesLoader } from "./propertiesSlice";

export const addProperty = createAsyncThunk(
  "user/addproperty",
  async ({ formData, onSuccess, uid }, { rejectWithValue, dispatch }) => {
    try {
      const { productImages } = formData;

      const imagesArr = await Promise.all(
        productImages?.map(async (amenity) => {
          const storageRef = ref(storage, `productImages/${amenity.name}`);
          await uploadBytes(storageRef, amenity);
          return getDownloadURL(storageRef);
        })
      );

      const propertiesCollectionRef = collection(db, "products");
      const documentRef = doc(propertiesCollectionRef);

      await setDoc(documentRef, {
        category: formData?.category,
        productImages: imagesArr,
        title: formData?.title,
        description: formData?.description,
        price: formData?.price,
        comparePrice: formData?.comparePrice,
        color: formData?.color,
        size: formData?.size,
        createdAt: serverTimestamp(),
        createdBy: uid,
        topSelling: false,
        status: "ACTIVE",
        sales: 0,
      });

      onSuccess();

      // Fetch data from categories collection
      const categoriesCollectionRef = collection(db, "categories");
      const q = query(
        categoriesCollectionRef,
        where("title", "==", formData?.category)
      );
      const querySnapshot = await getDocs(q);

      // Update the category document if it exists
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, {
          products: increment(querySnapshot.size),
        });
      }

      onSuccess();
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message || "Error processing form data");
    }
  }
);

export const getProperties = createAsyncThunk(
  "user/getproperties",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(fetchPropertiesLoader(true));

      const propertiesCollection = collection(db, "products");
      const propertiesQuery = query(
        propertiesCollection,
        orderBy("createdAt", "desc")
      );

      onSnapshot(propertiesQuery, (querySnapshot) => {
        const allProperties = [];
        querySnapshot.forEach((doc) => {
          allProperties.push({ id: doc.id, ...doc.data() });
        });
        thunkAPI.dispatch(fetchProperties(allProperties));
      });
    } catch (error) {
      console.error(error);
      thunkAPI.dispatch(fetchPropertiesLoader(false));

      throw error;
    }
  }
);

export const deleteProperty = createAsyncThunk(
  "user/deleteProperty",
  async (id, { rejectWithValue }) => {
    try {
      const propertyRef = doc(db, "products", id);
      await deleteDoc(propertyRef);
      return id;
    } catch (error) {
      console.error("Error deleting property:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const getsingleProperty = createAsyncThunk(
  "user/getsingleproperty",
  async (id, { rejectWithValue }) => {
    try {
      const propertyRef = doc(db, "products", id);

      const propertyDoc = await getDoc(propertyRef);

      if (!propertyDoc.exists()) {
        throw new Error("Property not found");
      }

      const propertyData = propertyDoc.data();

      return propertyData;
    } catch (error) {
      console.error("Error fetching single property:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateTopSellingAction = createAsyncThunk(
  "user/updatestatus",
  async ({ id, data, onSuccess }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      console.log(state, "state");
      const products = state?.properties?.property;
      console.log(products, "products");

      const topSellingCount = products.filter(
        (product) => product.topSelling
      ).length;

      if (data && topSellingCount >= 4) {
        toast.error("You can only mark up to 4 items as top selling.");
        return rejectWithValue("Exceeded top selling limit");
      }

      const propertiesCollectionRef = collection(db, "products");
      const documentRef = doc(propertiesCollectionRef, id);

      await updateDoc(documentRef, {
        topSelling: data,
      });

      onSuccess();
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message || "Error processing form data");
    }
  }
);

export const updateProperty = createAsyncThunk(
  "user/updateproperty",
  async ({ formData, onSuccess, uid, docId }, { rejectWithValue }) => {
    console.log({ formData, onSuccess, uid, docId });
    try {
      const { productImages } = formData;

      const imagesArr = await Promise.all(
        productImages?.map(async (image) => {
          if (image instanceof File) {
            const storageRef = ref(storage, `productImages/${image.name}`);
            await uploadBytes(storageRef, image);
            return await getDownloadURL(storageRef);
          } else {
            return image;
          }
        })
      );

      const propertiesCollectionRef = collection(db, "products");
      const documentRef = doc(propertiesCollectionRef, docId);

      await updateDoc(documentRef, {
        category: formData?.category,
        productImages: imagesArr,
        title: formData?.title,
        description: formData?.description,
        price: formData?.price,
        comparePrice: formData?.comparePrice,
        color: formData?.color,
        size: formData?.size,
        updatedAt: serverTimestamp(),
        createdBy: uid,
        topSelling: formData?.topSelling,
        status: formData?.status,
        sales: formData?.sales,
      });

      onSuccess();
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message || "Error processing form data");
    }
  }
);
