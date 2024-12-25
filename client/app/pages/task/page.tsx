"use client"
import React from 'react'
import { useState } from 'react'
import { FaLightbulb } from "react-icons/fa"; 
import { BiSolidPieChartAlt } from "react-icons/bi";
import { BsChatRightText } from "react-icons/bs";
import Link from 'next/link';

const page = () => {
 
    const[tasks, setTasks]=useState([
        {
        id:1,
        title:"Make an Automatic Payment system that enable the design",
    },
    {
        id:2,
        title:"Make an Automatic Payment system that enable the design",
    },
    {
        id:3,
        title:"Make an Automatic Payment system that enable the design",
    },
    {
        id:4,
        title:"Make an Automatic Payment system that enable the design",
    },
    {
      id:5,
      title:"Make an Automatic Payment system that enable the design",
  }

]);
  

  return (
    <div className="p-6 h-screen bg-blue-50">
      <div className=" flex justify-between mb-6">
        <h1 className="text-3xl font-bold ">Addodle</h1>
        <div className="flex space-x-3">
            <Link  href='task/createtask'>
        <button className=" bg-blue-600 border border-blue-600 rounded-xl px-4 py-1">Assign Task</button>
        </Link>

        <div className="flex flex-col items-center space-y-2">
          <h3>Time Spent</h3>
          <div className=" flex items-center space-x-2 px-2 rounded-xl bg-green-200 border border-green-200 text-green-600 font-semibold"><BiSolidPieChartAlt/> <p>00 : 30 : 00</p></div></div>
        
          <div className="flex flex-col items-center space-y-2">
          <h3>Deadline</h3>
          <div className="  flex items-center space-x-2 px-2 rounded-xl bg-green-200 border border-green-200 text-green-600 font-semibold"><BiSolidPieChartAlt/> <p>00 : 30 : 00</p></div></div>

        </div>
      </div>
       <div className="flex flex-col mb-10 space-y-5">
        {tasks.map((task, index)=>(
            <div key={index} className="flex justify-between py-3 border shadow-md bg-[#f8fafc] rounded-lg">
         <div className=" flex items-center space-x-3  p-4 " >
            <FaLightbulb size={29}/>

            
         <div className=" flex flex-col space-y-2">
          <p>{task.title}</p>
          <div className=" flex space-x-2">
            <button className="px-4 border rounded-xl bg-red-100 text-red-500">Canceled</button>
            <button className="px-4 border border-green-100 rounded-xl bg-green-100 text-green-500">Completed</button>
          </div>
          </div>
          </div>
          <div className="flex items-center space-x-20 mr-20 ">
            <div className="  flex items-center space-x-2 px-2 rounded-xl bg-green-200 border border-green-200 text-green-600 font-semibold"><BiSolidPieChartAlt/> <p>00 : 30 : 00</p></div>
            <img
    src="https://plus.unsplash.com/premium_photo-1689530775582-83b8abdb5020?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fHww"
    className="w-12 h-12 rounded-full object-cover"
    alt="Profile"
  />
            <BsChatRightText size={34}/>
          </div>
         
         </div>
        ))}
        </div>
        
    </div>
  )
}

export default page