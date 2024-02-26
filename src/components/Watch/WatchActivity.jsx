import React from 'react'
import { BsDash } from 'react-icons/bs'
import { IoCloseSharp } from 'react-icons/io5'
import { VscPrimitiveSquare } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'

const WatchActivity = ({isTabbed, isWideTab , preview}) => {
  const navigate = useNavigate()

  return (
    <div className='watch_activity'>
      <div className="tab_title watch_activity_tab">
      <div className="tab_utils">
                    <div className="tab_util_icon" onClick={() => isTabbed(prev => !prev)}><BsDash /></div>
                    <div className="tab_util_icon" onClick={() => isWideTab(prev => !prev)}><VscPrimitiveSquare /></div>
                    <div className="tab_util_icon close" onClick={() => navigate('/')} ><IoCloseSharp /></div>
               </div>
      </div>
      {preview?.preview && (
      <div className="watch_activity_body_preview">
      <h4>{preview?.artist?.name}</h4>
      <div className="preview_tab_img" style={{backgroundImage: `url(${preview?.album?.cover_xl})`}} />
      <div className="tdf">
      <h3>{preview?.title}</h3>
      <p>{preview?.artist?.name}</p>
      </div>
      <div className="preview_tab_img" style={{backgroundImage: `url(${preview?.artist?.picture_xl})`}} />
    </div>
      )}
    </div>
  )
}

export default WatchActivity