"use client"
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/store';
import Link from 'next/link';


const page = () => {

    const user=useUserStore((state)=> state.user);
    const createproject=useUserStore((state)=> state.createProject)

    const router=useRouter();
    

    useEffect(() => {
        if (user) {
            setProject((prev) => ({ ...prev, userid: user.id }));
        }
    }, [user]);
    
    
    const [project, setProject] = useState({
        title: "",
        type: "",
        startDate: "",
        endDate: "",
        description:"",
        role: "",
        userid:user&& user.id

    });

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
        
            createproject(project);
            setProject({
                title:"",
                type:"",
                description:"",
                role:"",
                startDate:"",
                endDate:"",
                userid:null
            });
            router.back();
        }

        }catch(err){
            console.log(err)
            alert(err.message)
        }
    }



    


   

    
  return (
    <div className="p-6 h-screen bg-blue-50">
        <h1 className="text-3xl font-bold mb-6">Create Project</h1>

        <form  className="mt-7 p-4 border shadow-md bg-[#f8fafc] rounded-lg">
            <div className="flec flex-col space-y-7">
        <div className="flex justify-between space-x-4">
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
                        <button onClick={(e)=>handleSummit(e)} className="text-white px-2 py-1 border rounded-lg bg-indigo-500 hover:scale-110">Create</button>
                        <Link href={"/pages/project"}>
                        <button
                        type="button"
                        className="text-white px-2 py-1 border rounded-lg bg-indigo-500 hover:scale-110" onClick={(e) => {
                             
                             }}>Cancel</button></Link>
                    </div>

                    </div>
            
        </form>
    </div>
  )
}

export default page