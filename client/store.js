import { create } from "zustand";
import axios from "axios";

import {persist, devtools} from "zustand/middleware";

const userStore=(set)=>({
  users:[],
  userEmail: null,  
  fetchUser: async()=>{
    try{
      const response= await axios.get("http://localhost:8080/api/user");
      set({users:response.data})
    }catch(err){
      console.log(err.message);
    }
    
    
},

  addUser:async (user)=>{
    try{
      const response = await axios.post("http://localhost:8080/api/user", user);
      set((state) => ({ users: [...state.users, response.data] }));
    }catch(err){
      console.log(err.message)
    }
    
  },
  deleteUser: async(userId)=>{
    try{
      await axios.delete(`http://localhost:8080/api/user/${userId}`);
    set((state)=>({
      users:state.users.filter(user=> user.id !==userId)
    }))
    }catch(err){
      console.log(err);
    }
    
  },
  updateUser: async(userId, updateUser)=>{
    try{
      
    const response = await axios.put(`http://localhost:8080/api/user/${userId}`, updateUser);
    set((state)=>({
      users:state.users.map(user=>(
        user.id ===userId?{...user, ...updateUser}:user
      ))
    }))
    }catch(err){
      console.log(err);
    }
   
  },


  loginuser: async(data, sign)=>{
    try{
      
      const response = await axios.post(`http://localhost:8080/api/user/${sign}`, data);
      
      set({ userEmail:  response.data.user.email});
      return response.data;
    }catch(err){
      console.log(err.mssage);
      throw err;
    }
    
  },

  logout: ()=>{
    set({ userEmail: null });
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