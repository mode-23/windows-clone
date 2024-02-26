import React, { useState } from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import './map.css'
import { Icon } from 'leaflet';
import HeaderMap from './HeaderMap';
import Layers from './Layers';
import { useNavigate } from 'react-router-dom';
import { BsDash } from 'react-icons/bs';
import { VscPrimitiveSquare } from 'react-icons/vsc';
import { IoCloseSharp } from 'react-icons/io5';
import LeafletRoutingMachine from './LeafletRoutingMachine';
const Map = () => {
     const [position, setPosition] = useState(null)
     const [map, setMap] = useState(null);
        const center = {
          lat: 35.8245,
          lng: 10.6346,
        }
        const customIcon = new Icon({
          iconUrl: "./icons/placeholder.png",
          iconSize: [25, 25]
        });
        function LocationMarker() {
          const map = useMapEvents({
            click() {
              map.locate()
            },

            locationfound(e) {
              setPosition(e.latlng)
              // map.flyTo(e.latlng, map.getZoom())
              
            },
            
          })
          return position === null ? null : (
            <Marker position={position} icon={customIcon}  >
              <Popup>You are here!</Popup>
            </Marker>
          )

        }
          const handleMapCreated = (mapInstance) => {
            setMap(mapInstance);
          };
          const navigate = useNavigate()
          const [wideTab, isWideTab] = useState(true)
          const [tabbed, isTabbed] = useState(false)
          const handleTabSize = () => {
            if(wideTab){
              return 'tab map wide'
            }else if(tabbed){
              return 'tab map close'
            }else{
              return 'tab map'
            }
          }
          // useEffect(() => {
          //   map?.target?.on("click", function (e) {
          //     console.log(e);
          //   })
          // }, [map])
  return (
    <div className={handleTabSize()}>
      <div className="tab_title map_title">
      <div className="tab_utils">
          <div className="tab_util_icon" onClick={() => isTabbed(!tabbed)}><BsDash /></div>
          <div className="tab_util_icon" onClick={() => isWideTab(!wideTab)}><VscPrimitiveSquare /></div>
          <div className="tab_util_icon close" onClick={() => navigate('/')}><IoCloseSharp /></div>
        </div>
      </div>
      <div className="map_content">
      <HeaderMap map={map} />
      <Layers />
      <MapContainer
     center={center} 
     zoom={13}
     whenReady={handleMapCreated}
     // scrollWheelZoom={false} 
     >
      {/* OPEN STREEN MAPS TILES */}
      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}







      {/* WATERCOLOR CUSTOM TILES */}

      {/* <TileLayer
        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
      /> */}

      {/* GOOGLE MAPS TILES */}
      <TileLayer
        attribution="Google Maps"
        url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
        // url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" // satellite
        // url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" // terrain
        maxZoom={20}
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      />
      {/* <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {markers.map((marker) => (
          <Marker position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup> */}
      
       {/* <LocationMarker /> */}
       <LeafletRoutingMachine map={map}  />
    </MapContainer>
      </div>
    </div>
  )
}


export default Map