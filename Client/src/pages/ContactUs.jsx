import React, { useState } from 'react'
import { motion } from 'framer-motion'
import emailJs from 'emailjs-com'
import '../stylesheet.css'

function ContactUs() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function sendMsg(e){
    e.preventDefault()

    emailJs.sendForm('service_5kkpu4b', 'template_e14dq9w', e.target, 'eTJ3t1C_Oemwz2QjJ')
      .then((result) => {
        Swal.fire({
          title: 'Message sent successfully!',
          icon: 'success',
          customClass: {
            confirmButton: 'swal2-confirm'
          }
        });
      }, (error) => {
          console.log(error.text);
      });
  }

  return (
    <motion.div 
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className='flex h-screen w-full items-center justify-center'>
      <div 
        className='bg-white shadow-2xl rounded-lg w-full max-w-md p-8'>
      <h1 
        className='text-center text-teal-950 text-4xl font-bold mb-4'>
          Contact
      </h1>

      <form onSubmit={sendMsg}>
        <div className='mb-4'>
          <label 
            className='flex text-gray-800 mb-2' >
              Username
          </label>
          <input 
            className='w-full border rounded-md border-gray-300 p-2' 
            type="text"
            name='user_name'
            value={username}
            placeholder='ex: John_Doe'
            onChange={(ev) => setUsername(ev.target.value)}  
          />
        </div>
        <div className='mb-4'>
          <label 
            className='flex text-gray-800 mb-2'>Email</label>
          <input 
            className='border w-full rounded-md border-gray-300 p-2'  
            type="email"
            placeholder='ex: JohnDoe@gmail.com'
            name='user_email'
            value={email}
            onChange={ev => setEmail(ev.target.value)}  
          />
        </div>
        <div className='mb-4'>
          <label 
            className='flex text-gray-800 mb-2'>Message</label>
          <textarea 
            className='border w-full rounded-md border-gray-300 p-2'  
            type="text"
            placeholder='Type your message...'
            name='message'
            value={message}
            onChange={ev => setMessage(ev.target.value)}  
          />
        </div>
        <div>
          <button 
            type='submit'
            className='bg-teal-950 text-white p-2 rounded-md w-full'>
              Submit
          </button>
        </div>
      </form>
      </div>
    </motion.div>
  )
}

export default ContactUs