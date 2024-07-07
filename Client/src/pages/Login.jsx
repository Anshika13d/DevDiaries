import React, { useContext, useState } from 'react';
import {motion} from 'framer-motion'
import Swal from 'sweetalert2';
import axios from 'axios';
import {Navigate} from 'react-router-dom';
import { UserContext } from '../UserContext';

function Login() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)
  const {setUserInfo} = useContext(UserContext)

  async function login(e){
    e.preventDefault()
    try{
      const res = await axios.post('http://localhost:3000/login',{
          username,
          password
        },{
          withCredentials: true
        }
      )
        setUserInfo(res.data)
        setRedirect(true)
      
      // Swal.fire({
      //   title: "Login successful.",
      //   width: 600,
      //   padding: "3em",
      //   color: "#134E4A",
      //   background: "#fff url(https://sweetalert2.github.io/images/trees.png)",
      //   backdrop: `
      //     rgba(19, 78, 74, 0.9)
      //     url("https://sweetalert2.github.io/images/nyan-cat.gif")
      //     left top
      //     no-repeat
      //   `
      // });
    }
    catch(e){
      alert("Please enter correct credentials")
      console.error(e);
    }
  }

  if(redirect){
    return <Navigate to={"/"} />
  }

  return (
    <motion.div 
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-teal-950 text-3xl font-bold text-center mb-6">LogIn</h1>

        <form onSubmit={login}>

          <div className="mb-4">
            <label 
              className="block text-gray-700 mb-2" 
              htmlFor="username">Enter Your UserName</label>
            <input 
              className="border p-2 w-full rounded-md" 
              type="text" 
              id="username" 
              placeholder="ex: johnDoe"
              value={username}
              onChange={e => {setUsername(e.target.value)}}  
            />
          </div>

          <div className="mb-4">
            <label 
              className="block text-gray-700 mb-2" 
              htmlFor="password">Password</label>
            <input 
              className="border p-2 w-full rounded-md" 
              type="password" 
              id="password" 
              placeholder="********" 
              value={password}
              onChange={e => {setPassword(e.target.value)}}  
            />
          </div>

          <motion.button whileHover={{ scale: 1.1 }} className="mt-5 border rounded-md w-full bg-teal-950 text-white py-2">Login</motion.button>
        </form>
      </div>
    </motion.div>
  );
}

export default Login;
