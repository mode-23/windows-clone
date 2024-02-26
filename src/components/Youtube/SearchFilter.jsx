import React, { useState } from 'react'
import { BsSliders2 } from 'react-icons/bs'
import { VscClose } from 'react-icons/vsc'

const SearchFilter = ({ filter , option , setOption , setTerm, term}) => {
     const [open, isOpen] = useState(false)
     const handleClick = (options, key) => {
          setTerm(key)
          if(options == "upload_date"){
               setOption({upload_date: key})
          }
          else if(options == "sort_by"){
               setOption({sort_by: key})
          }
          else if(options == "type"){
               setOption({ type: key})
          }
          else if(options == "duaration"){
               setOption({ duaration: key})
          }
          else if(options == "features"){
               setOption({features: key})
          }
     }
     const handleClose = () => {
          setTerm('')
          setOption({})
     }
  return (
    <div className='search_filter'>
     <button className={open ? "filterBtn df active" : "filterBtn df"} onClick={() => isOpen(!open)}>
     <BsSliders2 />
     filter
     </button>
     <div className={open ? 'wrapper open' : 'wrapper'}>
          <div className="inner">
               {filter.map(({name, array, options}) => (
                    <div key={name} className='filter_inner'>
                         <h5>{name}</h5>
                         {array.map(({key, value}) => (
                              <p key={key} className={term == key ? 'soft-txt active' : 'soft-txt'} > <span onClick={() => handleClick(options, key)}>{value} </span> {term == key && <VscClose onClick={handleClose} />}</p>
                         ))}
                    </div>
               ))}
          </div>
     </div>
    </div>
  )
}

export default SearchFilter