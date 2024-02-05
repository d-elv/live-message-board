import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const useDeleteBulletins = async (bulletins) => {
  await Promise.all(
    bulletins.map(async (docId) => {
      const itemRef = doc(db, "bulletins", docId.id);
      await deleteDoc(itemRef);
    })
  );
};