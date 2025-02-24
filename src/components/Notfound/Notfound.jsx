import React from 'react'
import style from "./Notfound.module.css"
import NotFound from "../../assets/NotFound-404-Page.gif";

export default function Notfound() {
  return (
    <img src={NotFound} alt=""  className='w-[80%] mx-auto'/>
  )
}
