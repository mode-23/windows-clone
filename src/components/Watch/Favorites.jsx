import React, { useContext, useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import FavTemplate from "./FavTemplate";
import { userContext } from "../../Context/UserContext";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/Firebase";

const Favorites = () => {
  const { user } = useContext(userContext);
  const { setPreview, setCreatePlaylist } = useOutletContext();
  const [favoriteTracks, setFavoriteTracks] = useState([]);
  const [favoriteGenres, setFavoriteGenres] = useState([]);
  const [favoritePlaylists, setFavoritePlaylists] = useState([]);
  useEffect(() => {
    if (user?.uid) {
      const unsub = onSnapshot(doc(db, "deezer", user?.uid), (doc) => {
        setFavoriteTracks(doc?.data()?.favoriteTracks);
        console.log(doc?.data()?.favoriteTracks);
      });
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
          setFavoriteGenres(list);
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
    if (user?.uid) {
      const refrence = collection(db, "deezerPlaylist");
      const q = query(refrence, where("userId", "==", user?.uid));
      const unsub = onSnapshot(
        q,
        (snapShot) => {
          let list = [];
          snapShot.docs.forEach((doc) => {
            list.push({ ...doc.data() });
            setFavoritePlaylists(list);
            console.log(list);
          });
          if (!list.length) {
            setFavoriteAlbums([]);
          }
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
  return (
    <div className="favorites">
      <FavTemplate
        data1={favoriteTracks}
        data4={favoritePlaylists}
        data5={favoriteGenres}
      />
      <Outlet
        context={{
          favoriteTracks,
          favoritePlaylists,
          favoriteGenres,
          setPreview,
          setCreatePlaylist,
        }}
      />
    </div>
  );
};

export default Favorites;
