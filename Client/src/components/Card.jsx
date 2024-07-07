import React from 'react'
import { format } from "date-fns";
import { Link } from 'react-router-dom';

function Card({_id, title, summary, cover, content, createdAt, author}) {
  return (
    <>
    <div className='pl-20 pr-20 pb-10 '>
        <div className='w-80 h-96 rounded-md shadow-lg overflow-hidden'>
            <Link to={`/post/${_id}`}>
              <img className='w-full object-cover h-44' src={'http://localhost:3000/'+cover} alt="" />
            </Link>
            <div className='px-5 py-3'>
              <Link to={`/post/${_id}`}>
                <h2 className='font-bold text-teal-950 text-xl line-clamp-2'>
                    {title}
                </h2>
              </Link>
                <div className=' py-2'>
                  <ul>
                    <li className='text-gray-600 text-sm'>By: {author.username}</li>
                    <time className='text-gray-500 text-sm' datetime="">{format(createdAt, 'd-MM-yyy, HH:MM')}</time>
                  </ul>
                </div>
                <p className='text-sm line-clamp-3'>{summary}</p>
            </div>
        </div>
    </div>

    
    </>
  )
}

export default Card