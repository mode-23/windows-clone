import React from "react";
import {
  BsFillSkipEndFill,
  BsFillSkipStartFill,
  BsHeart,
  BsHeartFill,
  BsPlayFill,
} from "react-icons/bs";
import { PiShuffleAngular } from "react-icons/pi";
import { SlLoop } from "react-icons/sl";
import { FaVolumeHigh } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const WatchPlayer = ({ preview }) => {
  const navigate = useNavigate();
  console.log(preview);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="watch_player"
    >
      <div className="watch_player_title">
        <div
          className="song_preview"
          style={{ backgroundImage: `url(${preview?.album?.cover_xl})` }}
        />
        <div className="end">
          <h3 onClick={() => navigate(`/watch/track/${preview?.id}`)}>
            {preview?.title}
          </h3>
          <p onClick={() => navigate(`/watch/artist/${preview?.artist?.id}`)}>
            {preview?.artist?.name}
          </p>
        </div>
        <div className="end">
          <div className="icon_1 icon_3">
            <BsHeart />
          </div>
        </div>
      </div>
      <div className="watch_player_input">
        <div className="icon_inputs df">
          <div className="icon_1 icon_3">
            <PiShuffleAngular />
          </div>
          <div className="icon_1 icon_3">
            <BsFillSkipStartFill />
          </div>
          <div className="icon_big">
            <BsPlayFill />
          </div>
          <div className="icon_1 icon_3">
            <BsFillSkipEndFill />
          </div>
          <div className="icon_1 icon_3">
            <SlLoop />
          </div>
        </div>
        <div className="input_player">
          <span>1:00</span>
          <div className="input_slider"></div>
          <span>3:00</span>
        </div>
      </div>
      <div className="watch_player_parameter">
        <FaVolumeHigh />
      </div>
    </motion.div>
  );
};

export default WatchPlayer;
