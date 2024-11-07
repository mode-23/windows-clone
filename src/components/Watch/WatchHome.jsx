import React, { useContext, useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
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
import RecentHomeSearch from "./RecentHomeSearch";
import GenreBox from "./GenreBox";
import { IoIosShareAlt } from "react-icons/io";

const WatchHome = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [favoriteArtist, setFavArtist] = useState([]);
  const [genres, setGenres] = useState([]);
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
        setSearchValue("");
      }
    };
    document.addEventListener("keyup", search);
    return () => {
      document.removeEventListener("keyup", search);
    };
  }, [searchValue]);
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
  useEffect(() => {
    const refrence = collection(db, "favGenres");
    const q = query(refrence, where("userId", "==", user?.uid));
    const unsub = onSnapshot(
      q,
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          if (doc.data().uid != user?.uid) {
            list.push({ ...doc.data() });
          }
          setGenres(list);
        });
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, [user]);
  useEffect(() => {
    const refrence = collection(db, "favArtist");
    const q = query(refrence, where("userId", "==", user?.uid));
    const unsub = onSnapshot(
      q,
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          if (doc.data().uid != user?.uid) {
            list.push({ ...doc.data() });
          }
          setFavArtist(list);
        });
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, [user]);
  console.log(favoriteArtist);

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
        <h2>Your Artists</h2>
        <div className="watch_home_foru">
          {favoriteArtist?.slice(0, 3)?.map((item) => (
            <div
              className="watch_home_foru_box watch_home_foru_box1"
              key={item.id}
              onClick={() => navigate(`/watch/artist/${item?.data?.id}`)}
              style={{
                backgroundImage: `url(${item?.data?.picture_xl})`,
              }}
            >
              <AiFillPlayCircle className="icon_play" />
            </div>
          ))}
          <div className="watch_home_foru_box watch_home_foru_box2">
            {favoriteArtist?.slice(3, 5)?.map((item) => (
              <div
                className="watch_home_foru_box2_inner"
                key={item.id}
                onClick={() => navigate(`/watch/artist/${item?.data?.id}`)}
                style={{
                  backgroundImage: `url(${item?.data?.picture_xl})`,
                }}
              >
                <AiFillPlayCircle className="icon_play" />
              </div>
            ))}
          </div>
        </div>
        <h2>Recently Searched</h2>
        <div className="watch_home_slider">
          {searchData?.slice(0, 7)?.map((item, index) => (
            <RecentHomeSearch item={item} key={index} />
          ))}
          <div
            className="watch_home_foru_box  watch_home_foru_box_add"
            onClick={() => navigate("/watch/recent_searches")}
          >
            <IoIosShareAlt />
            <h3>Show more</h3>
          </div>
        </div>
        <h2>Your top genres</h2>
        <div className="watch_home_genres">
          {genres?.slice(0, 3)?.map((item) => (
            <GenreBox item={item} key={item.data.id} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default WatchHome;
