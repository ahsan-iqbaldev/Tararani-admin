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
  orderBy,
} from "firebase/firestore";

import { db, storage } from "../../config/firebase";
import { toast } from "react-toastify";
import { fetchOrders, fetchOrdersLoader } from "./ordersSlice";

// export const addCategory = createAsyncThunk(
//   "user/addCategory",
//   async ({ formData, onSuccess, uid }, { rejectWithValue, dispatch }) => {
//     try {
//       const { Categoryimage } = formData;

//       const amenity = Categoryimage;
//       const storageRef = ref(storage, `Categoryimage/${amenity.name}`);
//       await uploadBytes(storageRef, amenity);
//       const downloadURL = await getDownloadURL(storageRef);

//       const propertiesCollectionRef = collection(db, "categories");
//       const documentRef = doc(propertiesCollectionRef);

//       await setDoc(documentRef, {
//         title: formData?.title,
//         Categoryimage: downloadURL,
//         createdAt: serverTimestamp(),
//         createdBy: uid,
//         products: 0,
//       });

//       onSuccess();
//     } catch (error) {
//       console.error(error);
//       return rejectWithValue(error.message || "Error processing form data");
//     }
//   }
// );

export const getOrders = createAsyncThunk(
  "user/getOrders",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(fetchOrdersLoader(true));

      const ordersCollection = collection(db, "orders");
      const ordersQuery = query(ordersCollection, orderBy("createdAt", "desc"));

      const orders = [];

      const querySnapshot = await getDocs(ordersQuery);
      const fetchProductsPromises = querySnapshot.docs.map(async (orderDoc) => {
        const orderData = orderDoc.data();
        const productId = orderData.productId;
        const productDocRef = doc(db, "products", productId);
        const productDocSnap = await getDoc(productDocRef);

        if (productDocSnap.exists()) {
          const productData = productDocSnap.data();
          orders.push({ id: orderDoc.id, ...orderData, productData });
        } else {
          console.warn(`Product with ID ${productId} does not exist`);
        }
      });

      await Promise.all(fetchProductsPromises);

      // Dispatch orders data
      thunkAPI.dispatch(fetchOrders(orders));
      thunkAPI.dispatch(fetchOrdersLoader(false));
    } catch (error) {
      console.error(error);
      thunkAPI.dispatch(fetchOrdersLoader(false));
      throw error;
    }
  }
);

export const getsingleOrder = createAsyncThunk(
  "user/getsingleOrder",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const propertyRef = doc(db, "orders", id);
      const propertyDoc = await getDoc(propertyRef);

      if (!propertyDoc.exists()) {
        throw new Error("Order not found");
      }

      const orderData = propertyDoc.data();
      const productId = orderData.productId;

      const productRef = doc(db, "products", productId);
      const productDoc = await getDoc(productRef);

      if (!productDoc.exists()) {
        console.warn(`Product with ID ${productId} does not exist`);
      } else {
        const productData = productDoc.data();
        const updatedOrderData = { ...orderData, productData };
        return updatedOrderData;
      }
    } catch (error) {
      console.error("Error fetching single order:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrderAction = createAsyncThunk(
  "user/updateOrder",
  async ({ id, data, onSuccess }, { rejectWithValue, dispatch }) => {
    try {
      const propertiesCollectionRef = collection(db, "orders");
      const documentRef = doc(propertiesCollectionRef, id);

      await updateDoc(documentRef, {
        status: data,
      });

      onSuccess();
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message || "Error processing form data");
    }
  }
);

export const addOrders = createAsyncThunk(
  "user/deleteCategory",
  async (id, { rejectWithValue, dispatch }) => {
    // try {
    //   const propertyRef = doc(db, "categories", id);
    //   await deleteDoc(propertyRef);
    //   toast.success("Delete property sucessfully");
    //   return id;
    // } catch (error) {
    //   console.error("Error deleting property:", error);
    //   return rejectWithValue(error.message);
    // }
  }
);

// export const deleteCategory = createAsyncThunk(
//   "user/deleteCategory",
//   async (id, { rejectWithValue, dispatch }) => {
//     try {
//       const propertyRef = doc(db, "categories", id);
//       await deleteDoc(propertyRef);
//       toast.success("Delete property sucessfully");
//       return id;
//     } catch (error) {
//       console.error("Error deleting property:", error);
//       return rejectWithValue(error.message);
//     }
//   }
// );
