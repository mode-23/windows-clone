import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { VscClose, VscDeviceCamera } from "react-icons/vsc";
import { v4 } from "uuid";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { userContext } from "../../Context/UserContext";
import { db } from "../../firebase/Firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CreatePlaylist = ({ setCreatePlaylist }) => {
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const [playlistDetails, setPlaylistDetails] = useState({
    id: v4(),
    playListName: "",
    playListDescription: "",
    playListImg: "",
    playListArray: [],
  });
  const [imageFile, setImageFile] = useState("");
  const [progresState, setProgresState] = useState("");

  const loadImage = (e) => {
    setPlaylistDetails({
      ...playlistDetails,
      playListImg: URL.createObjectURL(e.target.files[0]),
    });
    setImageFile(e.target.files[0]);
  };
  useEffect(() => {
    const uploadImg = () => {
      const storage = getStorage();
      const storageRef2 = ref(storage, "commentImage" + playlistDetails.postId);
      const uploadTask2 = uploadBytesResumable(storageRef2, imageFile);
      uploadTask2.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgresState(progress);
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask2.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setPlaylistDetails((prev) => ({
              ...prev,
              playListImgLive: downloadURL,
            }));
          });
        }
      );
    };
    playlistDetails.playListImg && uploadImg();
  }, [playlistDetails.playListImg]);
  const createPlaylistPost = async () => {
    try {
      await setDoc(doc(db, "deezerPlaylist", playlistDetails.id), {
        ...playlistDetails,
        userId: user?.uid,
        publishDate: serverTimestamp(),
      });
      navigate(`/watch/playlist/${playlistDetails.id}`);
      setCreatePlaylist(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="create_playlist_modal"
    >
      <div className="create_playlist_box">
        <div className="create_playlist_box_header">
          <h3>Create playlist</h3>
          <div className="icon_pla" onClick={() => setCreatePlaylist(false)}>
            <VscClose />
          </div>
        </div>
        <div className="create_playlist_box_body">
          <div className="creat_pl_img">
            {playlistDetails.playListImg && (
              <img src={playlistDetails.playListImg} alt="chosen image" />
            )}

            <input
              type="file"
              id="photoFile"
              accept="image/*"
              onChange={(e) => loadImage(e)}
            />
            <label
              htmlFor="photoFile"
              accept="image/*"
              onChange={(e) => loadImage(e)}
            >
              <button>
                <VscDeviceCamera />
              </button>
            </label>
          </div>
          <div className="creat_pl_info">
            <div className="creat_pl_label">
              <h5>Name</h5>
              <input
                type="text"
                className="pl_input"
                placeholder="Playlist Name"
                onChange={(e) =>
                  setPlaylistDetails({
                    ...playlistDetails,
                    playListName: e.target.value,
                  })
                }
                value={playlistDetails.playListName}
              />
            </div>
          </div>
        </div>
        <div className="create_playlist_box_footer">
          <div className="creat_pl_label">
            <h5>Description</h5>
            <textarea
              className="pl_input pl_textarea"
              placeholder="Playlist Description"
              onChange={(e) =>
                setPlaylistDetails({
                  ...playlistDetails,
                  playListDescription: e.target.value,
                })
              }
              value={playlistDetails.playListDescription}
            ></textarea>
          </div>
          <div className="create_button">
            <button
              onClick={createPlaylistPost}
              disabled={playlistDetails.playListImg && progresState !== 100}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CreatePlaylist;
