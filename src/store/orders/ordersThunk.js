import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  doc,
  collection,
  getDocs,
  getDoc,
  query,
  updateDoc,
  orderBy,
} from "firebase/firestore";

import { db } from "../../config/firebase";
import { fetchOrders, fetchOrdersLoader } from "./ordersSlice";

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

export const rejectOrder = createAsyncThunk(
  "user/rejectOrder",
  async ({ Id, onSuccess }, { rejectWithValue, dispatch }) => {
    console.log(Id, "id");
    try {
      const propertiesCollectionRef = collection(db, "orders");
      const documentRef = doc(propertiesCollectionRef, Id);
      await updateDoc(documentRef, {
        status: "rejected",
      });
      onSuccess();
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);
