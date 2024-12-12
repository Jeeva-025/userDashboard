import React from 'react'
import useUserStore from "../store.js";

const Edit = ({editContent, setEditContent, editId,setEditId}) => {


    const updateUser=useUserStore((state)=> state.updateUser);

    const handleUpdate=()=>{
        updateUser(editId, editContent);
        setEditId(null);
        setEditContent({});
      }
  return (
    <div className="bg-white p-5 rounded-md w-1/3">
              <h2 className="text-2xl font-bold mb-4">Edit User</h2>
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={editContent.username}
                  onChange={(e) => setEditContent({ ...editContent, username: e.target.value })}
                  className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={editContent.email}
                  onChange={(e) => setEditContent({ ...editContent, email: e.target.value })}
                  className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                />
                <select
                    value={editContent.role}
                    onChange={(e) => setEditContent({ ...editContent, role: e.target.value })}
                    className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                >
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Member">Member</option>
                </select>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setEditId(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md">
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Save
                </button>
              </div>
            </div>
  )
}

export default Edit