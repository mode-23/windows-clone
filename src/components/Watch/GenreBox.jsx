import React, { useEffect, useState } from "react";
import { deezerFromApi } from "./DeezerAPI";

const GenreBox = ({ item }) => {
  const [data, setData] = useState({});
  const [loading, isLoading] = useState(true);
  useEffect(() => {
    isLoading(false);
    deezerFromApi(`genre/${item?.data?.id}`).then((res) => {
      setData(res);
      isLoading(true);
      console.log(res);
    });
  }, [item]);
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  return (
    <div
      className="genre_box"
      style={{
        backgroundColor: randomColor,
        backgroundImage: `url(${data?.picture_xl})`,
      }}
    >
      <h3>{data?.name}</h3>
    </div>
  );
};

export default GenreBox;
