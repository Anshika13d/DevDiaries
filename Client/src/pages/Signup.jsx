import React, { useState } from 'react'
import axios from 'axios';
import { motion } from "framer-motion"

function Signup() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:3000/signup' ,{
        username,
        email,
        password
      })
      alert("Your dev account is created!")
    }catch(err){
      alert("Registeration unsuccessful")
    }
    
  }

  return (
    <motion.div 
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-teal-950 text-3xl font-bold text-center mb-6">Sign up</h1>
        <form onSubmit={signup}>

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
              htmlFor="email">Enter Your Email</label>
            <input 
              className="border p-2 w-full rounded-md" 
              type="text" 
              id="email" 
              placeholder="ex: johnDoe@gmail.com" 
              value={email}
              onChange={e => {setEmail(e.target.value)}}
              />
          </div>

          <div className="mb-4">
            <label 
              className="block text-gray-700 mb-2" 
              htmlFor="email">Password</label>
            <input 
              className="border p-2 w-full rounded-md" 
              type="password" 
              id="password" 
              placeholder="********"
              value={password}
              onChange={e => {setPassword(e.target.value)}}
            />
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.1 }}
            className="mt-5 border rounded-md w-full bg-teal-950 text-white py-2">
              Sign up
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}

export default Signup