import React from 'react'
import {BsStar, BsStarFill, BsThreeDotsVertical} from 'react-icons/bs'
import {FiChevronRight} from 'react-icons/fi'
const HistoryBox = ({item}) => {
  return (
    <div className='historyBox'>
     <div className="historyBoxHeader">
     <div className="tab_tr df">{item?.translations?.firstLang} <FiChevronRight /> {item?.translations?.lastLang}</div>
     <div className="df htOptions">
          <div className="icon_1 icon_3">
          <BsStar />
          </div>
          <div className="icon_1 icon_3">
          <BsThreeDotsVertical />
          </div>
     </div>
     </div>
     <div className="historyBoxBody">
     <div className="historyBoxBodyPart">
          <p>{item?.input}</p>
     </div>
     <div className="historyBoxBodyPart">
     <p>{item?.translation}</p>
     </div>
     </div>
    </div>
  )
}

export default HistoryBox