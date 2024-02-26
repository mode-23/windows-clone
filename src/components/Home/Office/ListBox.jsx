import React, {useRef , useState , useEffect} from 'react'
import file from '../Home_assest/file.png'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { MdTextFields } from 'react-icons/md'
import { BsTrash } from 'react-icons/bs'
import { VscLinkExternal } from 'react-icons/vsc'

const ListBox = ({item , navigate}) => {
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
     <div className="list_view list_row" ref={menuRef}>
     <span className='df'>
          <img src={file} alt="file" />
          <h4>{item?.file_name}</h4>
     </span>
     <span><h5>{new Date(item?.publishedAt?.seconds *1000 ).toLocaleDateString('en-GB')}</h5></span>
     <span><h5>{item?.lastModified ? new Date(item?.lastModified?.seconds *1000 ).toLocaleDateString('en-GB') : '-'}</h5></span>
     <span>
          <HiOutlineDotsVertical onClick={() => isOpen(!open)} />
          {open && (
               <div className='drop_list'>
                    <ul>
                         <li className='df' onClick={() => navigate('/office/' + item?.id)}><VscLinkExternal />Open</li>
                         <li className='df'><MdTextFields /> Rename</li>
                         <li className='df'><BsTrash /> Remove</li>
                    </ul>
               </div>
          )}
     </span>
     </div>
  )
}

export default ListBox