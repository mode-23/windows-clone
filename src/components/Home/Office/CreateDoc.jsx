import React, {useEffect, useRef} from 'react'
import { motion } from 'framer-motion'
const CreateDoc = ({setDocument , document_1 , createNewDocument , isOpen, user}) => {
     let menuRef = useRef();
     useEffect(() => {
       let clickOutside = (e) => {
         if(!menuRef.current.contains(e.target)){
           isOpen(false)
         }
       }
       document.addEventListener('mousedown', clickOutside)
       return () => {
       document.removeEventListener('mousedown', clickOutside)
       };
     })
  return (
    <motion.div className='create_doc_overlay'  initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} >
     <div className="create_doc" ref={menuRef}>
          <span>Enter name of document</span>
          <input type="text" onChange={(e) => setDocument({...document_1 , file_name: e.target.value , user:  user?.uid}) } value={document_1.file_name} />
          <div className="btns">
               <button className='cancelBtn' onClick={() => isOpen(false)}>cancel</button>
               <button className='createBtn' onClick={createNewDocument} disabled={document_1.file_name == ''}>create</button>
          </div>
     </div>
    </motion.div>
  )
}

export default CreateDoc