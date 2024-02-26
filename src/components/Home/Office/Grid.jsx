import React from 'react'
import GridBox from './GridBox'

const Grid = ({documents , navigate }) => {
  return (
     <div className="office_documents">
     {documents?.map((item , index) => (
          <GridBox item={item} key={index} navigate={navigate} />
     ))}
     </div>
  )
}

export default Grid