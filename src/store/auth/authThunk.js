import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs,
  getFirestore,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { storage, db } from "../../config/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const signUpUser = createAsyncThunk(
  "user/signup",
  async (getData, { rejectWithValue, dispatch }) => {
    try {
        console.log(getData);
        const formData = getData?.data;
        const user = getData?.user;
        console.log(formData, user);
        const { phoneNumber } = formData;
        console.log(phoneNumber, "phonenumber");
  
        const querySnapshot = await getDocs(
          query(collection(db, "users"), where("phoneNumber", "==", phoneNumber))
        );
  
        if (!querySnapshot.empty) {
          toast.error(
            "Phone number already exists. Please use a different phone number."
          );
          return rejectWithValue("Phone number already exists");
        }

        console.log(formData.identification,formData.profileImage,"AHsan Imqgaes Lonks")
  
        const identifierImageRef = ref(
          storage,
          `identifierImages/${formData.identification.name}`
        );
        await uploadBytes(identifierImageRef, formData.identification);
  
        const profileImageRef = ref(
          storage,
          `profileImages/${formData.profileImage.name}`
        );
        await uploadBytes(profileImageRef, formData.profileImage);
  
        const identifierImageUrl = await getDownloadURL(identifierImageRef);
        const profileImageUrl = await getDownloadURL(profileImageRef);
  
        const uid = user.uid;
  
        const userData = {
          uid: uid,
          identifierImageUrl,
          profileImageUrl,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNumber: user.phoneNumber,
          paypalEmail: formData.paypalEmail,
          role: "host",
          isBlocked: false,
          createdAt: serverTimestamp(),
        };

        console.log(userData)
  
        await setDoc(doc(db, "users", uid), userData);
  
        return { userData };
    } catch (error) {
        console.log(error);
        toast.error("Something wrong on details. Please try again");
        return rejectWithValue(error.message || "Error processing form data");
    }
  }
);


export const signInUser = createAsyncThunk(
    "user/signin",
    async (user, { rejectWithValue, dispatch }) => {
      console.log(user, "AhsanIQbal");
      try {
        const firestore = getFirestore();
        const phoneNumber = user.phoneNumber;
  
        const querySnapshot = await getDocs(
          query(
            collection(db, "users"),
            where("phoneNumber", "==", phoneNumber),
            where("role", "==", "host")
          )
        );
  
        if (querySnapshot.empty) {
          toast.error("Phone number does not exist in the database.");
          return rejectWithValue("Phone number not  exists");
        }
  
        console.log(user.uid, "user");
        const userDocRef = doc(firestore, "users", user.uid);
  
        const userDataPromise = new Promise((resolve, reject) => {
          const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
              const userData = docSnapshot.data();
              resolve(userData);
            } else {
              reject(new Error("User document not found"));
            }
          });
        });
  
        const userData = await userDataPromise;
  
        return { userData };
      } catch (error) {
        console.error(error);
        return rejectWithValue(error.message || "Error signing in");
      }
    }
  );