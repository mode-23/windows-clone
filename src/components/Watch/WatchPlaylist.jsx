import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { deleteDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import userImg from "../Home/Home_assest/user1.png";
import { BsPen, BsTrash3 } from "react-icons/bs";
import { TfiSearch } from "react-icons/tfi";
import TrackList from "./TrackList";
import { FaPlay } from "react-icons/fa6";
import Tooltip from "../Asset/Tooltip";
import LoadingPlaylist from "./LoadingPlaylist";
import WatchPlaylistPopUp from "./WatchPlaylistPopUp";
import { AnimatePresence } from "framer-motion";

const WatchPlaylist = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setPreview } = useOutletContext();
  const [data, setdata] = useState({});
  const [loading, setLoading] = useState(false);
  const [tracklist, setTrackList] = useState([]);
  const [loadingTracklist, isLoadingTracklist] = useState(false);
  const [openSearchPopUp, setOpenSearchPopUp] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "deezerPlaylist", id));
    } catch (err) {
      console.log(err);
    }
    navigate(`/watch`, { replace: true });
  };
  // useEffect(() => {
  //   const checkPlaylist = async () => {
  //     const res = await getDoc(doc(db, "deezerPlaylist", id));
  //     if (!res.exists()) {
  //       navigate("/watch");
  //     }
  //   };
  //   checkPlaylist();
  // }, [id]);
  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(doc(db, "deezerPlaylist", id), (doc) => {
      setdata(doc.data());
      console.log(doc.data());
      setLoading(false);
    });
    return () => {
      unsub();
    };
  }, [id]);
  function formatDate(seconds) {
    const date = new Date(seconds * 1000);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  const totalCount = data?.playListArray?.reduce(
    (sum, item) => sum + item.duration,
    0
  );
  const formatTime = (duartion) => {
    var sec_num = parseInt(duartion, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = "0" + hours;
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

  if (loading) return <LoadingPlaylist />;
  return (
    <div className="playlist_container">
      <AnimatePresence mode="wait">
        {openSearchPopUp && (
          <WatchPlaylistPopUp
            setOpenSearchPopUp={setOpenSearchPopUp}
            playlistName={data?.playListName}
            playlistData={
              <>
                {data?.playListArray?.length} tracks{" "}
                {data?.playListArray?.length > 0 ? (
                  <>| {formatTime(totalCount)}</>
                ) : (
                  <></>
                )}
              </>
            }
          />
        )}
      </AnimatePresence>
      <div className="playlist_container_header">
        <div className="playlist_container_header_img">
          <img src={data?.playListImgLive} alt={data?.playListName} />
        </div>
        <div className="playlist_container_header_info">
          <h2>{data?.playListName}</h2>
          <div className="df">
            <img src={userImg} alt="user image" />
            <h3>Mode</h3>
          </div>
          <p>
            {data?.playListArray?.length} tracks{" "}
            {data?.playListArray?.length > 0 ? (
              <>| {formatTime(totalCount)}</>
            ) : (
              <></>
            )}
          </p>
          <p>Release Date: {formatDate(data?.publishDate?.seconds)}</p>
          <p>{data?.playListDescription}</p>
        </div>
      </div>
      <div className="playlist_container_body">
        <header>
          <div className="df">
            {data?.playListArray?.length > 0 && (
              <div className="icon_pl_wl icon_pl_play toolholder">
                <Tooltip message={"Play"} direction="top" />
                <FaPlay />
              </div>
            )}
            <div className="icon_pl_wl toolholder">
              <Tooltip message={"Edit playlist"} direction="top" />
              <BsPen />
            </div>
            <div
              className="icon_pl_wl icon_pl_dl toolholder"
              onClick={handleDelete}
            >
              <Tooltip message={"Delete playlist"} direction="top" />
              <BsTrash3 />
            </div>
          </div>
          <div className="playlist_search">
            <input type="text" />
            <TfiSearch />
          </div>
        </header>
        <TrackList
          tracklist={data?.playListArray}
          loadingTracklist={loadingTracklist}
          setPreview={setPreview}
          type="playlist"
          id={id}
          setOpenSearchPopUp={setOpenSearchPopUp}
        />
      </div>
    </div>
  );
};

export default WatchPlaylist;
