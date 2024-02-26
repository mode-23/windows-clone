import React, { useEffect, useState, useRef } from 'react'
import { fetchFromAPI } from './YoutubeApi'
import YtLoading from './YtLoading'
import {BsFilterLeft} from 'react-icons/bs'
import CommentBox from './CommentBox'

const Comments = ({id}) => {
  const [loading, isLoading] = useState(false)
  const [comment, setComment] = useState({})
  const commentRef = useRef(null)
  const [isVisibile, setisVisibile] = useState(false)
  const [open, isOpen] = useState(false)
  const [sort] = useState([
    {
      key: 'top',
      value: 'Top comments',
    },
    {
      key: 'newest',
      value: 'Newest comments',
    },
  ])
  const [sortState, setSortState] = useState(sort[0].key)
  const callbackfunction = (entries) => {
    const entry = entries[0];
    setisVisibile(entry?.isIntersecting)
  }
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  }
  useEffect(() => {
      const observer = new IntersectionObserver(callbackfunction, options)
      if(commentRef?.current) observer.observe(commentRef?.current)
      if(isVisibile && commentRef?.current) observer?.unobserve(commentRef?.current)
      return () => {
      if(commentRef?.current) observer?.unobserve(commentRef?.current)
      }
  }, [commentRef, options, isVisibile, id])
  useEffect(() => {
    if(isVisibile){
    isLoading(true)
    fetchFromAPI(`comments?id=${id}&sort_by=${sortState}`)
    .then((data) => 
    {
      setComment(data)
      isLoading(false)
    }
    )
  }
  }, [id , isVisibile , sortState])
  let menuRef = useRef();
  let windBtnRef = useRef();
  useEffect(() => {
    let clickOutside = (e) => {
        if(!menuRef?.current?.contains(e.target)){
          if(open){
            isOpen(false)
          }
        }
      if(windBtnRef?.current?.contains(e.target)){
          isOpen(true)
      }
    }
    document.addEventListener('click', clickOutside)
    return () => {
    document.removeEventListener('click', clickOutside)
    };
  }, [menuRef.current])
  return (
    <div ref={commentRef} className='comments_holder'>
      {loading ? 
      <YtLoading />
      :
      <>
      {isVisibile && (
      <div className='comments' >
        <div className="comments_tab">
          <h5>{comment?.commentsCount} Comments</h5>
          <div className="CommentFilterBtnHolder">
          <button className="df commentFilterBtn" onClick={() => isOpen(!open)} ref={windBtnRef}>
            <BsFilterLeft />
            Sort by
          </button>
          {open && (
          <div className="CommentfilterDropDown" ref={menuRef}>
          <ul>
            {sort.map(item => (
            <li className={sortState === item.key ? 'active' : 'nms'} key={item.key} onClick={() => setSortState(item.key)}>{item.value}</li>
            ))}
          </ul>
        </div>
          )}
          </div>
        </div>
        <div className="comments_body">
          {comment?.data?.map(item => (
            <CommentBox key={item?.commentId} item={item} />
          ))}
        </div>
      </div>
      )}
      </>
      }
    </div>
  )
}

export default Comments