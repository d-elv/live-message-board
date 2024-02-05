import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../config/firebase-config.js"
import { useGetUserInfo } from "./useGetUserInfo.js";

// code for updating a document's field's value.
// const res = await cityRef.updateDoc({capital: true});

export const useAddPresence = () => {
  const presenceCollectionRef = collection(db, "userPresence");
  // const { userID } = useGetUserInfo();
  const addPresence = async ({
    userID,
    displayName,
    photoURL,
    isOnline
  }) => {
    // args are the collectionRef, and the object, which is the data we want to add to the database
    await addDoc(presenceCollectionRef, {
      userID,
      displayName,
      photoURL,
      isOnline,
      loginTime: serverTimestamp(),
    });
  };
  return { addPresence };
};