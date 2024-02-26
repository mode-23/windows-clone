import React, {useState} from 'react'
import { BsDash } from 'react-icons/bs'
import {FcFolder} from 'react-icons/fc'
import {BiSearch} from 'react-icons/bi'
import {FiArrowUp, FiArrowLeft , FiArrowRight, FiChevronDown } from 'react-icons/fi'
import { IoCloseSharp } from 'react-icons/io5'
import { IoMdRefresh } from 'react-icons/io'
import { VscPrimitiveSquare } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
import './fileExplorer.css'
import pin from '../Home/Home_assest/pin.png'
import paste from '../Home/Home_assest/clipboard.png'
import copy from '../Home/Home_assest/documents.png'
import deleteFolder from '../Home/Home_assest/multiply.png'
import renameFolder from '../Home/Home_assest/rename.png'
import folder from '../Home/Home_assest/folder.png'
import file from '../Home/Home_assest/file1.png'
import display from '../Home/Home_assest/grid.png'


const FileExplorer = ({user}) => {
  const navigate = useNavigate()
  const [wideTab, isWideTab] = useState(false)
  const [tabbed, isTabbed] = useState(false)
  const handleTabSize = () => {
    if(wideTab){
      return 'tab fileExplorer wide'
    }else if(tabbed){
      return 'tab fileExplorer close'
    }else{
      return 'tab fileExplorer'
    }
  }
  return (
    <div className={handleTabSize()}>
      <div className="tab_title" onDoubleClick={() => isWideTab(!wideTab)}>
        <div className="df">
        <FcFolder />
        <div className="title-sm">File Explorer</div>
        </div>
        <div className="tab_utils">
          <div className="tab_util_icon" onClick={() => isTabbed(!tabbed)}><BsDash /></div>
          <div className="tab_util_icon" onClick={() => isWideTab(!wideTab)}><VscPrimitiveSquare /></div>
          <div className="tab_util_icon close" onClick={() => navigate('/')}><IoCloseSharp /></div>
        </div>
      </div>
      <header className="fileExplorerHeader">
        <div className="fileExplorerHeader_box_holder">
          <div className="fileExplorerHeader_box">
          <img src={pin} alt="pin" />
          <p className='title-sm'>Pin element</p>
          </div>
          <div className="fileExplorerHeader_box">
          <img src={copy} alt="pin" />
          <p className='title-sm'>Copy</p>
          </div>
          <div className="fileExplorerHeader_box">
          <img src={paste} alt="pin" />
          <p className='title-sm'>Paste</p>
          </div>
        </div>
        <div className="fileExplorerHeader_box_holder">
        <div className="fileExplorerHeader_box">
          <img src={deleteFolder} alt="pin" />
          <p className='title-sm'>Delete</p>
        </div>
        <div className="fileExplorerHeader_box">
          <img src={renameFolder} alt="pin" />
          <p className='title-sm'>Rename</p>
        </div>
        </div>
        <div className="fileExplorerHeader_box_holder">
        <div className="fileExplorerHeader_box">
          <img src={folder} alt="pin" />
          <p className='title-sm'>New Folder</p>
        </div>
        <div className="fileExplorerHeader_box">
          <img src={file} alt="pin" />
          <p className='title-sm'>New File</p>
        </div>
        </div>
        <div className="fileExplorerHeader_box_holder">
        <div className="fileExplorerHeader_box">
          <img src={display} alt="pin" />
          <p className='title-sm'>Display</p>
        </div>
        </div>
      </header>
      <nav className='fileExplorerNav'>
    <div className="fileExplorerNavPart">
      <FiArrowLeft />
      <FiArrowRight />
      <FiChevronDown />
      <FiArrowUp />
    </div>
    <div className="fileExplorerNavPart">
      <IoMdRefresh className='refreshSvg-file' />
    </div>
    <div className="fileExplorerNavPart">
      <BiSearch className='searchSvg-file' />
      <input type="text" placeholder='Search bar' />
    </div>
      </nav>
    </div>
  )
}

export default FileExplorer