  
    "use client"
    import useUserStore from "../../store.js";
    import { useEffect, useState } from 'react';
    import Adduser from '../../components/Adduser.js';
    
    import Edit from '../../components/Edit.js';
    import { useRouter } from "next/navigation.js";
 
    
  
  
    const UsersList = () => {
      
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [searchQuery, setSearchQuery] = useState(""); 
      const [editId, setEditId]=useState(null);
      const[editContent, setEditContent]=useState({});
      const[data, setData]=useState()



      const users=useUserStore((state)=> state.users);
      
      const useremail=useUserStore((state)=> state.userEmail);
      const logout=useUserStore((state)=> state.logout)
      const deleteUser=useUserStore((state)=> state.deleteUser);
      const fetchUser= useUserStore((state)=> state.fetchUser);
    
      
      const router = useRouter();
      console.log(data);
      console.log(users)
      
      
      useEffect(()=>{
          fetchUser();
          setData(users);
      },[users])

      const filteredUsers = users
  ? users.filter(user =>
      user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : [];
      
     
  
     const handleDelete=(userId)=>{
    deleteUser(userId);
     }
  
     const handleEdit=(user)=>{
           setEditId(user.id);
           setEditContent({
            username: user.username,
            email: user.email,
            role: user.role,
          });
     }
  
     useEffect(()=>{
       if(!useremail){
        router.push("/")
       }
     },[useremail])
  
     
     
  
      return (
        <>
  
         
  
          
          
          <div className="p-4 bg-slate-50">
          <div className='leading-10'>
          <div className="flex justify-between ">
          <h1 className="text-3xl font-mono font-extrabold ">User Management</h1>
          <div onClick={()=> logout()}
           className="font-mono text-2xl font-extrabold hover:text-3xl hover:cursor-pointer"> Logout</div>
          </div>
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
                    <td>
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                    <Edit editId={editId} editContent={editContent}
                     setEditId={setEditId}
                    setEditContent={setEditContent}  />
                  </div>
                  </td>
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
        
        
          
         
         
  
        </>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
    
      );
    };
  
    export default UsersList;
  