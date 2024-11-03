import React, { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { db } from "../../../firebase/Firebase";
import {
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
  serverTimestamp,
  collection,
  query,
} from "firebase/firestore";
import { useNavigate, useParams, Link } from "react-router-dom";
import file from "../Home_assest/file.png";
import OfficeLoader from "./OfficeLoader";
import { BsCloudCheck, BsDash, BsStar, BsStarFill } from "react-icons/bs";
import { VscPrimitiveSquare } from "react-icons/vsc";
import {
  IoCloseSharp,
  IoLockOpenOutline,
  IoLockClosedOutline,
} from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineRefresh } from "react-icons/hi";
import Summary from "./Summary";
import office_pic from "../Home_assest/office.png";

const Document = ({ user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.uid) {
      navigate("/");
    }
  }, [user]);
  const [editorState, seteditorState] = useState(EditorState.createEmpty());
  const [data, setdata] = useState({});
  const [usersSuggestions, setUsersSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wideTab, isWideTab] = useState(true);
  const [tabbed, isTabbed] = useState(false);
  const [isSaved, setSaved] = useState(true);
  const [isReadOnly, setReadOnly] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setLoading(false);
    const unsub = onSnapshot(doc(db, "asset", id), (doc) => {
      setdata(doc.data());
      setLoading(true);
      if (doc.data()?.editorState) {
        seteditorState(
          EditorState.createWithContent(convertFromRaw(doc.data()?.editorState))
        );
      }
    });
    return () => {
      unsub();
    };
  }, [id]);
  useEffect(() => {
    const refrence = collection(db, "user");
    const q = query(refrence);
    const unsub = onSnapshot(
      q,
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          if (doc.data().uid != user?.uid) {
            list.push({ ...doc.data() });
          }
          setUsersSuggestions(list);
        });
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, [user]);
  const formattedSuggestions = usersSuggestions?.map((item) => ({
    text: item.displayName,
    value: item.email,
    url: "/",
  }));
  console.log(formattedSuggestions);

  const onEditorStateChange = async (editorState) => {
    setSaved(false);
    seteditorState(editorState);
    //   const res = await setDoc(doc(db, "asset", id), {
    //      editorState: convertToRaw(editorState.getCurrentContent()),
    // }, {
    //           merge: true,
    //    });
    setSaved(true);
  };
  const save = async () => {
    setSaved(false);
    const res = await setDoc(
      doc(db, "asset", id),
      {
        editorState: convertToRaw(editorState.getCurrentContent()),
        lastModified: serverTimestamp(),
      },
      {
        merge: true,
      }
    );
    setSaved(true);
    console.log(res);
  };
  const handleTabSize = () => {
    if (wideTab) {
      return "tab office_tab wide";
    } else if (tabbed) {
      return "tab office_tab close";
    } else {
      return "tab office_tab";
    }
  };
  function setTooltip() {
    return {
      inline: { inDropdown: false },
      list: { inDropdown: false },
      textAlign: { inDropdown: false },
      link: { inDropdown: false },
      history: { inDropdown: false },
    };
    // if(wideTab){
    //   console.log('true');
    // return {
    //   inline: { inDropdown: true },
    //   list: { inDropdown: true },
    //   textAlign: { inDropdown: true },
    //   link: { inDropdown: true },
    //   history: { inDropdown: true },
    // }
    // }else{
    //   console.log('false');
    //   return {
    //     inline: { inDropdown: false },
    //     list: { inDropdown: false },
    //     textAlign: { inDropdown: false },
    //     link: { inDropdown: false },
    //     history: { inDropdown: false },
    //   }
    // }
  }
  const HandleFavourise = async () => {
    const DocRef = doc(db, "asset", id);
    if (!data?.favourite || data?.favourite == "false") {
      await updateDoc(DocRef, {
        favourite: "true",
      });
    } else {
      await updateDoc(DocRef, {
        favourite: "false",
      });
    }
  };
  async function updateFileName(e) {
    if (e.target.value != "") {
      const DocRef = doc(db, "asset", id);
      await updateDoc(DocRef, {
        file_name: e.target.value,
        lastModified: serverTimestamp(),
      });
    }
  }
  return (
    <div className={handleTabSize()}>
      <div className="tab_title office_tab_title">
        <div className="df">
          <img src={office_pic} alt="doc img" />
          <div className="title-sm">Office</div>
        </div>
        <div className="tab_utils tab_utils2 ">
          <div className="tab_util_icon" onClick={() => isTabbed(!tabbed)}>
            <BsDash />
          </div>
          <div className="tab_util_icon" onClick={() => isWideTab(!wideTab)}>
            <VscPrimitiveSquare />
          </div>
          <div className="tab_util_icon close" onClick={() => navigate("/")}>
            <IoCloseSharp />
          </div>
        </div>
      </div>
      {loading ? (
        <>
          <div className="doc_title">
            <div className="df">
              <Link to={"/office"}>
                <img src={file} alt="file" />
              </Link>
              <div className="asc">
                <div className="df">
                  <input
                    type="text"
                    defaultValue={data?.file_name}
                    onChange={updateFileName}
                  />
                  <div
                    className={
                      !data?.favourite || data?.favourite == "false"
                        ? "doc_title_icon"
                        : "doc_title_icon active"
                    }
                    title="Star"
                    onClick={HandleFavourise}
                  >
                    {!data?.favourite || data?.favourite == "false" ? (
                      <BsStar />
                    ) : (
                      <BsStarFill />
                    )}
                  </div>
                  <div
                    className="doc_title_icon"
                    title={
                      isSaved ? "All changes are saved" : "Saving to office"
                    }
                  >
                    {isSaved ? (
                      <BsCloudCheck />
                    ) : (
                      <HiOutlineRefresh className="rotate" />
                    )}
                  </div>
                </div>
                <div className="doc_tabs">
                  <small
                    className="doc_title_tab"
                    onClick={() => navigate("/office")}
                  >
                    home
                  </small>
                  <small className="doc_title_tab" onClick={save}>
                    save
                  </small>
                  <small className="doc_title_tab">edit</small>
                </div>
              </div>
            </div>
            <div className="doc_left">
              <button>
                <AiOutlinePlus />
              </button>
              <button onClick={() => setReadOnly(() => !isReadOnly)}>
                {isReadOnly ? (
                  <IoLockClosedOutline title="read only" />
                ) : (
                  <IoLockOpenOutline title="read & write" />
                )}
              </button>
            </div>
          </div>
          <div className="document_body_content">
            <Summary />
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange}
              mention={{
                separator: " ",
                trigger: "@",
                suggestions: formattedSuggestions,
              }}
              // toolbar={{
              //   options: [
              //     "inline",
              //     "blockType",
              //     "fontSize",
              //     "fontFamily",
              //     "list",
              //     "textAlign",
              //     "link",
              //     "embedded",
              //     "emoji",
              //     "image",
              //   ],
              //   inline: {
              //     options: ["bold", "italic", "underline", "strikethrough"],
              //   },
              //   list: {
              //     options: ["unordered", "ordered", "indent", "outdent"],
              //   },
              //   textAlign: { options: ["left", "center", "right", "justify"] },
              //   embedded: {
              //     defaultSize: { height: "auto", width: "100%" },
              //   },
              // }}
              readOnly={isReadOnly}
            />
          </div>
        </>
      ) : (
        <OfficeLoader />
      )}
    </div>
  );
};

export default Document;
