import React from "react";

const LoadingPlaylist = () => {
  return (
    <div className="loadingPlaylist">
      <div className="loadingPlaylistHeader">
        <div className="loadingPlaylistImg"></div>
        <div className="loadingPlaylistInfo end">
          <div className="loadingPlayListTitle"></div>
          <div className="loadingPlayListDesc loadingPlayListDescLg"></div>
          <div className="loadingPlayListDesc loadingPlayListDescSm"></div>
          <div className="loadingPlayListDesc"></div>
        </div>
      </div>
      <div className="loadingPlaylistBody">
        <div className="loadingPlaylistBox"></div>
        <div className="loadingPlaylistBox"></div>
        <div className="loadingPlaylistBox"></div>
        <div className="loadingPlaylistBox"></div>
        <div className="loadingPlaylistBox"></div>
      </div>
    </div>
  );
};

export default LoadingPlaylist;
