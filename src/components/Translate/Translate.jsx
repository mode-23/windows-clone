import React, { useState, useEffect, useContext } from "react";
import "./translate.css";
import { userContext } from "../../Context/UserContext";
import { IoCloseOutline, IoCloseSharp } from "react-icons/io5";
import { GoArrowSwitch } from "react-icons/go";
import { FiChevronDown } from "react-icons/fi";
import { BsDash, BsFillSquareFill, BsStar, BsStarFill } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import translateIcon from "../Home/Home_assest/Google_Translate_logo.svg.png";
import GoogleMenu from "../Google_Components/GoogleMenu";
import UserMenu from "../Google_Components/UserMenu";
import { useDebounce } from "use-debounce";
import axios from "axios";
import { BiSolidError, BiSolidVolumeFull } from "react-icons/bi";
import LanguagePicker from "./LanguagePicker";
import BottomTranslateMenu from "./BottomTranslateMenu";
import { VscPrimitiveSquare } from "react-icons/vsc";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";

const Translate = () => {
  const {user} = useContext(userContext)
  const [wideTab, isWideTab] = useState(true)
  const [tabbed, isTabbed] = useState(false)
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [translation, setTranslation] = useState('');
  const [open, isOpen] = useState(false);
  const [lang, setLang] = useState('');
  const [langpair, setLangPair] = useState({ firstLang: "en", lastLang: "fr" });
  const [value] = useDebounce(text, 250);
  const navigate = useNavigate()
  useEffect(() => {
    if (value) {
      axios
        .get(
          `https://api.mymemory.translated.net/get?q=${value}&langpair=${
            langpair.firstLang + "|" + langpair.lastLang
          }`
        )
        .then((res) => {
          setData(res.data);
          setTranslation(res.data.responseData.translatedText)
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setData([]);
    }
  }, [value , langpair]);

  const [utterance, setUtterance] = useState(new SpeechSynthesisUtterance());
  useEffect(() => {
    if (text) {
      setUtterance(new SpeechSynthesisUtterance(text));
    }
  }, [text]);

  const speech = () => {
    if (text) {
      speechSynthesis.speak(utterance);
    }
  };
  const cancel = () => {
    speechSynthesis.pause();
  };
  const resume = () => {
    speechSynthesis.resume();
  };
  const array_lang = [
    {
      name: 'English',
      code: 'en',
    },
    {
      name: 'French',
      code: 'fr',
    },
    {
      name: 'Arabic',
      code: 'ar',
    },
  ]
  const handleTabSize = () => {
    if(wideTab){
      return 'tab translate wide'
    }else if(tabbed){
      return 'tab translate close'
    }else{
      return 'tab translate'
    }
  }
  // useEffect(() => {
  //   const submitHistory = async () => {
  //     const res = await setDoc(doc(db, "translateHistory", item.id), {
  //       ...item,
  //       publishedAt: serverTimestamp(),
  //       user: user?.uid,
  //        translation,
  //        input: text,
  //     });
  //     console.log(res);
  //   }
  //   let timeOut;
  //   if(value && translation && user?.uid){
  //     timeOut = setTimeout(() => {
  //       submitHistory()
  //     }, 1000);
  //   }
  //   clearTimeout(timeOut)
  // }, [data, text , langpair])
    const saveTranslation = async() => {
      if(text && translation && user?.uid){
        let uniqueId = `${user?.uid}-${langpair.firstLang}-${langpair.lastLang}-${text}-${translation}`
        const res = await setDoc(doc(db, "translateSaved", uniqueId), {
          id: uniqueId,
          publishedAt: serverTimestamp(),
          user: user?.uid,
          translation,
          input: text,
          translations: {
            firstLang: langpair.firstLang,
            lastLang: langpair.lastLang,
          },
        });
        console.log(res);
      }
    }
    const switchLanguage = () => {
      setLangPair({firstLang: langpair.lastLang, lastLang: langpair.firstLang})
    }
  return (
    <section className={handleTabSize()}>
      <div className="tab_title translate_tab">
      <div className="tab_utils">
          <div className="tab_util_icon" onClick={() => isTabbed(!tabbed)}><BsDash /></div>
          <div className="tab_util_icon" onClick={() => isWideTab(!wideTab)}><VscPrimitiveSquare /></div>
          <div className="tab_util_icon close" onClick={() => navigate('/')}><IoCloseSharp /></div>
        </div>
      </div>
      <header className="translate_header">
        <NavLink to={"/translate"}>
          <img
            src={translateIcon}
            alt="translate icon"
            className="translate_icon"
          />
        </NavLink>
        <div className="df">
          <GoogleMenu />
          <UserMenu />
        </div>
      </header>
      <main className="translate_body">
        <div className="translate_content">
          {open && <LanguagePicker lang={lang} isOpen={isOpen} setLangPair={setLangPair} langpair={langpair} />}
          <button className="switch_lang_btn" onClick={switchLanguage}>
            <GoArrowSwitch />
          </button>
          <div className="translate_box">
            <header className="translate_box_header">
              <ul>
                {array_lang.map(item => (
                <li 
                className={item.code === langpair.firstLang ? "active" : ''} 
                onClick={() => {
                  if(item.code === langpair.lastLang){
                    switchLanguage()
                  }else{
                    setLangPair({...langpair, firstLang: item.code})
                  }
                }} 
                key={item.code}
                >
                  {item.name}
                  </li>
                ))}
                <li onClick={() => {
                  isOpen(prev => !prev)
                  setLang('firstLang')
                  }}>
                  <FiChevronDown />
                </li>
              </ul>
            </header>
            <div className="translate_box_body">
              {text && (
                <IoCloseOutline
                  className="delete_txt"
                  onClick={() => setText("")}
                />
              )}
              <textarea
                spellCheck={false}
                onChange={(e) => {
                  setText(e.target.value)
                }}
                value={text}
                className={langpair.firstLang === "ar" ? "rtl" : "ltr"}
              ></textarea>
              <div className="translate_btm">
                <div className="translate_controls">
                    <div className={!value ? "icon_1 icon_3 disabled" : "icon_1 icon_3"} onClick={speech}>
                      {speechSynthesis.speaking ? (
                        <BsFillSquareFill />
                      ) : (
                        <BiSolidVolumeFull />
                      )}
                    </div>
                  <span className="word_counter">{value.length} / 5000</span>
                </div>
              </div>
            </div>
          </div>
          <div className="translate_box translate_box2">
            <header className="translate_box_header">
              <ul>
                {array_lang.map(item => (
                <li 
                className={item.code === langpair.lastLang ? "active" : ''} 
                onClick={() => {
                  if(item.code === langpair.firstLang){
                    switchLanguage()
                  }else{
                    setLangPair({...langpair, lastLang: item.code})
                  }
                }} 
                key={item.code}
                >
                  {item.name}
                  </li>
                ))}
                <li onClick={() => {
                  isOpen(prev => !prev)
                  setLang('lastLang')
                  }}>
                  <FiChevronDown />
                </li>
              </ul>
            </header>
            <div className="translate_box_body">
              {data?.responseStatus == "403" ?
                <div className="error_text">
                  <BiSolidError />
                  <p>{translation}</p>
                </div>
              :
              <>
              {translation && value && (
                <BsStar className="delete_txt" onClick={saveTranslation} />
              )}
              <textarea
              disabled
              spellCheck={false}
              value={value ? translation : ""}
              className={langpair.lastLang === "ar" ? "rtl" : "ltr"}
              placeholder="Translation"
            ></textarea>
            </>
              }
            </div>
          </div>
        </div>
          <BottomTranslateMenu />
      </main>
    </section>
  );
};

export default Translate;
