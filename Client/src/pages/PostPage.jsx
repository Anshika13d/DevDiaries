import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function PostPage() {
    const [postInfo, setPostInfo] = useState(null);

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
    <div className='p-8'>
        <div >
            <img className='h-96 w-full object-cover' src={`http://localhost:3000/${postInfo.cover}`} alt="" />
        </div>
        <h1 className='text-4xl font-bold text-teal-950 pt-5 pb-6'>{postInfo.title}</h1>
        <p className='text-gray-900 pb-3'>Author: {postInfo.author.username}</p>
        <i className='text-gray-700 pb-6'>Summary in brief: {postInfo.summary}</i>
        <div className='pt-8' dangerouslySetInnerHTML={{__html:postInfo.content}} />
    </div>
  )
}

export default PostPage