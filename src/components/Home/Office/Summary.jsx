import React, { useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { GoPlus } from 'react-icons/go'
import { MdFormatListBulleted } from 'react-icons/md'

const Summary = () => {
  const [open, isOpen] = useState(false)
  return (
     <div className="document_summary">
          <div className="goBack" onClick={() => isOpen(!open)}>
               {open ? 
               <MdFormatListBulleted />
               :
               <BsArrowLeft />
               }
          </div>
          {!open && (
     <div className="summary_box">
          <span>Summary</span>
          <input type="text" />
          <div className="plus_sum">
          <GoPlus />
          </div>
     </div>
          )}
   </div>
  )
}

export default Summary