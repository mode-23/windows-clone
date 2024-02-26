import React, {useRef, useEffect} from 'react'

const MsgTo = ({item}) => {
  let r = /^(ftp|http|https):\/\/[^ "]+$/;
     const ref = useRef()
     useEffect(() => {
          ref?.current?.scrollIntoView({behavior: "smooth"})
        }, [item])
        console.log(item?.publishedAt?.seconds / 86400000);
  return (
    <div className='msgBox_wt msgBox_wt_to' ref={ref}>
    <div className="msg_inside_to msg_inside">
    <p>
    {r.test(item?.text) == true ?
                      <a href={item?.text} target='_blank'>{item?.text}</a> 
                      :
                      item?.text?.split(' ')?.map((word) => {
                        if(r.test(word) == true){
                          return <><a href={word} target='_blank'>{word}</a>{' '}</>
                        }else{
                          return word + ' '
                        }
                      })
     }
     </p>
    <span>{new Date(item?.publishedAt?.seconds * 1000).getHours()} : {new Date(item?.publishedAt?.seconds * 1000).getMinutes()}</span>
    </div>
    </div>
  )
}

export default MsgTo