import React, { useEffect, useState } from "react";
import { deezerFromApi } from "../DeezerAPI";
import SongBox from "../SongBox";

const FavoriteTracksBox = ({ item }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    deezerFromApi(`track/${item}`).then((res) => {
      setData(res);
    });
  }, [item]);
  return (
    <div>
      <SongBox item={data} />
    </div>
  );
};

export default FavoriteTracksBox;
