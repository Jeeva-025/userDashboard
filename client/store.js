import { create } from "zustand";
import axios from "axios";

import {persist, devtools} from "zustand/middleware";

const userStore=(set)=>({
  users:[],
  fetchUser: async()=>{
    const response= await axios.get("http://localhost:8080/api/user");
    set({users:response.data})
},

  addUser:async (user)=>{
    const response = await axios.post("http://localhost:8080/api/user", user);
    console.log(response);
    set((state) => ({ users: [...state.users, response.data] }));
  },
  deleteUser: async(userId)=>{
    await axios.delete(`http://localhost:8080/api/user/${userId}`);
    set((state)=>({
      users:state.users.filter(user=> user.id !==userId)
    }))
  },
  updateUser: async(userId, updateUser)=>{
    const response = await axios.put(`http://localhost:8080/api/user/${userId}`, updateUser);
    set((state)=>({
      users:state.users.map(user=>(
        user.id ===userId?{...user, ...updateUser}:user
      ))
    }))
  }
})

const useUserStore=create(
    devtools(
        persist(userStore, {
        name:"user",
        })
    )
)

export default useUserStore;