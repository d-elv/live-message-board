import { useState, useEffect } from "react"
import { query, collection, onSnapshot, orderBy } from "firebase/firestore"
import { db } from "../config/firebase-config.js"

export const useGetBulletins = () => {
  const [bulletins, setBulletins] = useState([])
  const bulletinCollectionRef = collection(db, "bulletins");

  const getbulletins = async () => {
    let unsubscribe;
    try {
      const querybulletins = query(
        bulletinCollectionRef,
        // returning all bulletin documents from the firebase database. This is public.
        orderBy("createdAt")
      );

      // unsubscribe for clean up
      unsubscribe = onSnapshot(querybulletins, (snapshot) => {
        let documents = [];


        snapshot.forEach((document) => {
          const data = document.data();
          const id = document.id;

          documents.push({ ...data, id });

        setBulletins(documents);
        })
      }) 
    } catch (error) {
      console.error(error)
    }
    return () => unsubscribe();
  }

  useEffect(() => {
    getbulletins();
  }, [])
  return {bulletins};
}