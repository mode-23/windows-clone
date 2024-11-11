import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deezerFromApi } from "./DeezerAPI";

const Track = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    deezerFromApi(`track/${id}`).then((res) => {
      setData(res);
      console.log(res);
    });
  }, [id]);
  return <div>Track</div>;
};

export default Track;
