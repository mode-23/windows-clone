import React, {useRef , useState , useEffect} from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { MdTextFields } from 'react-icons/md'
import { BsTrash } from 'react-icons/bs'
import { VscLinkExternal } from 'react-icons/vsc'
import file from '../Home_assest/file.png'

const GridBox = ({item , navigate}) => {
  const [open, isOpen] = useState(false)
  let menuRef = useRef();
  useEffect(() => {
     let clickOutside = (e) => {
       if(!menuRef.current.contains(e.target)){
         isOpen(false)
       }
     }
     document.addEventListener('click', clickOutside)
     return () => {
     document.removeEventListener('click', clickOutside)
     };
   })
  return (
     <div className="document_box" ref={menuRef}>
     <div className="clickAble_link" onClick={() => navigate('/office/' + item?.id)}/>
     <div className="document_box_details" >
       <span>{item?.file_name}</span>
       <div className="df">
         <img src={file} alt="file" />
         <small>Created at {new Date(item?.publishedAt?.seconds *1000 ).toLocaleDateString('en-GB')}</small>
       </div>
       <div className="opt">
       <HiOutlineDotsVertical onClick={() => isOpen(!open)} />
       {open && (
                    <div className='drop_list drop_list_top'>
                         <ul>
                              <li className='df' onClick={() => navigate('/office/' + item?.id)}><VscLinkExternal />Open</li>
                              <li className='df'><MdTextFields /> Rename</li>
                              <li className='df'><BsTrash /> Remove</li>
                         </ul>
                    </div>
       )}
       </div>
     </div>
   </div>
  )
}

export default GridBox