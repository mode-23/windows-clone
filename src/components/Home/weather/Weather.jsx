import './weather.css'
import React, { useEffect , useState, useRef } from 'react'
import axios from "axios"
import { BsDash } from 'react-icons/bs'
import { IoCloseSharp } from 'react-icons/io5'
import { VscPrimitiveSquare } from 'react-icons/vsc'
import { TfiReload } from 'react-icons/tfi'
import sun from '../Home_assest/sun.png'
import hot from './weather_icons/sunset.png'
import sunny from './weather_icons/sun.png'
import cloudy from './weather_icons/cloud.png'
import snowy from './weather_icons/snowy.png'
import drop from './weather_icons/drop.png'
import { motion } from 'framer-motion'
import LoadingWeather from './LoadingWeather'

const Weather = ({isOpenWeather}) => {
     const slideRef = useRef()
     const [wideTab, isWideTab] = useState(false)
     const [tabbed, isTabbed] = useState(false)
     const [data, setData] = useState([])
     const [refresh, setRefresh] = useState(false)
     const [loaded, isLoaded] = useState(true)
     useEffect(() => {
      isLoaded(false)
     axios.get("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,visibility&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum&current_weather=true&timezone=auto", {params: {
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
     }})
     .then(res => {
        setData(res.data)
        isLoaded(true)
        console.log(res.data);
     })
     }, [refresh])
     let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
     function renderCurrentImage (temperature) {
      if(temperature?.toFixed(0) <= 2){
        return <img src={snowy} alt="weather icon" />
      }else if(temperature?.toFixed(0) > 2 && temperature?.toFixed(0) <= 10){
        return <img src={cloudy} alt="weather icon" />
      }else if(temperature?.toFixed(0) > 10 && temperature?.toFixed(0) <= 15){
        return <img src={hot} alt="weather icon" />
      }else if(temperature?.toFixed(0) > 15){
        return <img src={sunny} alt="weather icon" />
      }
     }
     function formatAMPM(date) {
      var hours = date.getHours();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; 
      var strTime = hours + ' ' + ampm;
      return strTime;
    }

    const [width, setwidth] = useState(0)
    useEffect(() => {
     setwidth(slideRef?.current?.scrollWidth - slideRef?.current?.offsetWidth)
    }, [loaded])

  return (
    <div className='tab weather'>
     <div className="tab_title weather_title" onDoubleClick={() => isWideTab(!wideTab)}>
      <div className="df">
        <img src={sun} alt="sun icon" />
      <div className="title-sm">Weather</div>
      </div>
        <div className="tab_utils">
          <div className="tab_util_icon" onClick={() => isTabbed(!tabbed)}><BsDash /></div>
          <div className="tab_util_icon" onClick={() => isWideTab(!wideTab)}><VscPrimitiveSquare /></div>
          <div className="tab_util_icon close" onClick={() => isOpenWeather(false)}><IoCloseSharp /></div>
        </div>
      </div>
      {loaded ? 
        <>
      <TfiReload  onClick={() => setRefresh(!refresh)} className='refresh_icon'/>
      <motion.div className="weather_top_menu" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} >
        <h3>{data?.timezone}</h3>
        <div className="df icon_wt">
          {renderCurrentImage(data?.current_weather?.temperature)}
        <h2>{data?.current_weather?.temperature?.toFixed(0)} <span>°C</span></h2>
        </div>
        <div className="more_weather_data df">
          <h4>wind {data?.current_weather?.windspeed} km/h</h4>
          <h4>latitude {data?.latitude?.toFixed(0)} ° S</h4>
          <h4>longitude {data?.longitude?.toFixed(0)} ° S</h4>
          <h4>elevation {data?.elevation?.toFixed(0)} m</h4>
        </div>
      </motion.div>
      <motion.div className="weather_mid_menu_holder" ref={slideRef} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} >
      <div className="weather_mid_menu">
        <h3>Daily</h3>
        <div className="weather_mid_menu_daily">
          {data?.daily?.time?.map((item , index) => (
              <div className="weather_mid_menu_daily_box" key={index} >
                  <p>{days[new Date(item).getDay()]} {new Date(item).getDate() }</p>
                  {renderCurrentImage(data?.daily?.temperature_2m_max?.[index])}
                  <div className="df">
                  <h3>{data?.daily?.temperature_2m_max?.[index]?.toFixed(0)}° </h3>
                  <span>{data?.daily?.temperature_2m_min?.[index]?.toFixed(0)}°</span>
                  </div>
                  {/* <h4>{data?.daily?.precipitation_sum?.[index]} mm</h4> */}
            </div>
          ))}
        </div>
      </div>
      <motion.div className="weather_mid_menu weather_mid_menu2" >
        <h3>Hourly</h3>
        <motion.div className="weather_mid_menu_hourly" drag='x' dragConstraints={{right: 0, left: -width}} >
          {data?.hourly?.time?.map((item , index) => (
              <motion.div className="weather_mid_menu_hourly_box weather_mid_menu_daily_box" key={index}>
                  {renderCurrentImage(data?.hourly?.temperature_2m?.[index])}
                  <h3>{data?.hourly?.temperature_2m?.[index]?.toFixed(0)}° </h3>
                  <div className="more_weather_hourly_assests">
                    <div className='df drop_rain_pos'>
                    <img src={drop} alt="drop rain possibilty icon" />
                      {data?.hourly?.precipitation_probability?.[index]?.toFixed(0)} %
                    </div>
                  </div>
                  <h2>{formatAMPM(new Date(item))}</h2>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      </motion.div>
      </>
      :
      <LoadingWeather />
      }

    </div>
  )
}

export default Weather