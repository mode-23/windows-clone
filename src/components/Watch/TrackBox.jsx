import React, { useContext, useEffect, useRef, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useNavigate, useOutletContext } from "react-router-dom";
import { addToPlayList } from "./AddToPlaylist";
import { userContext } from "../../Context/UserContext";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { MdMusicOff } from "react-icons/md";
import { TfiSearch } from "react-icons/tfi";
import { AiOutlinePlus } from "react-icons/ai";
import { addTrackToFavorite } from "./AddToFavorite";

const TrackBox = ({ item, setPreview, openPopUp, setOpenPopUp, id }) => {
  const { user } = useContext(userContext);
  const [data, setData] = useState([]);
  const { setCreatePlaylist } = useOutletContext();
  console.log(item);

  useEffect(() => {
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
  }, []);
  const [deezerTrack, setdeezerTrack] = useState([]);
  useEffect(() => {
    if (user?.uid) {
      const unsub = onSnapshot(doc(db, "deezer", user?.uid), (doc) => {
        setdeezerTrack(doc?.data()?.favoriteTracks);
      });
      return () => {
        unsub();
      };
    }
  }, [user]);
  const navigate = useNavigate();
  const formatTime = (duartion) => {
    var sec_num = parseInt(duartion, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (hours > 0) {
      return hours + ":" + minutes + ":" + seconds;
    } else {
      return minutes + ":" + seconds;
    }
  };
  const checkExistance = data?.some((dataItem) =>
    dataItem?.playListArray?.some((list) => list?.id === item?.id)
  );
  const handlePopUp = () => {
    if (id) {
      addToPlayList(data, item, id);
    } else {
      setOpenPopUp(item?.id);
    }
  };
  let menuRef = useRef();
  let windBtnRef = useRef();

  useEffect(() => {
    let clickOutside = (e) => {
      if (windBtnRef.current.contains(e.target)) return;
      if (!menuRef.current.contains(e.target)) {
        setOpenPopUp("");
      }
    };
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  });
  return (
    <div className="tracklist_box track_grid">
      <div className="track_info df">
        <img src={item.album.cover_small} alt={item.album.title} />
        <p onClick={() => setPreview(item)}>{item.title}</p>
      </div>
      <div className="track_fav">
        {openPopUp === item.id && (
          <div className="popUpPlaylist" ref={menuRef}>
            <div className="popInput">
              <TfiSearch />
              <input type="text" />
            </div>
            <div className="popUpPlayBody">
              <div
                className="popUpPlayButton df"
                onClick={() => setCreatePlaylist(true)}
              >
                <AiOutlinePlus />
                <h4>new playlist</h4>
              </div>
              <div className="popUpplayData">
                {data?.map((list) => (
                  <div
                    key={list.id}
                    className="popUpplayDataBox"
                    onClick={() => addToPlayList(data, item, list.id)}
                  >
                    <img src={list.playListImgLive} alt={list.playListName} />
                    <div className="end">{list.playListName}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => addTrackToFavorite(deezerTrack, item?.id, user?.uid)}
        >
          {deezerTrack?.includes(item?.id) ? <GoHeartFill /> : <GoHeart />}
        </button>
        <button
          onClick={handlePopUp}
          ref={windBtnRef}
          className={openPopUp === item.id || id ? "active" : "non_act"}
        >
          {id ? (
            <>
              {checkExistance ? (
                <MdMusicOff className="removeTrack" />
              ) : (
                <BsPlusLg />
              )}
            </>
          ) : (
            <>{checkExistance ? <MdMusicOff /> : <BsPlusLg />}</>
          )}
        </button>
      </div>
      <div className="track_album" title={item.artist.name}>
        <p onClick={() => navigate(`/watch/artist/${item.artist.id}`)}>
          {item.artist.name}
        </p>
      </div>
      <div className="track_album" title={item.album.title}>
        <p onClick={() => navigate(`/watch/album/${item.album.id}`)}>
          {item.album.title}
        </p>
      </div>

      <div className="track_duration">
        <p>{formatTime(item.duration)}</p>
      </div>
    </div>
  );
};

export default TrackBox;
