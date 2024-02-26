import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../Context/UserContext";
import HistoryBox from "./HistoryBox";
import { db } from "../../firebase/Firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
const SavedTranslate = () => {
  const { user } = useContext(userContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (user?.uid) {
      const refrence = collection(db, "translateSaved");
      const q = query(
        refrence,
        where("user", "==", user?.uid),
        orderBy("publishedAt", "desc")
      );
      const unsub = onSnapshot(
        q,
        (snapShot) => {
          let list = [];
          snapShot.docs.forEach((doc) => {
            list.push({ ...doc.data() });
            setData(list);
          });
          if (!list.length) setData([]);
        },
        (error) => {
          console.log(error);
        }
      );
      return () => {
        unsub();
      };
    }
  }, []);
  return (
    <div className="historyTranslate">
      {data.map((item) => (
        <HistoryBox key={item?.id} item={item} />
      ))}
    </div>
  );
};

export default SavedTranslate;
