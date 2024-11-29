import React from "react";
import {
  BsFillSkipEndFill,
  BsFillSkipStartFill,
  BsPauseFill,
  BsPlayFill,
} from "react-icons/bs";
import { GoPlusCircle } from "react-icons/go";
import { PiShuffleAngular, PiArrowsInSimple } from "react-icons/pi";
import { SlLoop } from "react-icons/sl";

const WatchFullScreen = ({
  divRef,
  preview,
  isFullscreen,
  toggleFullscreen,
}) => {
  console.log(preview);

  return (
    <div
      ref={divRef}
      className={isFullscreen ? "fullScreenPlayer active" : "fullScreenPlayer"}
    >
      <div
        className="fullScreenBackground"
        style={{ backgroundImage: `url(${preview?.artist?.picture_xl})` }}
      ></div>
      <div className="fullscreenInfo">
        <div className="fullscreenInfoGrid">
          <img
            src={preview?.album?.cover_xl}
            alt={preview?.album?.title}
            className="end"
          />
          <div className="fullscreenInfoTitle end">
            <h3>{preview?.title}</h3>
            <p>{preview?.artist?.name}</p>
          </div>
        </div>
        <div className="fullScreenParameters">
          <div className="fullscreenProgressGrid">
            <span>1:00</span>
            <div className="fullscreenProgress"></div>
            <span>3:00</span>
          </div>
          <div className="fullscreenProgressButtons">
            <div className="fsBtn">
              <GoPlusCircle />
            </div>
            <div className="fsButtons df">
              <div className="fsBtn">
                <PiShuffleAngular />
              </div>
              <div className="fsBtn">
                <BsFillSkipStartFill />
              </div>
              <div className="fsBtn fsBtnBig">
                <BsPlayFill />
              </div>
              <div className="fsBtn">
                <BsFillSkipEndFill />
              </div>
              <div className="fsBtn">
                <SlLoop />
              </div>
            </div>
            <div>
              <div className="fsBtn" onClick={toggleFullscreen}>
                <PiArrowsInSimple />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchFullScreen;
