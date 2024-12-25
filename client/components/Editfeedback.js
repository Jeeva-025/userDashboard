import React, { useState } from 'react';
import { IoClose,  } from 'react-icons/io5';
import { FiEdit3, FiLayers,  } from 'react-icons/fi';
import { FaAndroid, FaApple, FaGlobe,  } from 'react-icons/fa';

import { AiOutlineBulb } from 'react-icons/ai';


import useUserStore from '@/store';
import { AiOutlineFileText, AiOutlinePaperClip } from 'react-icons/ai';
import { BiTag } from 'react-icons/bi';
import { FaBullhorn , FaBug } from 'react-icons/fa';
import { AiOutlineProject, AiOutlineStar } from 'react-icons/ai';
import { MdTask, MdOutlineNotificationsActive } from 'react-icons/md';
import { FiMail  } from 'react-icons/fi';
import { BiChat } from 'react-icons/bi';







const Editfeedback = ({ setEdit, editContent, setEditContent }) => {
  const updateFeedback = useUserStore((state)=> state.updateFeedback)
  const fetchFeedbacks = useUserStore((state)=> state.fetchFeedbacks)


  const platformsList = [
    "Android",
    "iOS",
    "Web",
  ];

  const modulesList = [
    "Channel",
    "Project",
    "Tasks",
    "Chat",
    "Alert",
  ];

  const tagsList = [
    "Feedback", 
    "Bug Report", 
    "Idea", 
    "Feature Request"
  ];


  const [report, setReport] = useState({
    title: editContent?.title || "",
    platforms: editContent?.platforms?.map(data=>platformsList.indexOf(data)+1) || [],
    modules: editContent?.modules.map(data=>modulesList.indexOf(data)+1),
    description: editContent?.description || "",
    tags: editContent?.tags?.map(data=>tagsList.indexOf(data)+1) || [],
    vote: editContent?.vote
  });

  const [file, setFile] = useState(null);



  const validation=()=>{
    if(!report.title || !report.description ||
        report.platforms.length===0 ||
        report.modules.length===0 ||
        report.tags.length===0
    ){
        alert("all fields are required")
        return false;
    }

    return true;
  }

  const handleSelectionChange = (type, index) => {
    const newArray = [...report[type]];
    if (newArray.includes(index+1)) {
      // Remove the index if already selected
      newArray.splice(newArray.indexOf(index+1), 1);
    } else {
      // Add the index if not selected
      newArray.push(index+1);
    }

    setReport({ ...report, [type]: newArray });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Capture the file
  };



  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', report.title);
    formData.append('description', report.description);
    formData.append('platforms', report.platforms);
    formData.append('modules', report.modules);
    formData.append('tags', report.tags);
    
    
    if (file) {
      formData.append('attachment', file);
      
    }
    ;
    if(validation()){
    await updateFeedback(editContent.id,formData);
    fetchFeedbacks();
    setReport({
        title: "",
        platform: [],
        module: [],
        description: "",
        tag: [],
        vote: 0
      });
      setEditContent();
      setEdit(false);
    }};


    const [dropdowns, setDropdowns] = useState({ platforms: false, modules: false });
    
      const toggleDropdown = (type) => {
        setDropdowns((prev) => ({ ...prev, [type]: !prev[type] }));
      };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 flex flex-col space-y-6 relative overflow-y-auto max-h-[80vh]">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition"
          onClick={() => setEdit(false)}
        >
          <IoClose size={24} />
        </button>

        <form className="flex flex-col space-y-6" onSubmit={(e) => handleSubmit(e)}>
          {/* Title */}
          <h2 className="font-semibold text-2xl text-center text-gray-800">Modify Bug Report</h2>
          <div>
            <label className="flex items-center space-x-2 text-gray-600 text-sm">
              <FiEdit3 size={24}/> <span>Title*</span>
            </label>
            <input
              value={report.title}
              placeholder="Title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 text-gray-800"
              onChange={(e) => setReport({ ...report, title: e.target.value })}
            />
          </div>

          {/* Platform */}
          <div className="relative">
                      <label className="flex items-center space-x-2 text-gray-600 text-sm">
                        <FaGlobe size={24}/> <span> Platform*</span>
                      </label>
                      <div
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 text-gray-800 cursor-pointer"
                        onClick={() => toggleDropdown('platforms')}
                      >
                        {report.platforms.length > 0 ? report.platforms.map(ind=>platformsList[ind-1]).join(', ') : "Select Platform"}
                      </div>
                      {dropdowns.platforms && (
                        <div className=" bg-white border border-gray-300 rounded-lg shadow-lg">
                          {platformsList.map((platform, index) => (
                            <div
                              key={index}
                              className={` flex px-4 py-2 cursor-pointer ${
                                report.platforms.includes(index+1) ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'
                              }`}
                              onClick={() => handleSelectionChange('platforms', index)}
                            >
                               {platform === 'Android' && <FaAndroid className="mr-2" />}
              {platform === 'iOS' && <FaApple className="mr-2" />}
              {platform === 'Web' && <FaGlobe className="mr-2" />}
              
                              {platform}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

          {/* Module */}
         <div className="relative">
                     <label className="flex items-center space-x-2 text-gray-600 text-sm">
                       <FiLayers size={24} /> <span> Module*</span>
                     </label>
                     <div
                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 text-gray-800 cursor-pointer"
                       onClick={() => toggleDropdown('modules')}
                     >
                       {report.modules.length > 0 ? report.modules.map(ind=> modulesList[ind-1]).join(', ') : "Select Module"}
                     </div>
                     {dropdowns.modules && (
                       <div className=" bg-white border border-gray-300 rounded-lg shadow-lg">
                         {modulesList.map((module, index) => (
                           <div
                             key={index}
                             className={` flex px-4 py-2 cursor-pointer ${
                               report.modules.includes(index+1) ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-gray-100'
                             }`}
                             onClick={() => handleSelectionChange('modules', index)}
                           >
                             {module === 'Channel' && <FaBullhorn className="mr-2" />}
             {module === 'Project' && <AiOutlineProject  className="mr-2" />}
             {module === 'Tasks' && <MdTask className="mr-2" />}
             {module === 'Chat' && <BiChat className="mr-2" />}
             {module === 'Alert' && <MdOutlineNotificationsActive className="mr-2" />}
             {module}
                           </div>
                         ))}
                       </div>
                     )}
                   </div>

          {/* Description */}
          <div>
            <label className="flex items-center space-x-2 text-gray-600 text-sm">
              <AiOutlineFileText  size={24}/> <span>Description</span>
            </label>
            <textarea
              placeholder="Add additional details here"
              value={report.description}
              onChange={(e) => setReport({ ...report, description: e.target.value })}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 text-gray-800"
            />
          </div>

          {/* Attachment */}
          <div>
            <label className="flex items-center space-x-2 text-gray-600 text-sm">
              <AiOutlinePaperClip size={24} /> <span>Attachment (optional)</span>
            </label>
            <input
              name="attachment"
              accept="image/*, video/*"
              type="file"
              onChange={handleFileChange}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-800"
            />
          </div>

          {/* Tags */}
          <div>
                      <label className="flex items-center space-x-2 text-gray-600 text-sm">
                        <BiTag size={24} /> <span>Tags</span>
                      </label>
                      <div className="flex space-x-4 mt-2">
                        {tagsList.map((tag, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div
                              
                              
                              onClick={() => handleSelectionChange('tags', index)}
          
                              className={` flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm ${
                                report.tags.includes(index+1)
                                  ? 'bg-indigo-500 text-white shadow-lg scale-105' // Selected state
                                  : 'bg-gray-100 text-gray-800 hover:bg-blue-200 hover:text-blue-800 hover:shadow-md cursor-pointer' // Default and hover styles
                              }`}
                            >
                               {tag === 'Feedback' && <FiMail  className="mr-2" />}
              {tag === 'Bug Report' && <FaBug size={27} className="mr-2" />}
              {tag === 'Idea' && <AiOutlineBulb  className="mr-2" />}
              {tag === 'Feature Request' && <AiOutlineStar size={34} className="mr-2" />}
              
              {tag}
          
                            </div>
                           
                          </div>
                        ))}
                      </div>
                    </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Editfeedback;
