import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {deezerFromApi} from './DeezerAPI'
import SongBox from './SongBox'
import { collection, doc, onSnapshot, orderBy, serverTimestamp, setDoc, where, query as queryDB } from 'firebase/firestore'
import { db } from '../../firebase/Firebase'
import { userContext } from '../../Context/UserContext'
import { RiSearchLine } from 'react-icons/ri'
import RecentSearchBox from './RecentSearchBox'

const WatchSearch = () => {
     const { user } = useContext(userContext);
     const {query} = useParams()
     const [data, setData] = useState([])
     const [searchData, setSearchData] = useState([])
     const [searchValue, setSearchValue] = useState("");
     const [loading, isLoading] = useState(true);
     const navigate = useNavigate();
     useEffect(() => {
          isLoading(false)
          deezerFromApi(`search?q=${query}`)
          .then((res) => {
               setData(res)
               isLoading(true)
          })
     }, [query])
     const addNewSearch = async () => {
          if (user?.uid) {
            const res = await setDoc(doc(db, "songSearched", searchValue), {
              searchValue,
              publishedAt: serverTimestamp(),
              userId: user?.uid,
            });
            console.log(res);
          }
        }
        useEffect(() => {
          if(user?.uid){
          const refrence = collection(db, "songSearched");
          const q = queryDB(refrence, where("userId" , "==" , user?.uid), orderBy("publishedAt", "desc"));
          const unsub = onSnapshot(q , (snapShot) => {
            let list = [];
            snapShot.docs.forEach(doc => {
              list.push({...doc.data()})
              setSearchData(list)
          });
          if(!list.length)  setSearchData([])
          },
          (error) => {
            console.log(error);
          }
          );
          return () => {
            unsub();
          }
     }
      }, [query, user])
        useEffect(() => {
          const search = async (e) => {
            if (e.key === "Enter" && searchValue) {
              addNewSearch();
              navigate(`/watch/query/${searchValue}`);
               setSearchValue("")
            }
          };
          document.addEventListener("keyup", search);
          return () => {
            document.removeEventListener("keyup", search);
          };
        }, [searchValue]);

  return (
    <div className='watch_search'>
     <div className="watch_search_tab">
     <header className="watch_home_header">
        <div className="search_watch_home">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
          <RiSearchLine />
        </div>
      </header>
     </div>
     <div className="watch_search_tab_title">
      <div className="stt_tab">
      <h1 className='search_ttl'>Recent searches</h1>
      <Link to={'/watch/recent_searches'}>Show more</Link>
      </div>
      <div className="watch_search_tab_searches">
      {searchData?.slice(0,4)?.map((item, index) => (
        <RecentSearchBox item={item} key={index} />
        ))}
      </div>
     </div>
     <h1 className='search_ttl'>Songs</h1>
     <div className="watch_search_container">
     {loading ? 
     <>
     {data?.data?.map(item => (
          <SongBox key={item?.id} item={item} />
     ))}
     </>
     :
     <>
     <h2>loading...</h2>
     </>
     }
     </div>

    </div>
  )
}

export default WatchSearch