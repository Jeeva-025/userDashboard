  
    "use client"
  import useUserStore from "../store.js";
  import { useEffect, useState } from 'react';
  import Adduser from '../components/Adduser.js';


  const UsersList = () => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [searchQuery, setSearchQuery] = useState(""); 
    const [editId, setEditId]=useState(null);
    const[editContent, setEditContent]=useState({});
    const data=useUserStore((state)=> state.users);
  
    const addUser=useUserStore((state)=>state.addUser);
    const deleteUser=useUserStore((state)=> state.deleteUser);
    const updateUser=useUserStore((state)=> state.updateUser);
    const fetchUser= useUserStore((state)=> state.fetchUser);
    


    const filteredUsers= data.filter(user =>user.username.toLowerCase().includes(searchQuery.toLowerCase()));
    

    console.log(editContent);
    

    useEffect(()=>{
        fetchUser();
    },[data])
   


   const handleDelete=(userId)=>{
  deleteUser(userId);
   }


   const handleEdit=(user)=>{
         setEditId(user.id);
         setEditContent(user);
   }

   const handleUpdate=()=>{
     updateUser(editId, editContent);
     setEditId(null);
     setEditContent({});
   }

    return (
      <div className="p-4 bg-slate-50">
        <div className='leading-10'>
        <h1 className="text-3xl font-mono font-extrabold mx-auto">User Management</h1>
        <p className='text-sm mt-2'> Manage your team members and their roles</p>
        </div>
        <div  className='flex justify-between mt-5'>
          <h1 className='text-xl'>All Users</h1>
          <div className='flex space-x-4 '>
            <input 
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-700 rounded-md p-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"></input>
            <button onClick={() => setIsModalOpen(true)}  className='bg-black  border border-gray-950 rounded-md p-1 text-gray-50'>+ Add User</button>
          </div>
        </div>
        <table className="mt-5 table-auto w-full">
          <thead className="border-b border-gray-300 mb-7">
            <tr className="mb-7">
              <th className='text-center'>Name</th>
              <th className='text-center'>Email</th>
              <th className='text-center'>Role</th>
              <th className='text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
          { filteredUsers.map((user, index)=>(
             <tr key={index} className="mb-7 border-b border-gray-300">

                { user.id===editId ? (
                  <>
                  <td className='text-center'><input value={editContent.username}  
                  onChange={(e)=>setEditContent({...editContent, name:e.target.value})}
                  className='p-1 border-2 rounded-md focus:outline-none border-blue-500'/></td>

                  <td className='text-center'><input value={editContent.email}  
                  onChange={(e)=>setEditContent({...editContent, email:e.target.value})}
                  className='p-1 border-2 rounded-md focus:outline-none border-blue-500'/></td>

                 <td className='text-center'><input value={editContent.role}  
                  onChange={(e)=>setEditContent({...editContent, role:e.target.value})}
                  className='p-1 border-2 rounded-md focus:outline-none border-blue-500'/></td>

                <td className='text-center flex justify-center gap-1'>
                  <button onClick={()=>setEditId(null)}className="bg-slate-400 text-black py-2 px-4 rounded">
                    Cancel
                  </button>
                  <button  onClick={()=>handleUpdate()} className="bg-stone-400 text-black py-2 px-4 rounded">Save</button>
                </td>
                </>
                ):(
                  <>
                <td className='text-center'>{user.username}</td>
                <td className='text-center'>{user.email}</td>
                <td className='text-center'>{user.role}</td>
                <td className='text-center flex justify-center gap-1'>
                  <button onClick={()=>handleDelete(user.id)}className=" bg-slate-400 text-black my-2 mx-2 p-1 rounded">
                    Remove
                  </button>
                  <button  onClick={()=>handleEdit(user)} className=" bg-stone-400 text-black my-2 mx-2 px-5 rounded">Edit</button>
                </td>
                </>
                )}
              </tr>

          ))
  }
          </tbody>
        </table>


        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
            <Adduser  setIsModalOpen={setIsModalOpen}/>
          </div>
        )}
      </div>
    );
  };

  export default UsersList;
