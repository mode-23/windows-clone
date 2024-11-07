import React, { useContext, useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { addToPlayList } from "./AddToPlaylist";
import { userContext } from "../../Context/UserContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { MdMusicOff } from "react-icons/md";

const TrackBox = ({ item, index, setPreview }) => {
  const { user } = useContext(userContext);
  const [data, setData] = useState([]);

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
  const testId = "6fb52ca8-e503-4b92-b654-51e7dd374764";
  const navigate = useNavigate();
  const [isHovered, setHovered] = useState(false);
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
  const checkExistance = data?.[0]?.playListArray?.some(
    (list) => list?.id === item?.id
  );
  return (
    <div className="tracklist_box track_grid">
      <div className="track_info df">
        <img src={item.album.cover_small} alt={item.album.title} />
        <p onClick={() => setPreview(item)}>{item.title}</p>
      </div>
      <div className="track_fav">
        <button
          onMouseOver={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {isHovered ? <GoHeartFill /> : <GoHeart />}
        </button>
        {!checkExistance ? (
          <button onClick={() => addToPlayList(data, item, testId)}>
            <BsPlusLg />
          </button>
        ) : (
          <button onClick={() => addToPlayList(data, item, testId)}>
            <MdMusicOff />
          </button>
        )}
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
