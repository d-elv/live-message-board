import { deleteDoc, query, collection, getDocs, where } from "firebase/firestore"
import { db } from "../config/firebase-config.js"

export const useDeletePresence = async (userID) => {
    const userPresenceCollectionRef = collection(db, "userPresence");
    try {
        const queryPresentUsers = query(
            userPresenceCollectionRef,
            where("userID", "==", userID)
        );
        
        const querySnapshot = await getDocs(queryPresentUsers);
        
        querySnapshot.forEach(async (document) => {
            await deleteDoc(document.ref);
        })
    } catch (error) {
        console.error(error);
    }
};
