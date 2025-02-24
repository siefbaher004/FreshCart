import React from 'react'
import style from "./Layout.module.css"
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';


export default function Layout() {
  return (<>
    <Navbar/>
    <div className=' my-[3rem] lg:my-9 py-5 '> <Outlet/></div>
    <Footer/>
  </>
  )
}
