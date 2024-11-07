import React, { useEffect, useState, useContext } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/Firebase.js";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { userContext } from "../../Context/UserContext";
const MainSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const addNewSearch = async () => {
    if (user?.uid) {
      const res = await setDoc(
        doc(db, "songSearched", searchValue + user?.uid),
        {
          searchValue,
          publishedAt: serverTimestamp(),
          userId: user?.uid,
        }
      );
      console.log(res);
    }
  };
  useEffect(() => {
    const search = async (e) => {
      if (e.key === "Enter" && searchValue) {
        addNewSearch();
        navigate(`/watch/query/${searchValue}`);
        setSearchValue("");
      }
    };
    document.addEventListener("keyup", search);
    return () => {
      document.removeEventListener("keyup", search);
    };
  }, [searchValue]);

  return (
    <div className="main_search">
      <div className="main_search_input">
        <RiSearchLine />
        <input
          type="text"
          placeholder="Start your journey"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
      </div>
    </div>
  );
};

export default MainSearch;
