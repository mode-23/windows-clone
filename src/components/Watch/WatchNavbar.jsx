import React, { useContext, useEffect, useState } from "react";
import { PiSoundcloudLogoFill, PiBroadcastFill } from "react-icons/pi";
import { AiFillHome } from "react-icons/ai";
import { MdExplore } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import { userContext } from "../../Context/UserContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/Firebase";

const WatchNavbar = ({ setCreatePlaylist }) => {
  const { user } = useContext(userContext);
  const [data, setData] = useState([]);
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
            setData(list);
            console.log(list);
          });
          if (!list.length) {
            setData([]);
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
    <nav className="watch_nav">
      <div className="title_nav df">
        <PiSoundcloudLogoFill />
        <h3>soundnote</h3>
      </div>
      <div className="watch_nav_tranch">
        <ul className="drop_nav_1">
          <li>
            <NavLink to={"/watch"} className={"df"} end>
              <AiFillHome /> Home{" "}
            </NavLink>
          </li>
          <li>
            <NavLink to={"/watch/browse"} className={"df"} end>
              <MdExplore /> Browse{" "}
            </NavLink>
          </li>
          <li>
            <NavLink to={"/watch/radio"} className={"df"} end>
              <PiBroadcastFill /> Radio{" "}
            </NavLink>
          </li>
        </ul>
        <h4>your library</h4>
        <ul className="drop_nav_2">
          <li>
            <NavLink to={"/foryou"} className={"df"}>
              Made for you
            </NavLink>
          </li>
          <li>
            <NavLink to={"/foryou"} className={"df"}>
              Recently played
            </NavLink>
          </li>
          <li>
            <NavLink to={"/foryou"} className={"df"}>
              Liked songs
            </NavLink>
          </li>
          <li>
            <NavLink to={"/foryou"} className={"df"}>
              Albums
            </NavLink>
          </li>
          <li>
            <NavLink to={"/foryou"} className={"df"}>
              Artists
            </NavLink>
          </li>
        </ul>
        <h4>playlists</h4>
        <div className="drop_nav_3">
          <button
            className="create_playlist df"
            onClick={() => setCreatePlaylist(true)}
          >
            <div className="pl_Icon">
              <BsPlusLg />
            </div>
            <p>Create a playlist</p>
          </button>
          <div className="playlist_data">
            {data?.map((item) => (
              <NavLink
                to={`/watch/playlist/${item.id}`}
                className="create_playlist df"
                key={item.id}
              >
                <img src={item.playListImgLive} alt={item.playListName} />
                <div className="end create_playlist_info">
                  <h5>{item.playListName}</h5>
                  <p>mode</p>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default WatchNavbar;
