import React, { useEffect } from "react";
import { FaRegClock } from "react-icons/fa6";
import { GoHeart } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const TrackList = ({ tracklist }) => {
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
  return (
    <div className="tracklist">
      <div className="tracklist_header track_grid">
        <span>track</span>
        <span></span>
        <span>album</span>
        <span className="duartion_header">
          <FaRegClock />
        </span>
      </div>
      {tracklist?.map((item, index) => (
        <div className="tracklist_box track_grid" key={item.id}>
          <div className="track_info df">
            <img src={item.album.cover_small} alt={item.album.title} />
            <p>
              {index + 1}. {item.title}
            </p>
          </div>
          <div className="track_fav">
            <button>
              <GoHeart />
            </button>
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
      ))}
    </div>
  );
};

export default TrackList;
