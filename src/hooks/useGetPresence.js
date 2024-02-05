import { useState, useEffect } from "react"
import { query, collection, onSnapshot } from "firebase/firestore"
import { db } from "../config/firebase-config.js"

export const useGetPresence = () => {
  const [presentUsers, setPresentUsers] = useState([]);
  const userPresenceCollectionRef = collection(db, "userPresence");

  const getPresence = async () => {
    let unsubscribe;
    try {
      const queryPresentUsers = query(userPresenceCollectionRef);
      unsubscribe = onSnapshot(queryPresentUsers, (snapshot) => {
        let documents = [];
        
        snapshot.forEach((document) => {
          const data = document.data();
          const id = document.id;
          
          documents.push({ ...data, id });
          
          setPresentUsers(documents);
        })
      })
    } catch (error) {
      console.error(error);
    }
    return () => unsubscribe();
  }
  useEffect(() => {
    getPresence();
  }, [])
  return {presentUsers}
}


// export const useGetBulletins = () => {
//   const [bulletins, setBulletins] = useState([])
//   const bulletinCollectionRef = collection(db, "bulletins");

//   const getbulletins = async () => {
//     let unsubscribe;
//     try {
//       const querybulletins = query(
//         bulletinCollectionRef,
//         // returning all bulletin documents from the firebase database. This is public.
//         orderBy("createdAt")
//       );

//       // unsubscribe for clean up
//       unsubscribe = onSnapshot(querybulletins, (snapshot) => {
//         let documents = [];


//         snapshot.forEach((document) => {
//           const data = document.data();
//           const id = document.id;

//           documents.push({ ...data, id });

//         setBulletins(documents);
//         })
//       }) 
//     } catch (error) {
//       console.error(error)
//     }
//     return () => unsubscribe();
//   }

//   useEffect(() => {
//     getbulletins();
//   }, [])
//   return {bulletins};
// }