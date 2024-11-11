import React, { useEffect, useRef, useState } from "react";
import {
  BsFillSkipEndFill,
  BsFillSkipStartFill,
  BsHeart,
  BsHeartFill,
  BsPlayFill,
  BsPauseFill,
} from "react-icons/bs";
import { PiShuffleAngular } from "react-icons/pi";
import { SlLoop } from "react-icons/sl";
import { FaVolumeHigh, FaVolumeLow, FaVolumeXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PiArrowsOutSimpleFill } from "react-icons/pi";
import WatchFullScreen from "./WatchFullScreen";

const WatchPlayer = ({ preview }) => {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [play, setPlay] = useState("pause");
  const [duration, setDuration] = useState("0:00");
  const [percent, setPercent] = useState(0);
  const [timelinePosition, setTimelinePosition] = useState(0);
  const [volumeLvl, setVolumeLvl] = useState("high");
  const [isLoop, setIsLoop] = useState(false);

  console.log(preview);
  const VDPvideo = useRef();
  const InputRange = useRef();

  const divRef = useRef(null);
  const openFullscreen = () => {
    if (divRef.current) {
      if (divRef.current.requestFullscreen) {
        divRef.current.requestFullscreen();
      } else if (divRef.current.webkitRequestFullscreen) {
        // Safari
        divRef.current.webkitRequestFullscreen();
      } else if (divRef.current.msRequestFullscreen) {
        // IE11
        divRef.current.msRequestFullscreen();
      }
    }
  };
  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      // Safari
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE11
      document.msExitFullscreen();
    }
  };
  const toggleFullscreen = () => {
    if (isFullscreen) {
      closeFullscreen();
    } else {
      openFullscreen();
    }
  };
  useEffect(() => {
    // Listener to detect full-screen changes
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === divRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange); // Safari
    document.addEventListener("msfullscreenchange", handleFullscreenChange); // IE11

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);
  const playVideo = () => {
    if (VDPvideo.current.paused) {
      VDPvideo.current.play();
    } else {
      VDPvideo.current.pause();
    }
  };
  const VideoSound = () => {
    VDPvideo.current.muted = !VDPvideo.current.muted;
  };
  const formatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
  });
  const formatDuration = (time) => {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);
    if (hours == 0) {
      return `${minutes}:${formatter.format(seconds)}`;
    } else {
      return `${hours}:${formatter.format(minutes)}:${formatter.format(
        seconds
      )}`;
    }
  };
  const LoadedVideo = () => {
    setDuration(formatDuration(VDPvideo?.current?.currentTime));
  };
  const TimeUpdateHandler = () => {
    setDuration(formatDuration(VDPvideo?.current?.currentTime));
    setTimelinePosition(
      VDPvideo?.current?.currentTime / VDPvideo?.current?.duration
    );
  };
  const timeLineMovement = (e) => {
    const rect = e.target.getBoundingClientRect();
    setPercent(
      Math.min(Math.max(0, e.screenX - rect.x), rect.width) / rect.width
    );
    console.log(
      Math.min(Math.max(0, e.screenX - rect.x), rect.width) / rect.width
    );
  };
  const VolumeHandler = () => {
    InputRange.current.value = VDPvideo.current.volume;
    if (VDPvideo.current.muted || VDPvideo.current.volume == 0) {
      InputRange.current.value = 0;
      setVolumeLvl("muted");
    } else if (VDPvideo.current.volume >= 0.5) {
      setVolumeLvl("high");
    } else {
      setVolumeLvl("low");
    }
  };
  const VolumeInput = (e) => {
    VDPvideo.current.volume = e.target.value;
    VDPvideo.current.muted = e.target.value == 0;
  };
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
          <div className="icon_big" onClick={playVideo}>
            {play === "play" ? <BsPauseFill /> : <BsPlayFill />}
          </div>
          <div className="icon_1 icon_3">
            <BsFillSkipEndFill />
          </div>
          <div
            className={isLoop ? "icon_1 icon_3 active" : "icon_1 icon_3"}
            onClick={() => setIsLoop((prev) => !prev)}
          >
            <SlLoop />
          </div>
        </div>
        <div className="input_player">
          <span>{duration}</span>
          <div className="input_slider">
            <div
              className="input_slider_progress"
              style={{ right: `calc(100% - ${timelinePosition} * 100%)` }}
            ></div>
          </div>
          <span>
            {VDPvideo?.current?.duration
              ? formatDuration(VDPvideo?.current.duration)
              : "0:00"}
          </span>
        </div>
      </div>
      <div className="watch_player_parameter">
        <div>
          <audio
            ref={VDPvideo}
            autoPlay
            onPlay={() => setPlay("play")}
            onPause={() => setPlay("pause")}
            onLoadedData={LoadedVideo}
            onTimeUpdate={TimeUpdateHandler}
            onVolumeChange={VolumeHandler}
            controls
            src={preview.preview}
            loop={isLoop}
          ></audio>
        </div>
        <WatchFullScreen
          isFullscreen={isFullscreen}
          divRef={divRef}
          preview={preview}
        />
        <div className="df">
          <button onClick={toggleFullscreen}>
            <PiArrowsOutSimpleFill />
            {/* {isFullscreen ? "Exit Fullscreen" : "Go Fullscreen"} */}
          </button>
          <div className="df">
            <button onClick={VideoSound}>
              {volumeLvl == "high" && <FaVolumeHigh />}
              {volumeLvl == "low" && <FaVolumeLow />}
              {volumeLvl == "muted" && <FaVolumeXmark />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="any"
              defaultValue="1"
              className="volumeInput"
              onInput={VolumeInput}
              ref={InputRange}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WatchPlayer;
