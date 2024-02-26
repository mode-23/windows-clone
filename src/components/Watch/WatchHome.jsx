import React, { useContext, useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/Firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { userContext } from "../../Context/UserContext";

const WatchHome = () => {
  const [searchValue, setSearchValue] = useState("");
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const addNewSearch = async () => {
    if (user?.uid) {
      const res = await setDoc(doc(db, "songSearched", searchValue), {
        searchValue,
        publishedAt: serverTimestamp(),
        userId: user?.uid,
      });
      console.log(res);
    }
  };
  useEffect(() => {
    const search = async (e) => {
      if (e.key === "Enter" && searchValue) {
        addNewSearch();
        navigate(`/watch/query/${searchValue}`);
        setSearchValue("")
      }
    };
    document.addEventListener("keyup", search);
    return () => {
      document.removeEventListener("keyup", search);
    };
  }, [searchValue]);
  
  return (
    <div className="watch_home">
      <header className="watch_home_header">
        <div className="search_watch_home">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <RiSearchLine />
        </div>
      </header>
      <main className="watch_home_body">
        <h1>Home</h1>
        <h2>Made for you</h2>
        <div className="watch_home_foru">
          <div className="watch_home_foru_box watch_home_foru_box1">
            <AiFillPlayCircle className="icon_play" />
          </div>
          <div className="watch_home_foru_box watch_home_foru_box1">
            <AiFillPlayCircle className="icon_play" />
          </div>
          <div className="watch_home_foru_box watch_home_foru_box1">
            <AiFillPlayCircle className="icon_play" />
          </div>
          <div className="watch_home_foru_box watch_home_foru_box2">
            <div className="watch_home_foru_box2_inner">
              <AiFillPlayCircle className="icon_play" />
            </div>
            <div className="watch_home_foru_box2_inner">
              <AiFillPlayCircle className="icon_play" />
            </div>
          </div>
        </div>
        <h2>Recently played</h2>
        <div className="watch_home_slider">
          <div className="watch_home_foru_box watch_home_foru_box1 watch_home_foru_box3">
            <AiFillPlayCircle className="icon_play" />
          </div>
          <div className="watch_home_foru_box watch_home_foru_box1 watch_home_foru_box3">
            <AiFillPlayCircle className="icon_play" />
          </div>
          <div className="watch_home_foru_box watch_home_foru_box1 watch_home_foru_box3">
            <AiFillPlayCircle className="icon_play" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default WatchHome;
