import React, { useState } from "react";
import "./watch.css";
import WatchNavbar from "./WatchNavbar";
import WatchActivity from "./WatchActivity";
import WatchPlayer from "./WatchPlayer";
import { Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import CreatePlaylist from "./CreatePlaylist";

const Watch = () => {
  const [wideTab, isWideTab] = useState(true);
  const [tabbed, isTabbed] = useState(false);
  const [preview, setPreview] = useState({});
  const [createPlaylist, setCreatePlaylist] = useState(false);

  const handleTabSize = () => {
    if (wideTab) {
      return "tab watch wide";
    } else if (tabbed) {
      return "tab watch close";
    } else {
      return "tab watch";
    }
  };

  return (
    <div className={handleTabSize()}>
      <div className="watch_inner">
        <WatchNavbar setCreatePlaylist={setCreatePlaylist} />
        <Outlet context={{ setPreview, setCreatePlaylist }} />
        <WatchActivity
          isWideTab={isWideTab}
          isTabbed={isTabbed}
          setPreview={setPreview}
          preview={preview}
        />
      </div>
      <AnimatePresence mode="wait">
        {preview?.preview && <WatchPlayer preview={preview} />}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {createPlaylist && (
          <CreatePlaylist setCreatePlaylist={setCreatePlaylist} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Watch;
