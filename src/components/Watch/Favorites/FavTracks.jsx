import React from "react";
import { useOutletContext } from "react-router-dom";
import FavoriteTracksBox from "./FavoriteTracksBox";

const FavTracks = () => {
  const { favoriteTracks } = useOutletContext();
  console.log(favoriteTracks);

  return (
    <div className="favTemplateGrid favTemplateScroll favTracks">
      {favoriteTracks?.map((item, index) => (
        <FavoriteTracksBox item={item} key={index} />
      ))}
    </div>
  );
};

export default FavTracks;
