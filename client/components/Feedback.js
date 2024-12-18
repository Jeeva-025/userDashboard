import React, { useState } from 'react';
import { IoClose, IoChatbubbleEllipses } from 'react-icons/io5';
import { FiEdit3, FiLayers, FiList } from 'react-icons/fi';
import { FaAndroid, FaApple, FaGlobe, FaProjectDiagram } from 'react-icons/fa';
import { MdNotificationsActive } from 'react-icons/md';
import { AiOutlineFileText, AiOutlinePaperClip } from 'react-icons/ai';
import { BiTag } from 'react-icons/bi';

const Feedback = ({ reports, setReports, setShowFeedback }) => {
  const tagsList = ["Feedback", "Bug Report", "Idea", "Feature Request"];
  const [report, setReport] = useState({
    title: "",
    platform: "",
    module: "",
    description: "",
    tag: "",
    vote:0
  });
  

  const handleTagClick = (tag) => {
    setReport({ ...report, tag: tag });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setReports((prevReports) => [...prevReports, report]);
    setReport({
      title: "",
      platform: "",
      module: "",
      description: "",
      tag: "",
      vote:0
    })
    setShowFeedback(false);

  };
  

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 flex flex-col space-y-6 relative overflow-y-auto max-h-[80vh]">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition"
          onClick={() => setShowFeedback(false)}
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
            <select
              value={report.platform}
              onChange={(e) => setReport({ ...report, platform: e.target.value })}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 text-gray-800"
            >
              <option value="">Select the platform</option>
              <option value="Android">
              🤖 Android
              </option>
              <option value="iOS">
              🍏 iOS
              </option>
              <option value="Web">
              🌐 Web 
              </option>
            </select>
          </div>

          {/* Module */}
          <div>
            <label className="flex items-center space-x-2 text-gray-600 text-sm">
              <FiLayers /> <span>Module</span>
            </label>
            <select
              value={report.module}
              onChange={(e) => setReport({ ...report, module: e.target.value })}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 text-gray-800"
            >
              <option value="">Select the module</option>
              <option value="Channel">Channel</option>
              <option value="Project">Project</option>
              <option value="Tasks">Tasks</option>
              <option value="Chat">Chat</option>
              <option value="Alert">Alert</option>
            </select>
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
              className="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-800"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="flex items-center space-x-2 text-gray-600 text-sm">
              <BiTag /> <span>Tags</span>
            </label>
            <div className="flex space-x-4 mt-2">
              {tagsList.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`px-4 py-2 border rounded-md ${
                    report.tag === tag
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  } focus:outline-none`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
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

export default Feedback;
