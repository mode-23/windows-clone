import React from 'react'
import file from '../Home_assest/file.png'
import { BsFolder } from 'react-icons/bs'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import ListBox from './ListBox'

const List = ({documents , navigate }) => {
  return (
    <div className='office_documents_list'>
     <div className="list_header list_view">
          <span><h4>Document</h4></span>
          <span><h4>Created at</h4></span>
          <span><h4>Last modified</h4></span>
          <span><BsFolder /></span>
     </div>
     {documents?.map((item , index) => (
          <ListBox item={item} key={index} navigate={navigate} />
     ))}
    </div>
  )
}

export default List