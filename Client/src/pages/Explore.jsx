import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import axios from 'axios';

function Explore() {
  const[posts, setPosts] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3000/post',)
      .then(res => setPosts(res.data))
      .catch(error => {
        console.error("Error fetching posts:", error);
      });
  }, [])

  return (
    <div>
      <div className='flex p-20'>
        <h1 className='text-4xl text-teal-950 font-bold w-full h-full justify-center text-center'>From Our Developers...</h1>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 justify-items-center'>
        {posts.length > 0 && posts.map(post => (
          <Card key={post._id} {...post} />
        ))}
      </div>
    </div>
  )
}

export default Explore