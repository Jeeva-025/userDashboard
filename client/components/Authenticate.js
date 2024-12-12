import React from 'react'
import { useState } from 'react';
import Signup from './Signup';
import Signin from './Signin'

const Authenticate = () => {

    const[login, setLogin]=useState(false);
  return (
    <div>
        
            {login? <div> 
                
              <Signin setLogin={setLogin} login={login}/>
              
            </div>:<div> 
           
            <Signup setLogin={setLogin} login={login}/>
            
            </div>}

        
    </div>
  )
}

export default Authenticate