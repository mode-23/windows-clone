import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { deezerFromApi } from "./DeezerAPI";
import { useOutletContext, useParams } from "react-router-dom";
import TrackList from "./TrackList";
import { TfiClose } from "react-icons/tfi";
import { motion } from "framer-motion";

const WatchPlaylistPopUp = ({
  setOpenSearchPopUp,
  playlistName,
  playlistData,
}) => {
  const { id } = useParams();
  const { setPreview } = useOutletContext();
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState([]);
  const [query, setQuery] = useState();
  const [openPopUp, setOpenPopUp] = useState("");

  const handleSearch = () => {
    isLoading(false);
    deezerFromApi(`search?q=${query}`).then((res) => {
      setData(res?.data);
      console.log(res?.data);
      isLoading(true);
    });
  };
  useEffect(() => {
    const search = async (e) => {
      if (e.key === "Enter" && query) {
        handleSearch();
        setQuery("");
      }
    };
    document.addEventListener("keyup", search);
    return () => {
      document.removeEventListener("keyup", search);
    };
  }, [query]);
  return (
    <motion.div
      className="watchPlaylistPopUp"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header>
        <div className="close_icon" onClick={() => setOpenSearchPopUp(false)}>
          <TfiClose />
        </div>
        <h3>{playlistName}</h3>
        <p>{playlistData}</p>
        <div className="watchPlaylistPopUpInput">
          <IoSearchOutline />
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            placeholder="Search tracks"
          />
        </div>
      </header>
      <div className="watchPlaylistPopUpBody">
        <TrackList
          tracklist={data}
          setPreview={setPreview}
          openPopUp={openPopUp}
          setOpenPopUp={setOpenPopUp}
          type={"searchPlaylist"}
          id={id}
        />
      </div>
    </motion.div>
  );
};

export default WatchPlaylistPopUp;
