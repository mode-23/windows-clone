import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deezerFromApi } from "./DeezerAPI";
import TrackList from "./TrackList";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { userContext } from "../../Context/UserContext";

const Artist = () => {
  const { id } = useParams();
  const { user } = useContext(userContext);
  const [data, setData] = useState({});
  const [tracklist, setTrackList] = useState([]);
  const [loading, isLoading] = useState(true);
  useEffect(() => {
    isLoading(false);
    deezerFromApi(`artist/${id}`).then((res) => {
      setData(res);
      isLoading(true);
    });
  }, [id]);
  useEffect(() => {
    if (data?.name) {
      deezerFromApi(`search?q=${data?.name}`).then((res) => {
        setTrackList(res.data);
      });
    }
  }, [data, id]);
  const favArtist = user?.uid + "_" + data?.id;
  useEffect(() => {
    if (user?.uid && data?.id) {
      const createFavArtist = async () => {
        const res = await getDoc(doc(db, "favArtist", favArtist));
        try {
          if (!res.exists()) {
            await setDoc(doc(db, "favArtist", favArtist), {
              id: favArtist,
              userId: user.uid,
              data,
            });
          } else {
            console.log("exists!");
          }
        } catch (error) {
          console.log(error);
        }
      };
      createFavArtist();
    }
  }, [user, data]);
  return (
    <div className="artist_profile">
      <div className="artist_profile_banner_holder">
        <div className="artist_profile_info df">
          <img src={data?.picture_xl} alt={data?.name} />
          <div className="artist_profile_info_details">
            <h3>{data?.name}</h3>
            <div className="df">
              <p>
                {new Intl.NumberFormat("en-IN", {
                  maximumSignificantDigits: 3,
                }).format(data?.nb_fan)}{" "}
                fans
              </p>
              <p>•</p>
              <p>{data?.nb_album} albums</p>
            </div>
          </div>
        </div>
        <div
          className="artist_profile_banner"
          style={{ backgroundImage: `url(${data?.picture_xl})` }}
        ></div>
      </div>

      <TrackList tracklist={tracklist} />
    </div>
  );
};

export default Artist;
