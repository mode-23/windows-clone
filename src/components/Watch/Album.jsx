import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deezerFromApi } from "./DeezerAPI";
import TrackList from "./TrackList";
import { userContext } from "../../Context/UserContext";
import { db } from "../../firebase/Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
const Album = () => {
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, isLoading] = useState(true);
  useEffect(() => {
    isLoading(false);
    deezerFromApi(`album/${id}`).then((res) => {
      setData(res);
      isLoading(true);
      console.log(res);
    });
  }, [id]);
  const formatTime = (duartion) => {
    const hours = Math.floor(duartion / 3600);
    const minutes = Math.floor((duartion % 3600) / 60);
    const secs = duartion % 60;

    if (hours > 0) {
      return `${hours} hr${hours > 1 ? "s" : ""} ${minutes} min${
        minutes > 1 ? "s" : ""
      }`;
    } else if (minutes > 0) {
      return `${minutes} min${minutes > 1 ? "s" : ""}`;
    } else {
      return `${secs} sec${secs > 1 ? "s" : ""}`;
    }
  };
  const favGenreId = user?.uid + "_" + data?.genre_id;
  useEffect(() => {
    if (user?.uid && data?.genre_id) {
      const createGenre = async () => {
        const res = await getDoc(doc(db, "favGenres", favGenreId));
        try {
          if (!res.exists()) {
            await setDoc(doc(db, "favGenres", favGenreId), {
              id: favGenreId,
              userId: user.uid,
              data: data?.genres?.data?.[0],
            });
          } else {
            console.log("exists!");
          }
        } catch (error) {
          console.log(error);
        }
      };
      data?.genres?.data?.[0] && createGenre();
    }
  }, [user, data]);
  return (
    <div className="album_profile artist_profile">
      <div className="artist_profile_banner_holder">
        <div className="artist_profile_info df">
          <img src={data?.cover_xl} alt={data?.name} />
          <div className="artist_profile_info_details">
            <h3>{data?.title}</h3>
            <span>
              By{" "}
              <small
                onClick={() => navigate(`/watch/artist/${data?.artist?.id}`)}
              >
                {data?.artist?.name}
              </small>
            </span>
            <div className="df">
              <p>{formatTime(data?.duration)}</p>
              <p>•</p>
              <p>{data?.nb_tracks} tracks</p>
            </div>
          </div>
        </div>
        <div
          className="artist_profile_banner"
          style={{ backgroundImage: `url(${data?.cover_xl})` }}
        ></div>
      </div>
      <TrackList tracklist={data?.tracks?.data} />
    </div>
  );
};

export default Album;
