import React, { useState } from 'react';
import { IoClose, IoChatbubbleEllipses } from 'react-icons/io5';
import { FiEdit3, FiLayers, FiList } from 'react-icons/fi';
import { FaAndroid, FaApple, FaGlobe, FaProjectDiagram } from 'react-icons/fa';
import { MdNotificationsActive } from 'react-icons/md';
import { AiOutlineFileText, AiOutlinePaperClip } from 'react-icons/ai';
import { BiTag } from 'react-icons/bi';
import useUserStore from '@/store';







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
    }
    
    
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
          <h2 className="font-semibold text-2xl text-center text-gray-800">Bug Report</h2>
          <div>
            <label className="flex items-center space-x-2 text-gray-600 text-sm">
              <FiEdit3 /> <span>Title*</span>
            </label>
            <input
              value={report.title}
              placeholder="Title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 text-gray-800"
              onChange={(e) => setReport({ ...report, title: e.target.value })}
            />
          </div>

          {/* Platform */}
          <div>
            <label className="flex items-center space-x-2 text-gray-600 text-sm">
              <FaGlobe /> <span>Platform</span>
            </label>
            <div className="flex space-x-4 mt-2">
              {platformsList.map((platform, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`platform-${index+1}`}
                    checked={report.platforms.includes(index+1)}
                    onChange={() => handleSelectionChange("platforms", index)}
                    className="text-indigo-600"
                  />
                  <label htmlFor={`platform-${index+1}`}>{platform}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Module */}
          <div>
            <label className="flex items-center space-x-2 text-gray-600 text-sm">
              <FiLayers /> <span>Module</span>
            </label>
            <div className="flex space-x-4 mt-2">
              {modulesList.map((module, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`module-${index+1}`}
                    checked={report.modules.includes(index+1)}
                    onChange={() => handleSelectionChange("modules", index)}
                    className="text-indigo-600"
                  />
                  <label htmlFor={`module-${index+1}`}>{module}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center space-x-2 text-gray-600 text-sm">
              <AiOutlineFileText /> <span>Description</span>
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
              <AiOutlinePaperClip /> <span>Attachment (optional)</span>
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
              <BiTag /> <span>Tags</span>
            </label>
            <div className="flex space-x-4 mt-2">
              {tagsList.map((tag, index) => (
                <div key={index} className="flex items-center space-x-2">
                  
                  <input
                    type="checkbox"
                    id={`tag-${index+1}`}
                    checked={report.tags.includes(index+1)}
                    onChange={() => handleSelectionChange("tags", index)}
                    className="text-indigo-600"
                  />
                  <label htmlFor={`tag-${index+1}`}>{tag}</label>
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
