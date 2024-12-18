import React, { useState } from "react";
import useUserStore from "@/store";


import { FaEye, FaEyeSlash } from "react-icons/fa";


const SignIn = ({setLogin, login}) => {

  
  
 
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const loginuser= useUserStore((state)=> state.loginuser)


  const validateInputs = () => {
    if (!email || !password) {
      alert("All fields are required!");
      return false;
    }
    return true;
  };


  const handelSignIn = async (e) => {
    e.preventDefault();
    
    if (validateInputs()) {
        
      await loginuser({email, password}, "signin")
      .then((res)=>{
        console.log(res);
        alert("Login Success");
      })
      
    .catch((err)=>{
        alert(err?.response?.data.message);
    })
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        
      <form
        onSubmit={handelSignIn}
        className="w-full max-w-md bg-white rounded-lg shadow-md p-6"
      >
        <div className="text-center mb-7 text-gray-600">Dont have an Account?
             <span className="text-blue-500 font-semibold cursor-pointer hover:underline"
              onClick={()=> setLogin(!login)}>Signup</span></div>

        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Sign In
        </h1>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6 relative">
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? (
              <FaEyeSlash className="text-gray-500 hover:text-gray-700" />
            ) : (
              <FaEye className="text-gray-500 hover:text-gray-700" />
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
