"use client"
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/store';
import Link from 'next/link';


const Editproject = ({editContent, setIsShowEdit, setEditContent}) => {

    

    const user=useUserStore((state)=> state.user);
    const updateProject=useUserStore(state=> state.updateProject);
    const getAllProjects=useUserStore(state=> state.getAllProject);
    const data=useUserStore((state)=> state.projects);

    

    const router=useRouter();
    
    const [project, setProject] = useState({
        id:editContent.id,
        title: editContent.title,
        type: editContent.type,
        startDate: editContent.startDate
        ? new Date(editContent.startDate).toISOString().split('T')[0] // Format to YYYY-MM-DD
        : '',
    endDate: editContent.endDate
        ? new Date(editContent.endDate).toISOString().split('T')[0]
        : '',
        description:editContent.description,
        role: editContent.role,
        userid:user&& user.id

    });
    
    useEffect(() => {
        if (user) {
            setProject((prev) => ({ ...prev, userid: user.id }));
        }
    }, [user]);
    
    
    

    const validate=()=>{
        if(!project.title || !project.type ||
            !project.description || !project.startDate ||
            !project.endDate || !project.role || !project.userid
        ){
            alert("All fields are required")
            return false;
        }
        return true;
    }

    const handleSummit=async(e)=>{
       e.preventDefault();
       try{
        if(validate()){
        
            await updateProject(project);
            setProject({
                id:null,
                title:"",
                type:"",
                description:"",
                role:"",
                startDate:"",
                endDate:"",
                userid:null
            });
            await getAllProjects();
           
            setIsShowEdit(false);
        }

        }catch(err){
            console.log(err)
            alert(err.message)
        }
    }

    console.log(data);

    



    


   

    
  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center">
      <div className="w-[600px] max-w-1/2 bg-white rounded-xl shadow-lg p-6 flex flex-col space-y-6 relative overflow-y-auto max-h-[80vh]">
        <h1 className="text-3xl font-bold mb-6">Create Project</h1>

        <form  className="mt-7 p-4 border shadow-md bg-[#f8fafc] rounded-lg">
            <div className="flec flex-col space-y-7">
        
                    <div className="flex-grow">
                        <label className="flex items-center space-x-2 text-gray-600 text-lg">Project Title</label>
                        <input
                            type="text"
                            value={project.title}
                            placeholder="Enter Project Title"
                            className=" w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-400 text-gray-800"
                            onChange={(e) => setProject({ ...project, title: e.target.value })}
                        />
                    </div>

                    <div className="flex-grow">
                        <label className="flex items-center space-x-2 text-gray-600 text-lg">Project Type</label>
                        <input
                            type="text"
                            value={project.type}
                            placeholder="Enter Project Type"
                            className=" w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-400 text-gray-800"
                            onChange={(e) => setProject({ ...project, type: e.target.value })}
                        />
                    </div>

                    <div className="flex-1">
                        <label className="flex items-center space-x-2 text-gray-600 text-lg">Start Date</label>
                        <input
                            type="date"
                            value={project.startDate}
                            className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-400 text-gray-800"
                            onChange={(e) => setProject({ ...project, startDate: e.target.value })}
                        />
                    </div>
                    
                    <div className="flex-1">
                        <label className="flex items-center space-x-2 text-gray-600 text-lg">End Date</label>
                        <input
                            type="date"
                            value={project.endDate}
                            className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-400 text-gray-800"
                            onChange={(e) => setProject({ ...project, endDate: e.target.value })}
                        />
                    </div>
                
                <div>
                    <label className="flex items-center space-x-2 text-gray-600 text-lg">Project Description</label>
                    <textarea
              placeholder="Add additional details here"
              value={project.description}
              onChange={(e) => setProject({ ...project, description: e.target.value })}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 text-gray-800"
            />
                </div>
                

                <div className="flex-1">
                        <label className="flex items-center space-x-2 text-gray-600 text-lg">Category</label>
                        <select
                            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-400 text-gray-800"
                            value={project.role}
                            onChange={(e) => setProject({ ...project, role: e.target.value })}
                        >
                            <option value="">Select Category</option>
                            <option value="web">Web Development</option>
                            <option value="mobile">Mobile App Development</option>
                            <option value="data">Data Science</option>
                            <option value="ai">AI & Machine Learning</option>
                        </select>
                    </div>

                    <div className=" flex justify-end space-x-6">
                        <button onClick={(e)=>handleSummit(e)} className="text-white px-2 py-1 border rounded-lg bg-indigo-500 hover:scale-110">Update</button>
                        
                        <button
                        type="button"
                        className="text-white px-2 py-1 border rounded-lg bg-indigo-500 hover:scale-110"
                        onClick={()=>setIsShowEdit(false)}>Cancel</button>
                    </div>

                    </div>
            
        </form>
    </div>
    </div>
    
  )
}

export default Editproject;