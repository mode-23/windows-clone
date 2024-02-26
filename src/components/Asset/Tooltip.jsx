import React from 'react'
import './asset.css'
const Tooltip = ({message, direction}) => {
    return (
      <div className={'tooltip ' + direction}>{message}</div>
    )
}

export default Tooltip