import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Outlet,
} from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import {
  fetchSignInMethodsForEmail,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "./firebase/Firebase";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import Home from "./components/Home/Home";
import BottomBar from "./components/Home/BottomBar";
import FileExplorer from "./components/Folder/FileExplorer";
import Login from "./components/Log/Login";
import Settings from "./components/Settings/Settings";
import Office from "./components/Home/Office/Office";
import Document from "./components/Home/Office/Document";
import Gmail from "./components/Mail/Gmail";
import GmailOutlet from "./components/Mail/GmailOutlet";
import GmailDetail from "./components/Mail/GmailDetail";
import Account from "./components/Settings/Account";
import Appearance from "./components/Settings/Appearance";
import Font from "./components/Settings/Font";
import Applications from "./components/Settings/Applications";
import Details from "./components/Settings/Details";
import Privacy from "./components/Settings/Privacy";
import Starred from "./components/Mail/Starred";
import Important from "./components/Mail/Important";
import Sent from "./components/Mail/Sent";
import Bin from "./components/Mail/Bin";
import Whatsapp from "./components/Whatsapp/Whatsapp";
import Todo from "./components/Todo/Todo";
import Gallery from "./components/Gallery/Gallery";
import Youtube from "./components/Youtube/Youtube";
import VideoDetails from "./components/Youtube/VideoDetails";
import WatchLater from "./components/Youtube/WatchLater";
import SavedPlaylist from "./components/Youtube/SavedPlaylist";
import Feed from "./components/Youtube/Feed";
import Search from "./components/Youtube/Search";
import Channel from "./components/Youtube/Channel";
import Trending from "./components/Youtube/Trending";
import Playlist from "./components/Youtube/Playlist";
import { userContext } from "./Context/UserContext";
import WhatsappCreate from "./components/Whatsapp/WhatsappCreate";
import WhatsappChat from "./components/Whatsapp/WhatsappChat";
import WhatsappArchive from "./components/Whatsapp/WhatsappArchive";
import WhatsappSettings from "./components/Whatsapp/WhatsappSettings";
import WtError from "./components/Whatsapp/WtError";
import Amazon from "./components/Shop/Amazon";
import AmazonHome from "./components/Shop/AmazonHome";
import Watch from "./components/Watch/Watch";
import Map from "./components/Map/Map";
import Calendar from "./components/Calendar/Calendar";
import EventEdit from "./components/Calendar/EventEdit";
import MainCalendar from "./components/Calendar/MainCalendar";
import Translate from "./components/Translate/Translate";
import Forms from "./components/Forms/Forms";
import Classroom from "./components/Classroom/Classroom";
import WatchBody from "./components/Watch/WatchBody";
import WatchSearch from "./components/Watch/WatchSearch";
import CreateYoutube from "./components/Youtube/CreateYoutube";
import Artist from "./components/Watch/Artist";
import RecentSearches from "./components/Watch/RecentSearches";
import Album from "./components/Watch/Album";
import Track from "./components/Watch/Track";
import WatchPlaylist from "./components/Watch/WatchPlaylist";

function App() {
  const [user, setuser] = useState({});
  useEffect(() => {
    window.onbeforeunload = function () {
      if (user?.uid) {
        return "If you reload this page, you will be redirected to home page";
      }
    };
  });

  useMemo(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setuser(currentUser);
    });
  }, [user]);

  useEffect(() => {
    if (user?.uid) {
      const createUser = async () => {
        const res = await getDoc(doc(db, "user", user?.uid));
        try {
          if (!res.exists()) {
            await setDoc(doc(db, "user", user?.uid), {
              uid: user?.uid,
              displayName: "user-" + user?.uid?.slice(0, 10),
              email: user?.email,
              photoURL: user?.photoURL,
              userColor:
                "#" + Math.floor(Math.random() * 16777215).toString(16),
            });
          } else {
            console.log("exists!");
          }
        } catch (error) {
          console.log(error);
        }
      };
      user?.uid && createUser();
    }
  }, [user]);
  useEffect(() => {
    if (user?.email) {
      const handleUser = async () => {
        let signInMethods = await fetchSignInMethodsForEmail(auth, user?.email);
        if (signInMethods.length > 0) {
          if (user?.displayName == null) {
            updateProfile(auth.currentUser, {
              displayName: "user-" + user?.uid?.slice(0, 10),
            });
          }
        } else {
          console.log("doesn't exist");
          //user does not exist
        }
      };
      user?.email && handleUser();
    }
  }, [user]);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root setuser={setuser} user={user} />}>
        <Route path="/file-explorer" element={<FileExplorer user={user} />} />
        <Route path="/settings" element={<Settings user={user} />}>
          <Route index element={<Account />} />
          <Route path="account" element={<Account />} />
          <Route path="appearance" element={<Appearance />} />
          <Route path="font" element={<Font />} />
          <Route path="applications" element={<Applications />} />
          <Route path="details" element={<Details />} />
          <Route path="privacy" element={<Privacy />} />
        </Route>
        <Route path="/gmail" element={<GmailOutlet user={user} />}>
          <Route index element={<Gmail />} />
          <Route path=":id" element={<GmailDetail />} />
          <Route path="starred" element={<Starred />} />
          <Route path="important" element={<Important />} />
          <Route path="sent" element={<Sent />} />
          <Route path="bin" element={<Bin />} />
        </Route>
        <Route path="/youtube" element={<Youtube user={user} />}>
          <Route index element={<Feed />} />
          <Route path=":trend" element={<Trending />} />
          <Route path="watchlater" element={<WatchLater />} />
          <Route path="create" element={<CreateYoutube />} />
          <Route path="search/:searchTerm" element={<Search />} />
          <Route path="savedlist" element={<SavedPlaylist />} />
          <Route path="video/:id" element={<VideoDetails />} />
          <Route path="playlist/:list/:index" element={<Playlist />} />
          <Route path="channel/:channelId" element={<Channel />} />
        </Route>
        <Route path="/whatsapp" element={<Whatsapp user={user} />}>
          <Route index element={<WhatsappCreate />} />
          <Route path=":id" element={<WhatsappChat />} />
          <Route path="archive" element={<WhatsappArchive />} />
          <Route path="settings" element={<WhatsappSettings />} />
          <Route path="error" element={<WtError />} />
        </Route>
        <Route path="/amazon" element={<Amazon />}>
          <Route index element={<AmazonHome />} />
        </Route>
        <Route path="/watch" element={<Watch />}>
          <Route index element={<WatchBody />} />
          <Route path="query/:query" element={<WatchSearch />} />
          <Route path="artist/:id" element={<Artist />} />
          <Route path="album/:id" element={<Album />} />
          <Route path="track/:id" element={<Track />} />
          <Route path="playlist/:id" element={<WatchPlaylist />} />
          <Route path="recent_searches" element={<RecentSearches />} />
        </Route>
        <Route path="/map" element={<Map />} />
        <Route path="/calendar" element={<Calendar />}>
          <Route index element={<MainCalendar />} />
          <Route path="eventedit/:id" element={<EventEdit />} />
        </Route>
        <Route path="/translate" element={<Translate />} />
        <Route path="/forms" element={<Forms />}></Route>
        <Route path="/classroom" element={<Classroom />} />
        <Route path="/todo" element={<Todo user={user} />} />
        <Route path="/office" element={<Office user={user} />} />
        <Route path="/gallery" element={<Gallery user={user} />} />
        <Route path="/office/:id" element={<Document user={user} />} />
      </Route>
    )
  );
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
const Root = ({ user, setuser }) => {
  const [openWeather, isOpenWeather] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  function generateCodeQr(string) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${string}`;
  }
  const [userMainAuthor, setuserMainAuthor] = useState({});
  useEffect(() => {
    if (user?.uid) {
      const unsub = onSnapshot(doc(db, "user", user?.uid), (doc) => {
        setuserMainAuthor(doc.data());
      });
      return () => {
        unsub();
      };
    }
  }, [user]);
  return (
    <userContext.Provider
      value={{ userMainAuthor, user, setPlaylist, playlist, generateCodeQr }}
    >
      <Outlet />
      {user?.email ? (
        <>
          <Home openWeather={openWeather} isOpenWeather={isOpenWeather} />
          <BottomBar isOpenWeather={isOpenWeather} user={user} />
        </>
      ) : (
        <Login user={user} setuser={setuser} />
      )}
    </userContext.Provider>
  );
};
export default App;
