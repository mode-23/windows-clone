import React, {useRef, useEffect} from 'react'

const MsgFrom = ({item}) => {
  let r = /^(ftp|http|https):\/\/[^ "]+$/;
  const ref = useRef()
     useEffect(() => {
          ref?.current?.scrollIntoView({behavior: "smooth"})
        }, [item])
  return (
    <div className='msgBox_wt msgBox_wt_from' ref={ref}>
     <div className="msg_inside_from msg_inside">
      <p>
      {r.test(item?.text) == true ?
                      <a href={item?.text} target='_blank'>{item?.text}</a> 
                      :
                      item?.text?.split(' ')?.map((word, index) => {
                        if(r.test(word) == true){
                          return <><a href={word} target='_blank'>{word}</a>{' '}</>
                        }else{
                          return word + ' '
                        }
                      })
     }
      </p>
     <span>{new Date(item?.publishedAt?.seconds * 1000).getHours()} : {new Date(item?.publishedAt?.seconds * 1000).getMinutes() < 9 ? "0"+ new Date(item?.publishedAt?.seconds * 1000).getMinutes()  : new Date(item?.publishedAt?.seconds * 1000).getMinutes() }</span>
     </div>
     </div>
  )
}

export default MsgFrom