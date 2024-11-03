import React, { useState } from "react";
import Weather from "./weather/Weather";
import recycle from "./Home_assest/recycle.png";
import ContextMenu from "./ContextMenu";
import { BsSpotify } from "react-icons/bs";
import { IoMdSkipForward, IoMdSkipBackward } from "react-icons/io";
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5";

const HomeBg = ({ openWeather, isOpenWeather }) => {
  const [open, isOpen] = useState(false);
  const [volumeValue, setVolumeValue] = useState("0");
  const [stats, setStats] = useState({
    top: "",
    left: "",
  });
  const handleOption = (e) => {
    e.preventDefault();
    isOpen(true);
    setStats({ top: e.clientY, left: e.clientX });
  };

  return (
    <div className="home_bg" onContextMenu={handleOption}>
      {open && <ContextMenu stats={stats} isOpen={isOpen} />}
      <div className="spotify_preview_holder">
        <div className="spotify_preview_volume">
          <input
            type="range"
            onChange={(e) => setVolumeValue(e.target.value)}
            onMouseMove={(e) => setVolumeValue(e.target.value)}
            value={volumeValue}
            defaultValue={"0"}
          />
          <h5>{volumeValue === "0" ? "✕" : volumeValue}</h5>
        </div>
        <div className="spotify_preview">
          <div className="spotify_preview_header">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMVOXYdhkq4Cxw3Zp6M79c-TfvMPTlWdGnIw&s"
              alt=""
            />
            <div className="spotify_preview_info">
              <h4 className="df">
                Song name <p>•</p> <span>Artist</span>
              </h4>
              <BsSpotify />
            </div>
          </div>
          <div className="spotify_preview_body">
            <div className="buttons">
              <button className="smallBtn">
                <IoMdSkipBackward />
              </button>
              <button>
                <IoPauseSharp />
              </button>
              <button className="smallBtn">
                <IoMdSkipForward />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="desktip_icon">
        <img src={recycle} alt="recycle" />
      </div>
      {openWeather && <Weather isOpenWeather={isOpenWeather} />}
    </div>
  );
};

export default HomeBg;
