import { Link, NavLink, Route, Routes } from 'react-router-dom';
import logo from './assets/DevDiaries_transparent.png'
import { motion } from 'framer-motion'
import About from './pages/About';
import MyItems from './pages/MyItems';
import Explore from './pages/Explore';
import ContactUs from './pages/ContactUs';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';

function App() {
  const {setUserInfo, userInfo} = useContext(UserContext);
  
  useEffect( () => {
     axios.get('http://localhost:3000/profile', {
      withCredentials: true
    })
    .then(response => {
        setUserInfo(response.data)
    })
    .catch(error => {
      console.error("Error fetching profile:", error);
    });
  }, [])

  function logout(){
    axios.post('http://localhost:3000/logout',{}, {
      withCredentials: true,
    })
    .then(() => {
      setUserInfo(null)
    })
    .catch(error => {
      console.error("Error logging out:", error);
    });
  }

  const username = userInfo?.username;

  return (
    <>
      <div className="w-full p-5 shadow-md border-b border-gray-300 ">
        <header className='mx-auto'>
          <nav className='container w-full flex items-center justify-between ml-4'>
            <div className='flex items-center'>
              {/* <img className='w-14' src={logo} alt="DevDiaries" /> */}
              <Link to='/' className='ml-2 font-bold text-2xl text-teal-950'>DevDiaries</Link>
            </div>
            <div>
              <ul className='flex space-x-6'>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
                <Link to='/explore'>Explore</Link>
                <Link to='/myitems'>My Items</Link>
                <Link to='/contactus'>Contact Us</Link>
              </ul>
            </div>

            <div className='flex space-x-5'>
              {username && (
                <>
                  <Link to='/create'> Create new post</Link>
                  <a className='cursor-pointer' onClick={logout}>Logout</a>
                </>
              )}
              {!username && (
                <>
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
                </>
              )}
              
            </div>
          </nav>
        </header>
      </div>

      

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/myitems' element={<MyItems />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/create' element={<CreatePost />} />
        <Route path='/post/:id' element={<PostPage />} />
      </Routes>



      <div className="container mx-auto mt-8">
        <footer className="border-t border-gray-300 pt-5 pb-10">
          <div className="flex justify-center">
            <ul className='flex space-x-6'>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/about'>About</Link></li>
              <li><Link to='/explore'>Explore</Link></li>
              <li><Link to='/myitems'>My Items</Link></li>
              <li><Link to='/contactus'>Contact Us</Link></li>
            </ul>

            
          </div>
          <br />
          <div className='flex justify-center'>
          <ul className='flex space-x-6 text-sm text-gray-700'>
              <li><Link to='/'>Terms and Conditions </Link></li>
              <li><Link to='/about'>Policy</Link></li>
              <li><Link to='/explore'>Privacy</Link></li>
            </ul>
          </div>

          
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">© 2024 DevDiaries. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );

}

export default App;
