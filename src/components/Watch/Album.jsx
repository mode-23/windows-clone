import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { deezerFromApi } from "./DeezerAPI";
import TrackList from "./TrackList";
import { userContext } from "../../Context/UserContext";
import { db } from "../../firebase/Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import BannerLoading from "./BannerLoading";
import { GoHeart } from "react-icons/go";
const Album = () => {
  const navigate = useNavigate();
  const { user } = useContext(userContext);
  const { id } = useParams();
  const { setPreview } = useOutletContext();
  const [data, setData] = useState({});
  const [loading, isLoading] = useState(false);
  const [openPopUp, setOpenPopUp] = useState("");

  useEffect(() => {
    isLoading(true);
    deezerFromApi(`album/${id}`).then((res) => {
      setData(res);
      isLoading(false);
      console.log(res);
    });
  }, [id]);
  const formatTime = (duartion) => {
    const hours = Math.floor(duartion / 3600);
    const minutes = Math.floor((duartion % 3600) / 60);
    const secs = duartion % 60;

    if (hours > 0) {
      return `${hours}h${hours > 1 ? "s" : ""} ${
        minutes > 9 ? minutes : "0" + minutes
      } min${minutes > 1 ? "s" : ""}`;
    } else if (minutes > 0) {
      return `${minutes > 9 ? minutes : "0" + minutes}min${
        minutes > 1 ? "s" : ""
      }`;
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
              userId: user?.uid,
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
  if (loading) return <BannerLoading />;
  return (
    <div className="album_profile artist_profile">
      <div className="artist_profile_banner_holder">
        <div className="artist_profile_info df">
          <img src={data?.cover_xl} alt={data?.name} />
          <div className="artist_profile_info_details">
            <h3>{data?.title}</h3>
            <span>
              <div className="df">
                By
                {data?.contributors?.map((item) => (
                  <small
                    key={item.id}
                    onClick={() => navigate(`/watch/artist/${item?.id}`)}
                  >
                    {item?.name}
                  </small>
                ))}
              </div>
            </span>
            <div className="df">
              <p>
                {new Date(data?.release_date).getFullYear()} - {data?.nb_tracks}{" "}
                tracks, {formatTime(data?.duration)}
              </p>

              {/* <p>{data?.nb_tracks} tracks</p>
              <p>|</p>
              <p>{formatTime(data?.duration)}</p>
              <p>|</p>
              <p>{data?.release_date?.replace(/-/g, "/")}</p>
              <p>|</p>
              <p>
                {new Intl.NumberFormat("en-IN", {
                  maximumSignificantDigits: 3,
                }).format(data?.fans)}{" "}
                fans
              </p> */}
            </div>
            <div className="artist_buttons df">
              <button className="playBtn">play</button>
              <button className="heartBtn">
                <GoHeart />
              </button>
            </div>
          </div>
        </div>
        <div
          className="artist_profile_banner"
          style={{ backgroundImage: `url(${data?.cover_xl})` }}
        ></div>
      </div>
      <TrackList
        tracklist={data?.tracks?.data}
        setPreview={setPreview}
        openPopUp={openPopUp}
        setOpenPopUp={setOpenPopUp}
      />
    </div>
  );
};

export default Album;
