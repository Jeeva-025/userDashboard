"use client"
import React from 'react'
import { useState } from 'react'
import { IoCreate } from 'react-icons/io5';
import { FaHourglassStart } from 'react-icons/fa';
import { IoDocumentTextOutline } from "react-icons/io5";
import Link from 'next/link';

const project = () => {
   

    const[projects, setProject]=useState([
        {
          id:1,
         title:"Adoddle",
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
         time:"05 April 2023",
         issues:14,

        },
        {
          id:2,
            title:"Adoddle",
            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
            time:"05 April 2023",
            issues:14,
           },
           {
            id:3,
            title:"Adoddle",
            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
            time:"05 April 2023",
            issues:14,
   
           },
           {
            id:4,
            title:"Adoddle",
            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
            time:"05 April 2023",
            issues:14,
   
           }
    ]);





  return (
    <div className="p-6">
      <div className="flex justify-between">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <Link href="project/createproject"><button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300">Create Project</button></Link>
      </div>
     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Link key={index} href={`/pages/project/${project.id}`}>
          <div
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col justify-start"
          >
            <div className='flex justify-between'>

            <div className='flex justify-center items-center space-x-2 '>
            <h2 className="text-lg font-semibold mb-2">{project.title}</h2>
            
                  <button className="text-gray-500 hover:text-gray-700 transition hover:scale-110">
                    <IoCreate size={34} />
                  </button>
                
            </div>

            <div className="py-1 px-2 border text-red-600 border-red-100 rounded-md bg-red-200">Offtrack</div>
            </div>

            <hr className="border-t-3 border-gray-500 my-2" />
            <p className="text-sm px-2 text-gray-600">{project.description}</p>
            <span className="text-red-400 mt-5 flex justify-start space-x-1">
                      <FaHourglassStart size={34} />
                     <p className='text-lg'>{project.time}</p> 
             </span>
             <span className="text-gray-500 mt-5 flex justify-end items-center space-x-1">
                      <IoDocumentTextOutline size={34} />
                     <p className='text-md'>{project.issues} issues</p> 
             </span>
          </div>
          </Link>
        ))}
      </div>
    </div>
    
  )
}

export default project