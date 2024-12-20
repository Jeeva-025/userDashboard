"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import Feedback from "../../../components/Feedback.js";
import { IoClose, IoCreate } from 'react-icons/io5';
import useUserStore from '@/store.js';
import Editfeedback from '../../../components/Editfeedback.js';

const page = () => {

  const [showFeedback, setShowFeedback] = useState(false);
  const[edit, setEdit]=useState(false);
  const[editContent, setEditContent]=useState();

  const fetchFeebacks=useUserStore((state)=> state.fetchFeedbacks);
  const feedbacks=useUserStore((state)=> state.feedbacks);
  const deleteFeedback=useUserStore((state)=> state.deleteFeedback);
  const incrementVote=useUserStore((state)=> state.incrementVote);
  
  


  
 

  const handleEdit=(id)=>{
    setEdit(true);
    const data=feedbacks.find(feed => feed.id===id);
    setEditContent(data);
    console.log(editContent);
    
  }

    const handleDelete=async(id)=>{
       await deleteFeedback(id)
    }

    const handleVote=async(id)=>{
      await incrementVote(id)
    }

    

    useEffect(()=>{
      fetchFeebacks();
    },[])
    


    
  return (
    <div className="max-w-3xl mx-auto p-4">

      {feedbacks.map((data, index) => (
        <div key={index} className="bg-white shadow-lg rounded-lg p-6 mb-6 transition duration-300 hover:shadow-2xl hover:scale-105 flex justify-between space-x-3 relative">
          <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition
          hover:scale-110"
          onClick={() => handleDelete(data.id)}>
                      <IoClose size={34} />
          </button>

          {/* Edit Icon */}
          <button
            className="absolute top-2 right-12 text-gray-500 hover:text-gray-700 transition
            hover:scale-110"
            onClick={() => handleEdit(data.id)}
          >
            <IoCreate size={34} />
          </button>


          <div className="flex flex-col space-y-2 md:space-x-6">
            {/* Left section */}
            
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-gray-800">{data.title}</h1>
              <p className="text-gray-600 mt-2">{data.description}</p>
            </div>

           
            <div className="mt-4 flex flex-wrap gap-2">
                {/* Platforms */}
                {data.platforms.map((platform, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 bg-blue-100 text-blue-600 rounded-md text-sm font-medium"
                  >
                    {platform}
                  </div>
                ))}
                {/* Modules */}
                {data.modules.map((module, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 bg-green-100 text-green-600 rounded-md text-sm font-medium"
                  >
                    {module}
                  </div>
                ))}
                {/* Tags */}
                {data.tags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 bg-yellow-100 text-yellow-600 rounded-md text-sm font-medium"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
             {/* Right section (Metadata and tags) */}
              <div className=" flex flex-col items-center justify-center   w-auto h-auto flex-shrink-0 ">
                <div>{data.vote}</div>
              <div className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md text-sm font-medium cursor-pointer transition duration-300 ease-in-out transform hover:bg-indigo-600 hover:text-white hover:scale-105" onClick={()=>handleVote(data.id)}>Votes</div>
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
            <Feedback  setShowFeedback={setShowFeedback} />

        </div>
      )}
      {edit && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
              
                {/* Feedback Component */}
                <Editfeedback setEdit={setEdit} editContent={editContent} setEditContent={setEditContent}/>
    
            </div>
          )}
    </div>
  )
}

export default page