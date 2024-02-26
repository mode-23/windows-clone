import React from 'react'
import {PiSoundcloudLogoFill , PiBroadcastFill} from 'react-icons/pi'
import {AiFillHome} from 'react-icons/ai'
import {MdExplore} from 'react-icons/md'
import { NavLink } from 'react-router-dom'
const WatchNavbar = () => {
  return (
    <nav className='watch_nav'>
      <div className="title_nav df">
      <PiSoundcloudLogoFill />
      <h3>soundnote</h3>
      </div>
      <div className="watch_nav_tranch">
        <ul className='drop_nav_1'>
          <li><NavLink to={'/watch'} className={'df'} end><AiFillHome /> Home </NavLink></li>
          <li><NavLink to={'/watch/browse'} className={'df'} end><MdExplore /> Browse </NavLink></li>
          <li><NavLink to={'/watch/radio'} className={'df'} end><PiBroadcastFill /> Radio </NavLink></li>
        </ul>
        <h4>your library</h4>
        <ul className='drop_nav_2'>
          <li><NavLink to={'/foryou'} className={'df'}>Made for you</NavLink></li>
          <li><NavLink to={'/foryou'} className={'df'}>Recently played</NavLink></li>
          <li><NavLink to={'/foryou'} className={'df'}>Liked songs</NavLink></li>
          <li><NavLink to={'/foryou'} className={'df'}>Albums</NavLink></li>
          <li><NavLink to={'/foryou'} className={'df'}>Artists</NavLink></li>
        </ul>
        <h4>playlists</h4>
        <ul className='drop_nav_3'>
        <li><NavLink to={'/foryou'} className={'df'}>Made for you</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}

export default WatchNavbar