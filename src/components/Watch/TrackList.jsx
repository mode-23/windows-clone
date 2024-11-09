import React from "react";
import { FaRegClock } from "react-icons/fa6";
import TrackBox from "./TrackBox";
import { TfiPlus } from "react-icons/tfi";

const TrackList = ({
  tracklist,
  setPreview,
  type,
  openPopUp,
  setOpenPopUp,
  id,
}) => {
  return (
    <div className="tracklist">
      {!type && <h3 className="track_title">Track list</h3>}
      <div className="tracklist_header track_grid">
        <span>track</span>
        <span></span>
        <span>album</span>
        <span className="duartion_header">
          <FaRegClock />
        </span>
      </div>
      {type && type === "playlist" && (
        <div className="tracklist_box tracklist_box_add">
          <div className="df">
            <div className="tr_box_icon">
              <TfiPlus />
            </div>
            <h5>Add tracks</h5>
          </div>
        </div>
      )}
      {tracklist?.map((item, index) => (
        <TrackBox
          item={item}
          key={index}
          index={index}
          setPreview={setPreview}
          openPopUp={openPopUp}
          setOpenPopUp={setOpenPopUp}
          id={id}
        />
      ))}
    </div>
  );
};

export default TrackList;
