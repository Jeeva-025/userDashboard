import { create } from "zustand";
import axios from "axios";

import {persist, devtools} from "zustand/middleware";

const userStore=(set)=>({
  users:[],
  feedbacks:[],
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
  },

  fetchFeedbacks:async()=>{
    try{
      const response = await axios.get('http://localhost:8080/api/feedback');
      set({feedbacks:response.data})
    }catch(err){
      console.log(err);
      throw err;
    }
  },

    addFeedback:async(formData)=>{
      try{
        const response = await axios.post('http://localhost:8080/api/feedback', formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        set((state) => ({ users: [...state.feedbacks, response.data] }));

      }catch(err){
        console.log(err);
        throw err;
      }
    },
    deleteFeedback:async(id)=>{
      try{
        const response= await axios.delete(`http://localhost:8080/api/feedback/${id}`)
        set((state)=>({
          feedbacks:state.feedbacks.filter(data=> data.id!==id)
        }))

      }catch(error){
        console.log(err)
        throw err;
      }
    },
    incrementVote:async(id)=>{
      try{
        const response =await axios.put(`http://localhost:8080/api/feedback/${id}/vote`)
        if (response.status === 200) {
          set((state) => ({
              feedbacks: state.feedbacks.map((data) =>
                  data.id === id ? { ...data, vote: data.vote + 1 } : data
              ),
          }));
      }
      }catch(err){
        console.log(err);
        throw err;
      }
    },

    updateFeedback:async(id, formData)=>{
      try{
        const response= await axios.put(`http://localhost:8080/api/feedback/${id}`,formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

      }catch(err){
        console.log(err);
        throw err;
      }
    }
  }
)

const useUserStore=create(
    devtools(
        persist(userStore, {
        name:"user",
        })
    )
)

export default useUserStore;