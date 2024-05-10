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
  increment
} from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { toast } from "react-toastify";
import { fetchProperties, fetchPropertiesLoader } from "./propertiesSlice";

// export const addProperty = createAsyncThunk(
//   "user/addproperty",
//   async ({ formData, onSuccess, uid }, { rejectWithValue, dispatch }) => {
//     try {
//       const { productImages } = formData;

//       const imagesArr = await Promise.all(
//         productImages?.map(async (amenity) => {
//           const storageRef = ref(storage, `productImages/${amenity.name}`);
//           await uploadBytes(storageRef, amenity);
//           return await getDownloadURL(storageRef);
//         })
//       );

//       const propertiesCollectionRef = collection(db, "products");
//       const documentRef = doc(propertiesCollectionRef);

//       await setDoc(documentRef, {
//         category: formData?.category,
//         productImages: imagesArr,
//         title: formData?.title,
//         description: formData?.description,
//         price: formData?.price,
//         comparePrice: formData?.comparePrice,
//         createdAt: serverTimestamp(),
//         createdBy: uid,
//         status: "ACTIVE",
//         sales: 0,
//       });

//       onSuccess();
//     } catch (error) {
//       console.error(error);
//       return rejectWithValue(error.message || "Error processing form data");
//     }
//   }
// );

// export const addProperty = createAsyncThunk(
//   "user/addproperty",
//   async ({ formData, onSuccess, uid }, { rejectWithValue, dispatch }) => {
//     try {
//       const { productImages } = formData;

//       const imagesArr = await Promise.all(
//         productImages?.map(async (amenity) => {
//           const storageRef = ref(storage, `productImages/${amenity.name}`);
//           await uploadBytes(storageRef, amenity);
//           return getDownloadURL(storageRef);
//         })
//       );

//       const propertiesCollectionRef = collection(db, "products");
//       const documentRef = doc(propertiesCollectionRef);

//       await setDoc(documentRef, {
//         category: formData?.category,
//         productImages: imagesArr,
//         title: formData?.title,
//         description: formData?.description,
//         price: formData?.price,
//         comparePrice: formData?.comparePrice,
//         createdAt: serverTimestamp(),
//         createdBy: uid,
//         status: "ACTIVE",
//         sales: 0,
//       });

//       // Fetch data from categories collection
//       const categoriesCollectionRef = collection(db, "products");
//       const q = query(
//         categoriesCollectionRef,
//         where("category", "==", formData?.category)
//       );
//       const querySnapshot = await getDocs(q);

//       const categoryDocs = [];
//       querySnapshot.forEach((doc) => {
//         categoryDocs.push(doc.data());
//       });

//       console.log(categoryDocs, "categoryDocs");

//       if (categoryDocs.length > 0) {
//         const propertiesCollectionRef = collection(db, "categories");
//         const documentRef = doc(
//           propertiesCollectionRef,
//           where("title", "==", formData?.category)
//         );

//         await updateDoc(documentRef, {
//           products: categoryDocs?.length,
//         });
//       }

//       onSuccess();
//     } catch (error) {
//       console.error(error);
//       return rejectWithValue(error.message || "Error processing form data");
//     }
//   }
// );


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
        createdAt: serverTimestamp(),
        createdBy: uid,
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
  async (userUID, thunkAPI) => {
    try {
      thunkAPI.dispatch(fetchPropertiesLoader(true));

      const propertiesCollection = collection(db, "products");
      const propertiesQuery = query(
        propertiesCollection,
        where("createdBy", "==", userUID)
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
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const propertyRef = doc(db, "products", id);
      await deleteDoc(propertyRef);
      toast.success("Delete property sucessfully");
      return id;
    } catch (error) {
      console.error("Error deleting property:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const getsingleProperty = createAsyncThunk(
  "user/getsingleproperty",
  async (id, { rejectWithValue, dispatch }) => {
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

export const updateProperty = createAsyncThunk(
  "user/updateproperty",
  async (
    { formData, onSuccess, uid, docId },
    { rejectWithValue, dispatch }
  ) => {
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
        updatedAt: serverTimestamp(),
        createdBy: uid,
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
