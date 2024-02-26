import './office.css'
import './responsiveOffice.css'
import React, { useEffect, useState } from 'react'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { doc, setDoc , onSnapshot, where, query, collection, serverTimestamp , orderBy } from "firebase/firestore"; 
import { db } from '../../../firebase/Firebase';
import {v4} from 'uuid'
import { useNavigate } from 'react-router-dom';
import office_pic from '../Home_assest/office.png'
import file from '../Home_assest/file.png'
import plus from '../Home_assest/plus.png'
import { BsDash } from 'react-icons/bs'
import { IoCloseSharp } from 'react-icons/io5'
import { VscPrimitiveSquare } from 'react-icons/vsc'
import { ImTable2 } from 'react-icons/im'
import { FaList } from 'react-icons/fa'
import { MdSortByAlpha } from 'react-icons/md'
import CreateDoc from './CreateDoc';
import Grid from './Grid';
import List from './List';
import { HiOutlineSearch } from 'react-icons/hi';
import { AnimatePresence } from 'framer-motion';
import OfficeLoader from './OfficeLoader';
import OfficeSearchDrop from './OfficeSearchDrop';
import GoogleMenu from '../../Google_Components/GoogleMenu';
import { useDebounce } from 'use-debounce';
import UserMenu from '../../Google_Components/UserMenu';

const Office = ({user}) => {
  const navigate = useNavigate()
  useEffect(() => {
    if(!user?.uid) {
      navigate('/')
    }
  }, [user])
  const [document, setDocument] = useState({
    file_name : '',
    id: v4(),
    type: 'document',
    user : user?.uid
  })

          const [documents, setDocuments] = useState([])
          const [wideTab, isWideTab] = useState(true)
          const [tabbed, isTabbed] = useState(false)
          const [open, isOpen] = useState(false)
          const [loading, setLoading] = useState(true)
          const [orderByArr] = useState([
          {
            name: 'Recently created',
          },
          {
            name: 'Last modified',
          },
          {
            name: 'Document title',
          },
        ])
        const [orderByElement, setOrderBy] = useState('empty')
        const [tab, settab] = useState(false)
        const [display, setDisplay] = useState(false)
        const [searchValue, setSearchValue] = useState('')
        const [searchTerm] = useDebounce(searchValue, 300);
        useEffect(() => {
          setLoading(false)
          if(user?.email){
          const refrence = collection(db, "asset");
          let qs;
          if(orderByElement == 'Recently created'){
            qs = query(refrence, where("user", "==", user?.uid), where("type", "==", "document") , orderBy("publishedAt", "desc"));
          }else if(orderByElement == 'Last modified'){
            qs = query(refrence, where("user", "==", user?.uid), where("type", "==", "document") , orderBy("lastModified", "desc"));
          }else if(orderByElement == "Document title"){
            qs = query(refrence, where("user", "==", user?.uid), where("type", "==", "document") , orderBy("file_name", "asc"));
          }else{
            qs = query(refrence, where("user", "==", user?.uid), where("type", "==", "document") );
          }
          const unsub = onSnapshot(qs , (snapShot) => {
            let list = [];
            snapShot.docs.forEach(doc => {
              list.push({...doc.data()})
              setDocuments(list)
          });
          setLoading(true)
          },
          (error) => {
            console.log(error);
          }
          );
          return () => {
            unsub();
          }
        }
        }, [user , display , orderByElement]);
        
        const handleTabSize = () => {
          if(wideTab){
            return 'tab office_tab wide'
          }else if(tabbed){
            return 'tab office_tab close'
          }else{
            return 'tab office_tab'
          }
        }
    //  const [editorState, seteditorState] = useState(EditorState.createEmpty())

    //  useEffect(() => {
    //       const unsub = onSnapshot(doc(db, "test", 'bruh'), (doc) => {
    //            if (doc.data()?.editorState) {
    //             seteditorState(
    //               EditorState.createWithContent(
    //                 convertFromRaw(doc.data()?.editorState)
    //               )
    //             );
    //           }
    //     });
    //       return () => {
    //         unsub();
    //       }
    //   }, [])


    //     const onEditorStateChange = async (editorState) => {
    //       seteditorState(editorState)
    //     }

    //     const save = async() => {
    //       const res = await setDoc(doc(db, "test", 'bruh'), {
    //         editorState: convertToRaw(editorState.getCurrentContent()),
    //    }, {
    //              merge: true,
    //       });
    //     }

        const createNewDocument = async () => {
          if(user?.uid){
            if(document.file_name != ''){
              const res = await setDoc(doc(db, "asset", document.id), {
                ...document,
                publishedAt: serverTimestamp(),
              });
              console.log(res);
              navigate('/office/'+ document.id)
            }
          }
        }
  return (
    <div className={handleTabSize()} >
      <AnimatePresence mode='wait'>
    {open && (
        <CreateDoc user={user} setDocument={setDocument} document_1={document} createNewDocument={createNewDocument} isOpen={isOpen} />
      )}
      </AnimatePresence>
      <div className="tab_title office_tab_title" onDoubleClick={() => isWideTab(!wideTab)}>
        <div className="df">
          <img src={office_pic} alt="doc img" />
          <div className="title-sm">
            Office
          </div>
        </div>
        <div className="tab_utils tab_utils2">
          <div className="tab_util_icon" onClick={() => isTabbed(!tabbed)}><BsDash /></div>
          <div className="tab_util_icon" onClick={() => isWideTab(!wideTab)}><VscPrimitiveSquare /></div>
          <div className="tab_util_icon close" onClick={() => navigate('/')} ><IoCloseSharp /></div>
        </div>
      </div>
      {loading ?
      <div className="office_tab_body_holder">
        <div className="office_tab_body_holder_header">
          <div className="df">
          <img src={file} alt="file" className='main_office_img' />
            <span className='span_s2'>Docs</span>
          </div>
          <div className={searchTerm != '' ? "search_doc active" : "search_doc"}>
            <HiOutlineSearch className='srch_icon' />
            <input type="text" placeholder='Search' onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
            <AnimatePresence mode='wait'>
            {searchTerm != ''  && (
            <OfficeSearchDrop documents={documents} searchValue={searchTerm} />
            )}
            </AnimatePresence>
          </div>
          <div className='df'>
          <GoogleMenu />
          <UserMenu />
          </div>
        </div>
      <div className="office_tab_body">
        <h5>
          Start a new document
          </h5>
        <div className="img_plus" onClick={() => isOpen(true)}>
        <img src={plus} alt="plus icon" className='blank' />
        </div>
        <h5>Blank</h5>
      </div>
      <div className="office_tab_body office_tab_body_2">
        <h5 className='office_tab_menu'>
          Recent documents
          <div className="df">
            <div className="icon_holder">
            <div className="icon" onClick={() => setDisplay(!display)} title={display ? 'Grid view': 'List view'}>
            {display ? 
              <ImTable2 />
              :
              <FaList />
              }

              </div>
            </div>
            <div className="icon_holder">
            <div className={tab ? "icon active" : "icon"} onClick={() => settab(!tab)}><MdSortByAlpha /></div>
            {tab  && (
            <div className="drop_down">
            <ul>
              {orderByArr.map((item, index) => (
              <li key={index} className={orderByElement == item.name ? 'active' : ''} onClick={() => setOrderBy(item.name)}>{item.name}</li>
              ))}
            </ul>
          </div>
            )}
            </div>
          </div>
          </h5>
          {loading ?
                <>
          {display ? 
            <List documents={documents} navigate={navigate} />
               :
            <Grid documents={documents} navigate={navigate}/>
          }
                </>
                :
                <></>
              }
      </div>
      </div>
      :
      <OfficeLoader />
    }
    </div>
  )
}

export default Office