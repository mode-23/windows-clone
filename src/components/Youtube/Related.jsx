import React from 'react'
import RelatedVidBox from './RelatedVidBox'
import RelatedPlayListBox from './RelatedPlayListBox'

const Related = ({relatedData, loading2}) => {

  return (
     <div className="video_details_right">
           {relatedData?.map((item, index) => (
               <React.Fragment key={index}>
                    {item?.type == "video" && <RelatedVidBox item={item} />}
                    {item?.type == "playlist" && <RelatedPlayListBox item={item} />}
               </React.Fragment>
           ))}
     </div>
  )

}

export default Related