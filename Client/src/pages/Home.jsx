import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import {motion, useScroll} from 'framer-motion';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import create from '../assets/create.jpeg'
import explore from '../assets/explore.jpg'
import learn from '../assets/learn.jpg'
import side from '../assets/side.png'
import { Link, Route, Routes } from 'react-router-dom';
import Explore from './Explore';

function Home() {
  //const[posts, setPosts] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 200, // offset (in px) from the original trigger point
      easing: 'ease-in-out', // AOS easing options
    });
  }, []);

  return (
    <>
    <div className='w-full h-screen flex items-center justify-center'>
      <div className="text-center w-3/4">
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
          className="mt-6 text-lg leading-8 text-gray-600 text-center">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
              fugiat veniam occaecat fugiat aliqua.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequene
        </motion.p>
      </div>
    </div>

    <div className='grid grid-cols-2  justify-items-center'>
      
      <div className='container text-center w-full'>
      <div
        data-aos="slide-right" 
        className='mb-20 flex items-center space-x-20 bg-teal-800 p-8 sm:p-22 md:p-22'
        style={{ minHeight: '10rem' }} // Adjust the height as needed
      >
        <img className='h-60' src={create} alt="Create" />
        <h1 className='text-4xl font-bold text-white min-h-full flex items-center'>
          Create.
        </h1>
      </div>

        <div
          data-aos="slide-right"
          className='mb-20 flex items-center justify-end space-x-20 bg-teal-800 p-8 sm:p-10 md:p-22' 
        >
          <h1 className='text-4xl font-bold text-white'>
            Explore.
          </h1>
          <img className='h-60' src={explore} alt="Explore" />
        </div>

        <div
          data-aos="slide-right" 
          className='mb-20 flex items-center space-x-20 bg-teal-800 p-8 sm:p-10 md:p-22'
        >
          <img className='w-96 h-60' src={learn} alt="Learn" />
          <h1 className='text-4xl font-bold text-white'>
            Learn.
          </h1>
        </div>

        
      </div>
      <div className="container flex justify-center items-center">
        <img className='h-screen' src={side} alt="Create" />
      </div>
    </div>

    <motion.button
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.1 },
        }}
        className='border mb-28 flex justify-center items-center rounded-md mx-auto font-bold w-80 h-20 bg-teal-900 text-white'
      >
        <Link to='/explore' className='flex justify-center items-center text-xl w-full h-full'>
          Explore Our Latest Blogs
        </Link>
      </motion.button>

        <div>
          <h1 className='text-4xl text-teal-950 text-center p-10 font-bold'>Promote Your Blogs!</h1>
        </div>

      <Routes>
        <Route path='/explore' element={<Explore/>} />
      </Routes>
    </>
  );
}

export default Home;
