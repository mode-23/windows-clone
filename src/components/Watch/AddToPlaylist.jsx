import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";

export const addToPlayList = async (data, item, playlistId) => {
  const checkExistance = data?.some((dataItem) =>
    dataItem?.playListArray?.some((list) => list?.id === item?.id)
  );
  const DocRef = doc(db, "deezerPlaylist", playlistId);
  if (checkExistance) {
    await updateDoc(DocRef, {
      playListArray: arrayRemove(item),
    });
  } else {
    await updateDoc(DocRef, {
      playListArray: arrayUnion(item),
    });
  }
};
