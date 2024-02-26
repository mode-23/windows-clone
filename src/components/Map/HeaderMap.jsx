import React, { useEffect, useRef, useState } from "react";
import { RiGovernmentFill, RiSearchLine } from "react-icons/ri";
import { SlLocationPin } from "react-icons/sl";
import { VscHistory } from "react-icons/vsc";
import { PiTrainFill } from "react-icons/pi";
import { MdHolidayVillage } from "react-icons/md";
import { GoLaw } from "react-icons/go";
import { ImRoad } from "react-icons/im";
import { BsEvStationFill, BsHouseFill, BsPeopleFill } from "react-icons/bs";
import {
  FaCity,
  FaGraduationCap,
  FaPlane,
  FaRoad,
  FaWater,
} from "react-icons/fa";
import GoogleMenu from "../Google_Components/GoogleMenu";
import axios from "axios";
import UserMenu from "../Google_Components/UserMenu";

const HeaderMap = ({ map }) => {
  const [focus, isFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const mainRef = useRef(null);
  useEffect(() => {
    let clickOutside = (e) => {
      if (!mainRef.current.contains(e.target)) {
        isFocused(false);
      }
    };
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  });
  useEffect(() => {
    if (searchTerm) {
      axios
        .get(`https://geocode.maps.co/search?q=${searchTerm}`)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setData([]);
    }
  }, [searchTerm]);
  const handleFly = (item) => {
    const { lon, lat } = item;
    const coordinates = {
      lat,
      lng: lon,
    };
    map?.target?.flyTo(coordinates, 12);
    setSearchTerm('')
  };
  const getCurrentIcon = (key) => {
    switch (key) {
      case "city":
        return <FaCity />;
        break;
      case "aerodrome":
        return <FaPlane />;
        break;
      case "census":
        return <BsPeopleFill />;
        break;
      case "university":
        return <FaGraduationCap />;
        break;
      case "administrative":
        return <RiGovernmentFill />;
        break;
      case "suburb":
        return <BsHouseFill />;
        break;
      case "neighbourhood":
        return <FaRoad />;
        break;
      case "river":
        return <FaWater />;
        break;
      case "village":
        return <MdHolidayVillage />;
        break;
      case "subway":
        return <PiTrainFill />;
        break;
      case "station":
        return <BsEvStationFill />;
        break;
      case "municipality":
        return <GoLaw />;
        break;
      case "motorway_junction":
        return <ImRoad />;
        break;
      default:
        return <SlLocationPin />;
        break;
    }
  };
  return (
    <header className="header_map">
      <div className="map_search_holder" ref={mainRef}>
        <div className="map_search">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for countries"
            className={focus && searchTerm && data?.length ? "active" : "nun"}
            onFocus={() => isFocused(true)}
          />
          <RiSearchLine />
        </div>
        {focus && searchTerm && data?.length && (
          <div className="map_search_drop_down">
            <ul>
              {data.map((item) => (
                <li key={item?.place_id} onClick={() => handleFly(item)}>
                  {getCurrentIcon(item?.type)}
                  <div className="txt_srch_map">
                    <b>{item?.type?.replace(/_/g, " ")}</b>
                    <p>{item?.display_name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="df">
      <GoogleMenu />
      <UserMenu />
      </div>
    </header>
  );
};

export default HeaderMap;
