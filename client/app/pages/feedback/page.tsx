"use client"
import React from 'react'
import { useState } from 'react'
import Feedback from "../../../components/Feedback.js";

const page = () => {

  const [showFeedback, setShowFeedback] = useState(false);

    const[reports, setReports] =useState([{
        title:"Zoom in and Zoom out",
        platform:"iOS",
        module:"channel",
        description:"An exciting new feature is being developed to enhance user experience by adding seamless integration with multiple platforms. The goal is to create a more intuitive interface that allows ",
        tag:"Bug report",
        vote:44

    },
    {
        title:"Zoom in and Zoom out",
        platform:"iOS",
        module:"channel",
        description:"users to interact effortlessly across devices, with an emphasis on performance and ease of use. This feature will bring several improvements including faster load times, richer content",
        tag:"Bug report",
        vote:44

    },
    {
        title:"Zoom in and Zoom out",
        platform:"iOS",
        module:"channel",
        description:"hg",
        tag:"Bug report",
        vote:44

    }]);

    console.log(reports);
    
  return (
    <div className="max-w-3xl mx-auto p-4">
      {reports.map((data, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg p-6 mb-6 transition duration-300 hover:shadow-2xl hover:scale-105 flex justify-between ">
          <div className="flex flex-col space-y-2 md:space-x-6">
            {/* Left section */}
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-gray-800">{data.title}</h1>
              <p className="text-gray-600 mt-2">{data.description}</p>
            </div>

           
            <div className="mt-4 md:mt-0 flex space-x-4 flex-wrap md:justify-start">
              <div className="px-4 py-2 bg-blue-100 text-blue-600 rounded-md text-sm font-medium">{data.platform}</div>
              <div className="px-4 py-2 bg-green-100 text-green-600 rounded-md text-sm font-medium">{data.module}</div>
              <div className="px-4 py-2 bg-yellow-100 text-yellow-600 rounded-md text-sm font-medium">{data.tag}</div>
            </div>
            </div>
             {/* Right section (Metadata and tags) */}
              <div className=" flex flex-col items-center  border-2 border-grap-700 rounder-lg w-auto h-auto flex-shrink-0 ">
                <div>{data.vote}</div>
              <div className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md text-sm font-medium">Votes</div>
            </div>
          </div>
          
        
      ))}



<button
        onClick={() => setShowFeedback(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
      >
        Feedback
      </button>

      {/* Feedback Popup */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          
            {/* Feedback Component */}
            <Feedback reports={reports} setReports={setReports} setShowFeedback={setShowFeedback} />

            
            
          
        </div>
      )}
    </div>
  )
}

export default page