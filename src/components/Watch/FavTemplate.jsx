import React from "react";
import { FaShuffle } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { GoHeartFill } from "react-icons/go";

const FavTemplate = ({ data1, data4, data5 }) => {
  return (
    <div className="favTemplate">
      <header>
        <div className="favBigIcon">
          <GoHeartFill />
        </div>
        <div className="end">
          <h3 className="favTitle">Favourites</h3>
          <div className="favTemplateHeader">
            <p>
              {data1?.length < 9 ? "0" + data1?.length : data1?.length} tracks |
              05 albums | 08 artists |{" "}
              {data4?.length < 9 ? "0" + data4?.length : data4?.length}{" "}
              playlists |{" "}
              {data5?.length < 9 ? "0" + data5?.length : data5?.length} genres
            </p>
            <button>
              <FaShuffle /> shuffle my music
            </button>
          </div>
        </div>
      </header>
      <ul className="favTemplateTab">
        <li>
          <NavLink
            to="/watch/favorites"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            highlights
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/watch/favorites/tracks"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            tracks
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/watch/favorites/albums"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            albums
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/watch/favorites/artists"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            artists
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/watch/favorites/playlists"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            playlists
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/watch/favorites/genres"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            genres
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default FavTemplate;
