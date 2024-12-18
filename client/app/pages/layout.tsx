import React from 'react'
import Navbar from "../../components/Navbar.js";

const layout = ({children}) => {
  return (
   <div className="flex">
    <Navbar/>
    <div className="flex-grow ml-[5%]">
    {children}
    </div>
    </div>
  )
}

export default layout