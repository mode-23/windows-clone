import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deezerFromApi } from "./DeezerAPI";
import { AiFillPlayCircle } from "react-icons/ai";

const RecentHomeSearch = ({ item }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(true);
  useEffect(() => {
    isLoading(false);
    deezerFromApi(`search?q=${item?.searchValue}`).then((res) => {
      setData(res);
      isLoading(true);
      console.log(res);
    });
  }, []);

  return (
    <div
      className="watch_home_foru_box watch_home_foru_box1 watch_home_foru_box3"
      style={{ backgroundImage: `url(${data?.data?.[0]?.album?.cover_xl})` }}
      onClick={() => navigate(`/watch/query/${item?.searchValue}`)}
    >
      <div className="watch_foru_info">
        <h3>{data?.data?.[0]?.title}</h3>
        <p>{data?.data?.[0]?.artist?.name}</p>
      </div>
      <AiFillPlayCircle className="icon_play" />
    </div>
  );
};

export default RecentHomeSearch;
