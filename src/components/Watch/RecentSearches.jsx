import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase/Firebase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { userContext } from "../../Context/UserContext";
const RecentSearches = () => {
  const { user } = useContext(userContext);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      const refrence = collection(db, "songSearched");
      const q = query(
        refrence,
        where("userId", "==", user?.uid),
        orderBy("publishedAt", "desc")
      );
      const unsub = onSnapshot(
        q,
        (snapShot) => {
          let list = [];
          snapShot.docs.forEach((doc) => {
            list.push({ ...doc.data() });
            setSearchData(list);
          });
          if (!list.length) setSearchData([]);
        },
        (error) => {
          console.log(error);
        }
      );
      return () => {
        unsub();
      };
    }
  }, [user]);
  console.log(searchData);

  return <div>RecentSearches</div>;
};

export default RecentSearches;
