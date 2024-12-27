"use client"
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import Link from 'next/link';
import { usePathname } from "next/navigation"; 
import useUserStore from '@/store';

const page = () => {

    const pathname = usePathname(); 
    const id = Number(pathname.split("/").pop()); 
    console.log("Project ID:", id);

    const createTask=useUserStore(state=> state.createTask);
    const user=useUserStore(state=> state.user)
    const getAllAuth= useUserStore(state=> state.getAllAuth);
    const auths= useUserStore(state=> state.auths);


    const router=useRouter();

    const [project, setProject] = useState({
        title: "",
        type: "",
        startDate: "",
        endDate: "",
        description:"",
        role: "",
        assignerid:null,
        assigneeid:null,
        projectid:id,

        
    });
    useEffect(()=>{
        if (user) {
            setProject(prev => ({ ...prev, assignerid: user.id }));
        }
        getAllAuth();
    },[])


    const validation=()=>{
        if(!project.type || ! project.title || !project.description ||
            !project.startDate ||  !project.endDate || !project.role || 
            !project.assigneeid || !project.assignerid
        ){
            alert("All fileds are required")
            return false;
        }
        return true;
    }

    
   

const handleSubmit=async()=>{
    try{
        if(validation()){
     await createTask(project)
     setProject({
        title:"",
        type:"",
        description:"",
        assigneeid:null,
        startDate:"",
        endDate:"",
        projectid:17,
        role:"",
        assignerid: user&& user.id
     })
     router.back();
        }
    }catch(err){
        console.log(err);
        alert(err.message);
    }
}


    
  return (
    <div className="p-6 h-screen bg-blue-50">
        
        <h1 className="text-3xl font-bold mb-6">Create Task</h1>
        

        <form className="mt-7 p-4 border shadow-md bg-[#f8fafc] rounded-lg">
            <div className="flec flex-col space-y-7">
        <div className="flex justify-between space-x-4">
                    <div className="flex-grow">
                        <label className="flex items-center space-x-2 text-gray-600 text-lg">Task Title</label>
                        <input
                            type="text"
                            placeholder="Enter Project Title"
                            className=" w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-400 text-gray-800"
                            onChange={(e) => setProject({ ...project, title: e.target.value })}
                        />
                    </div>

                    <div className="flex-grow">
                        <label className="flex items-center space-x-2 text-gray-600 text-lg">Task Type</label>
                        <input
                            type="text"
                            placeholder="Enter Project Type"
                            className=" w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-400 text-gray-800"
                            onChange={(e) => setProject({ ...project, type: e.target.value })}
                        />
                    </div>

                    <div className="flex-1">
                        <label className="flex items-center space-x-2 text-gray-600 text-lg">Start Date</label>
                        <input
                            type="date"
                            className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-400 text-gray-800"
                            onChange={(e) => setProject({ ...project, startDate: e.target.value })}
                        />
                    </div>
                    
                    <div className="flex-1">
                        <label className="flex items-center space-x-2 text-gray-600 text-lg">End Date</label>
                        <input
                            type="date"
                            className="px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-400 text-gray-800"
                            onChange={(e) => setProject({ ...project, endDate: e.target.value })}
                        />
                    </div>
                </div>
                <div>
                    <label className="flex items-center space-x-2 text-gray-600 text-lg">Task Description</label>
                    <textarea
              placeholder="Add additional details here"
              value={project.description}
              onChange={(e) => setProject({ ...project, description: e.target.value })}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 text-gray-800"
            />
                </div>
                

                <div className="flex-1">
                        <label className="flex items-center space-x-2 text-gray-600 text-lg">Role</label>
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

                    <div className="flex-1">
    <label className="flex items-center space-x-2 text-gray-600 text-lg">Assign To</label>
    <select
        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-400 text-gray-800"
        value={project.assigneeid || ""}
        onChange={(e) => setProject({ ...project, assigneeid: Number(e.target.value) })}
    >
        <option value="">Select Assignee</option>
        {auths && auths.map((auth) => (
            <option key={auth.id} value={auth.id}>
                {auth.username}
            </option>
        ))}
    </select>
</div>

                    <div className=" flex justify-end space-x-6">
                        <button onClick={(e)=> handleSubmit(e)} className="text-white px-2 py-1 border rounded-lg bg-indigo-500 hover:scale-110">Create</button>
                        <Link href={"/pages/task"}>
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