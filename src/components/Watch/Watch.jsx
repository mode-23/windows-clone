import React, { useState } from 'react'
import './watch.css'
import WatchNavbar from './WatchNavbar'
import WatchActivity from './WatchActivity'
import WatchPlayer from './WatchPlayer'
import { Outlet } from 'react-router-dom'

const Watch = () => {
  const [wideTab, isWideTab] = useState(true)
  const [tabbed, isTabbed] = useState(false)
  const [preview, setPreview] = useState({})
  const handleTabSize = () => {
    if(wideTab){
      return 'tab watch wide'
    }else if(tabbed){
      return 'tab watch close'
    }else{
      return 'tab watch'
    }
  }

  return (
    <div className={handleTabSize()}>
      <div className="watch_inner">
      <WatchNavbar />
      <Outlet  context={{ setPreview }}/>
     <WatchActivity isWideTab={isWideTab} isTabbed={isTabbed} setPreview={setPreview} preview={preview} />
      </div>
      {preview?.preview && (
      <WatchPlayer preview={preview} />
      )}
    </div>
  )
}

export default Watch