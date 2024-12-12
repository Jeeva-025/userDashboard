import React from 'react'
import { useState } from 'react';
import useUserStore from "../store.js";

const Adduser = ({setIsModalOpen}) => {
   
    const addUser=useUserStore((state)=>state.addUser);
    const [newUser, setNewUser] = useState({ username: "", email: "", role: "" });

    const handleAddUser = () => {
      
        if (!newUser.username || !newUser.email || !newUser.role) {
          alert('All fields are required!');
          return; 
        }
        if(!newUser.email.endsWith("@gmail.com")){
            alert("Enter proper email");
            return;
        } 
       console.log(newUser);
        addUser(newUser)
        
        setIsModalOpen(false); 
        setNewUser({ name: "", email: "", role: "" });
      };

  return (
    
         <div className="bg-white p-5 rounded-md w-1/3">
              <h2 className="text-2xl font-bold mb-4">Add New User</h2>
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                />
                <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                >
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Member">Member</option>
                </select>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md">
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Add User
                </button>
              </div>
            </div>
    
  )
}

export default Adduser