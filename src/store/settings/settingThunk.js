import { createAsyncThunk } from "@reduxjs/toolkit";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, setDoc, collection, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
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
        }
        catch (error) {
            //return rejectWithValue(error);
            console.log(error);
            toast.error("Something wrong on User details. Please try again");
            return rejectWithValue(error.message || "Error processing form data");
        }
    });

export const updateSettings = createAsyncThunk(
    "settings/update",
    async ({ formData, preIdCard, preProfileImg, userId }, { rejectWithValue }) => {
        try {
            if (formData.firstName) {
                await updateDoc(doc(db, "users", userId), {
                    firstName : formData.firstName,
                })
            }

            if (formData.lastName) {
                await updateDoc(doc(db, "users", userId), {
                    lastName : formData.lastName,
                })
            }

            if (formData.paypalEmail) {
                await updateDoc(doc(db, "users", userId), {
                    paypalEmail : formData.paypalEmail,
                })
            }

            if (formData.identification) {
                const imageRef = ref(storage, `identifierImages/${Date.now()}-${formData.identification.name}`);
                const uploadResult = await uploadBytes(imageRef, formData.identification);

                const fileRef = ref(storage, uploadResult.ref.fullPath);
                const photoURL = await getDownloadURL(fileRef);

                console.log(preIdCard);

                if (preIdCard) {
                    const previousImgRef = ref(storage, preIdCard);
                    console.log(previousImgRef);
                    await deleteObject(previousImgRef);
                }
                await updateDoc(doc(db, "users", userId), {
                    identifierImageUrl: photoURL,
                })

                console.log('Id Card updated.');
            }

            if (formData.profileImage) {
                const imageRef = ref(storage, `profileImages/${Date.now()}-${formData.profileImage.name}`);
                const uploadResult = await uploadBytes(imageRef, formData.profileImage);

                const fileRef = ref(ref(storage), uploadResult.ref.fullPath);
                const photoURL = await getDownloadURL(fileRef);

                if (preProfileImg) {
                    const previousImgRef = ref(storage, preProfileImg);
                    await deleteObject(previousImgRef);
                }
                await updateDoc(doc(db, "users", userId), {
                    profileImageUrl: photoURL,
                })

                console.log('Profile Image updated.');
            }

            return;
        }
        catch (error) {
            console.log(error);
            toast.error("Something wrong on User details. Please try again");
            return rejectWithValue(error.message || "Error processing form data");
        }
    });