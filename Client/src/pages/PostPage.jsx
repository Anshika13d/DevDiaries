import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { format } from 'date-fns';
import { UserContext } from '../UserContext';
import { motion } from 'framer-motion'

function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const {userInfo} = useContext(UserContext);

    const{id} = useParams();
    useEffect(() => {
        try{
            const fetchData = async () => {
                const res = await axios.get(`http://localhost:3000/post/${id}`);
                setPostInfo(res.data)
             }
             fetchData()
        }
        catch(e){
            console.log(e)
        }
    }, [])

    if(!postInfo) return ''

  return (
    <div className='container mx-auto px-4 md:px-8 lg:px-12 xl:px-20 pt-10'>
        <div className='mb-6'>
            <img className='h-96 w-full object-cover' src={`http://localhost:3000/${postInfo.cover}`} alt="" />
        </div>
        <h1 className='text-4xl font-bold text-center text-teal-950 pt-5 pb-6'>{postInfo.title}</h1>
        
        <p className='text-gray-900 text-center pb-3 font-bold'>Author: @{postInfo.author.username}</p>
        <time className='text-gray-500 flex text-center justify-center text-sm pb-5' dateTime="">{format(postInfo.createdAt, 'd-MM-yyy, HH:mm')}</time>
        
        {(userInfo.id === postInfo.author._id) && (
            <div className='flex justify-center'>
          <motion.button
  whileHover={{
    scale: 1.05,
    transition: { duration: 0.1 },
  }}
  className="flex items-center justify-center gap-2 border rounded-md p-2 bg-teal-900 text-white"
>
  <Link to={`/edit/${postInfo._id}`} className="flex items-center gap-1">
    Edit this post
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      />
    </svg>
  </Link>
</motion.button>

            </div>
        )}
        <div className='mt-5'>
        <i className='text-gray-700 pb-6'>Summary in brief: {postInfo.summary}</i>

        </div>
        <div className='pt-8' dangerouslySetInnerHTML={{__html:postInfo.content}} />
    </div>
  )
}

export default PostPage