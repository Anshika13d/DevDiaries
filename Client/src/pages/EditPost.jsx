import React, { useEffect, useState } from 'react'

import { Navigate, useParams } from 'react-router-dom';
import {motion} from 'framer-motion'
import axios from 'axios';
import Editor from '../components/Editor';


function EditPost() {
    const {id} = useParams()
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [files, setFiles] = useState(null)
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
      try{
        const editPost = async () => {
          const res = await axios.get('http://localhost:3000/post/'+id)
          setTitle(res.data.title)
          setSummary(res.data.summary)
          setContent(res.data.content)
        } 
        editPost()
      }
      catch(e){
        alert('Error occurred while editing post')
      }
      
    } ,[])

    async function updatePost (e) {
      const data = new FormData();
      data.set('title', title)
      data.set('summary', summary)
      data.set('content', content)
      data.set('id', id)
      if(files?.[0]){
        data.set('file', files?.[0])
      }

      e.preventDefault()
      const res =  await axios.put('http://localhost:3000/post', data, {
        withCredentials:true
      })

      if(res){
        setRedirect(true)
      }
    }


    if(redirect){
      return <Navigate to={'/post/'+id} />
    }

    return (
      <div className="mt-10 bg-white p-6 shadow-lg rounded-lg max-w-7xl mx-auto">
          <motion.h1 
              initial={{ y: -30 }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
             className='text-teal-950 font-bold flex text-center justify-center text-4xl mx-auto mt-4 mb-14'>Make your Changes... 
          </motion.h1>
        <form className="space-y-4" onSubmit={updatePost}>
          <input
            type="text"
            placeholder="Title"
            className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
            value={title}
            onChange={ev => setTitle(ev.target.value)}
          />
          <textarea
            type="text"
            placeholder="Summary"
            className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
            value={summary}
            onChange={ev => setSummary(ev.target.value)}
          />
          <input
            type="file"
            className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600"
            onChange={ev => setFiles(ev.target.files)}
          />
          
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <Editor onChange={setContent} value={content} />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-950 text-white py-2 rounded-md hover:bg-teal-900 transition duration-200"
          >
            Update Post
          </button>
        </form>
      </div>
    );
}

export default EditPost