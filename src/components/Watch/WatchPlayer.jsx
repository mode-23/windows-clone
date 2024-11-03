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

const WatchPlayer = ({ preview }) => {
  console.log(preview);

  return (
    <div className="watch_player">
      <div className="watch_player_title">
        <div
          className="song_preview"
          style={{ backgroundImage: `url(${preview?.album?.cover_xl})` }}
        />
        <div className="start">
          <h3>{preview?.title_short}</h3>
          <p>{preview?.artist?.name}</p>
        </div>
        <div className="start">
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
    </div>
  );
};

export default WatchPlayer;
