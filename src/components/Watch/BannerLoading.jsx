import React from "react";

const BannerLoading = () => {
  return (
    <div className="watch_banner_loading">
      <div className="watch_banner_loading_tab"></div>
      <div className="loading_tracks">
        <div className="loading_track_box_header">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="loading_track_box"></div>
        <div className="loading_track_box"></div>
        <div className="loading_track_box"></div>
        <div className="loading_track_box"></div>
        <div className="loading_track_box"></div>
        <div className="loading_track_box"></div>
      </div>
    </div>
  );
};

export default BannerLoading;
