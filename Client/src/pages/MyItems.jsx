import React, { useContext, useEffect, useState } from 'react'
import Card from '../components/Card'
import axios from 'axios'
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { motion } from 'framer-motion'
import CreatePost from './CreatePost';

function MyItems() {
  const[posts, setPosts] = useState([]);
  const {userInfo} = useContext(UserContext);
  const {id} = useParams()
  

  useEffect(() => {
    try{
      const myitem = async () =>{
        const res = await axios.get(`http://localhost:3000/myitems`,{
          withCredentials: true
        })
        if(res.data === 'nothing to show') setPosts([])
        else setPosts(res.data)
      } 

      myitem()
    }catch(e){
      alert("error agya")
    }
    
  }, [])

  const username = userInfo?.username;

  return (
    <div>
      {username?
        (<h1 className='text-4xl text-teal-950 font-bold text-center p-10'>My Items</h1>) : (<h1 className='text-4xl text-teal-950 font-bold text-center p-10'>Start a Post now!</h1>) 
      }
      <div>
      {posts.length > 0 ? (
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 justify-items-center'>
        {posts.map((post) => (
          <Card key={post._id} {...post} />
        ))}
      </div>) : 
      <>
        {username &&
        <motion.button
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.1 },
            }}
          className='border rounded-md p-1 w-40 bg-teal-900 text-white'>
        <Link to='/create'>Create new post</Link>
        </motion.button>
        }
        {!username && 
          <div className='flex space-x-10 justify-center'>
          <motion.button
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.1 },
              }}
            className='border rounded-md p-1 w-20 bg-teal-900 text-white'>
            <Link to='/login'>Login</Link>
          </motion.button >
          <motion.button
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.1 },
              }}
            className='border rounded-md p-1 w-20 bg-teal-900 text-white'>
            <Link to='/signup'>Sign Up</Link>
          </motion.button>
          </div>
        }
      </>
}
      </div>

      <Routes>
        <Route path='/create' element={<CreatePost />} />
      </Routes>
    </div>
  )
}

export default MyItems