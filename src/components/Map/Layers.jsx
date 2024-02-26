import React, { useState } from 'react'
import {FaLayerGroup} from 'react-icons/fa'
import regular from './icons/regular.png'
import terrain from './icons/ic_terrain-2x.png'
import satellite from './icons/ic_traffic-2x.png'
const Layers = () => {
  const [open, isOpen] = useState(false)
  const map_skins = [
    {
      name: 'regular',
      img: regular,
    },
    {
      name: 'terrain',
      img: terrain,
    },
    {
      name: 'satellite',
      img: satellite,
    },
  ]
  const [active, isActive] = useState(map_skins[0])
  return (
    <div className='map_layers'>
     <div className="main_layer" onClick={() => isOpen(!open)}>
          <div className='df layer_name'>
               <FaLayerGroup />
               <p>layers</p>
          </div>
          <img src={active.img} alt="main map" />
     </div>
     {open && (
     <div className="map_layers_skins">
      {map_skins.map((item, index) => (
     <div className="map_layers_skin" key={index} onClick={() => isActive(item)}>
     <img src={item.img} alt="main map" />
     <p>{item.name}</p>
     </div>
      ))}
    </div>
     )}
    </div>
  )
}

export default Layers