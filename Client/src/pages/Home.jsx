import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import {motion} from 'framer-motion';
import axios from 'axios';

function Home() {
  const[posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/post')
      .then(res => {setPosts(res.data)})
      .catch(error => {
        console.error("Error fetching posts:", error);
      });
  }, [])

  return (
    <>
    <div className='w-full h-screen flex items-center justify-center'>
      <div className="text-center container w-3/4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto rounded-full px-3 py-1 text-sm leading-6 text-teal-950 ring-1 ring-teal-950/10 hover:ring-teal-950/20">
          Get all your requirements here.
        </motion.div>
        <motion.h1 
           initial={{ scale: 0.8 }}
           animate={{ scale: 1 }}
           transition={{ duration: 0.5 }}
           className='text-teal-950 text-4xl font-bold tracking-tight sm:text-6xl mt-8'>Data to enrich your Development</motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 text-lg leading-8 text-gray-600">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam occaecat fugiat aliqua.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequene
        </motion.p>
      </div>
    </div>

    <div className='container mx-auto p-4'>
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0'>
        {posts.length > 0 && posts.map(post => (
          <Card key={post._id} {...post} />
        ))}
      </div>
    </div>
    </>
  );
}

export default Home;
