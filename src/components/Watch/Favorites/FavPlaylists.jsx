import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { TfiSearch } from "react-icons/tfi";
import { GoChevronDown } from "react-icons/go";

const FavPlaylists = () => {
  const { favoritePlaylists, setCreatePlaylist } = useOutletContext();
  console.log(favoritePlaylists);
  function formatDate(seconds) {
    const date = new Date(seconds * 1000);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  }
  return (
    <div className="favPlaylists">
      <div className="favPlaylistsHeader">
        <div className="favSearch">
          <input type="text" placeholder="search" />
          <TfiSearch />
        </div>
        <div className="favTab">
          <p>Recently added</p>
          <GoChevronDown />
          <div className="favTabDropDown">testing</div>
        </div>
      </div>
      <div className="favTemplateGrid favTemplateScroll">
        <div className="favPlaylistBox" onClick={() => setCreatePlaylist(true)}>
          <div className="favPlaylistImg favPlaylistIcon">
            <BsPlusLg />
          </div>
          <div className="favPlaylistInfo">
            <h3>Create a playlist</h3>
          </div>
        </div>
        {favoritePlaylists?.map((item) => (
          <Link
            to={`/watch/playlist/${item.id}`}
            className="favPlaylistBox"
            key={item.id}
          >
            <div className="favPlaylistImg">
              <div className="favPlayIcon">
                <FaPlay />
              </div>
              <img src={item.playListImgLive} alt={item.playListName} />
            </div>
            <div className="favPlaylistInfo">
              <h3>{item.playListName}</h3>
              <p>{formatDate(item?.publishDate?.seconds)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FavPlaylists;
