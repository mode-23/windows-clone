import React from "react";

const WatchFullScreen = ({ divRef, preview, isFullscreen }) => {
  return (
    <div
      ref={divRef}
      style={{ backgroundImage: `url(${preview?.album?.cover_xl})` }}
      className={isFullscreen ? "fullScreenPlayer active" : "fullScreenPlayer"}
    >
      <div className="fullscreenInfo">
        <img src={preview?.album?.cover_xl} alt={preview?.album?.title} />
      </div>
    </div>
  );
};

export default WatchFullScreen;
