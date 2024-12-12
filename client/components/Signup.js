import React from 'react'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useUserStore from '@/store';

const Signup = ({setLogin, login}) => {
    const[validation, setValidation]=useState({
        username:"",
        email:"",
        password:"",
        repassword:"",

    });
    const[passwordVisible1, setPasswordVisible1]=useState(false);
    const[passwordVisible2, setPasswordVisible2]=useState(false);
    const loginuser =useUserStore((state)=> state.loginuser)

    const validateInputs = () => {
    
        if (!validation.username || !validation.email || 
            !validation.password || !validation.repassword) {
          alert("All fields are required!");
          return false;
        }
    
        if (validation.password !== validation.repassword) {
          alert("Passwords do not match!");
          return false;
        }
        
        return true;
      };

    const handleSignUp=async(e)=>{
        e.preventDefault();
        if(validateInputs()){
         try{
           await loginuser({username:validation.username, 
            email:validation.email,
            password:validation.password
           }, "signup");
           alert("Login Success");
       }catch(err){
           console.log(err);
    }}
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-7 text-gray-600"
      >Already have an account?<span
      className="text-blue-500 font-semibold cursor-pointer hover:underline"
       onClick={()=> setLogin(!login)}>Signin</span></div>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={validation.username}
              onChange={(e) => setValidation({ ...validation, username: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={validation.email}
              onChange={(e) => setValidation({ ...validation, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>



          <div className="mb-6 relative">
          <input
            type={passwordVisible1 ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={validation.password}
            onChange={(e) => setValidation({...validation, password: e.target.value})}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
            onClick={() => setPasswordVisible1(!passwordVisible1)}
          >
            {passwordVisible1 ? (
              <FaEyeSlash className="text-gray-500 hover:text-gray-700" />
            ) : (
              <FaEye className="text-gray-500 hover:text-gray-700" />
            )}
          </div>
        </div>


          <div className="mb-6 relative">
          <input
            type={passwordVisible2 ? "text" : "password"}
            name="password"
            placeholder="Retype Password"
            value={validation.repassword}
            onChange={(e) => setValidation({...validation, repassword: e.target.value})}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
            onClick={() => setPasswordVisible2(!passwordVisible2)}
          >
            {passwordVisible2 ? (
              <FaEyeSlash className="text-gray-500 hover:text-gray-700" />
            ) : (
              <FaEye className="text-gray-500 hover:text-gray-700" />
            )}
          </div>
        </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default Signup