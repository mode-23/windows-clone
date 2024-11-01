import React, { useState } from "react";
import Weather from "./weather/Weather";
import recycle from "./Home_assest/recycle.png";
import ContextMenu from "./ContextMenu";
const HomeBg = ({ openWeather, isOpenWeather }) => {
  const [open, isOpen] = useState(false);
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
      {/* <div className="spotify_preview">
        <div className="spotify_preview_header df">
          <img
            src="https://i.ytimg.com/vi/YwAU2lxiRQI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCX9Nu74hxLpYpY56s-cmYgIlKzmw"
            alt=""
          />
          <div className="asc">
            <h3>local</h3>
          </div>
        </div>
      </div> */}
      <div className="desktip_icon">
        <img src={recycle} alt="recycle" />
      </div>
      {openWeather && <Weather isOpenWeather={isOpenWeather} />}
    </div>
  );
};

export default HomeBg;
