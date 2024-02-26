import React from 'react'
import './asset.css'
import {IoMdClose} from 'react-icons/io'

const Valid_Message = ({directions, message, type , setcloseModal}) => {
if(type === 'sent'){
     return (
          <div style={directions} className='system_message'>{message} <div className="icon_1" onClick={() => setcloseModal(false)}><IoMdClose /></div></div>
        )
}else if(type === 'valid'){
     return(
          <div style={directions} className='system_message valid'>{message} <div className="icon_1" onClick={() => setcloseModal(false)}><IoMdClose /></div></div>
     )
}else if(type === 'error'){
     return(
          <div style={directions} className='system_message error'>{message} <div className="icon_1" onClick={() => setcloseModal(false)}><IoMdClose /></div></div>
     )
}else{
     return (
          <div style={directions} className='system_message'>{message} <div className="icon_1" onClick={() => setcloseModal(false)}><IoMdClose /></div></div>
        )
}
}

export default Valid_Message