import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/Firebase";

export const addTrackToFavorite = async (data, trackId, userId) => {
  const res = await getDoc(doc(db, "deezer", userId));
  if (userId) {
    if (!res.exists()) {
      if (!data?.includes(trackId)) {
        const DocRef = doc(db, "deezer", userId);
        await setDoc(DocRef, {
          favoriteTracks: arrayUnion(trackId),
        });
      } else {
        const DocRef = doc(db, "deezer", userId);
        await setDoc(DocRef, {
          favoriteTracks: arrayRemove(trackId),
        });
      }
    } else {
      if (!data?.includes(trackId)) {
        const DocRef = doc(db, "deezer", userId);
        await updateDoc(DocRef, {
          favoriteTracks: arrayUnion(trackId),
        });
      } else {
        const DocRef = doc(db, "deezer", userId);
        await updateDoc(DocRef, {
          favoriteTracks: arrayRemove(trackId),
        });
      }
    }
  }
};
