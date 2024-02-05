import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../config/firebase-config.js"
import { useGetUserInfo } from "./useGetUserInfo.js";

export const useAddBulletin = () => {
  const bulletinCollectionRef = collection(db, "bulletins");
  const { name, userID } = useGetUserInfo();
  const addBulletin = async ({
    bulletin
  }) => {
    // args are the collectionRef, and the object, which is the data we want to add to the database
    await addDoc(bulletinCollectionRef, {
      name,
      userID,
      bulletin,
      createdAt: serverTimestamp(),
    });
  };
  return { addBulletin };
};