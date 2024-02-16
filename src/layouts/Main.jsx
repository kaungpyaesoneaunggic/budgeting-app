import React from 'react'
import { fetchData } from '../helper'
import { Outlet, useLoaderData } from 'react-router-dom'; //router dom helper function

//assets
import wave from '../assets/wave.svg'

//components
import Nav from '../components/Nav';

export function mainLoader(){
  const userName= fetchData('userName');
  return {userName}
}

export default function Main() {
  const {userName}=useLoaderData(); 
  return (
    
    <div>
      <div className='layout'>
      <Nav userName={userName}/>
      <main>
        <Outlet/>
      </main>
      <img src={wave} alt=''/>
      </div>
    </div>
  )
}
