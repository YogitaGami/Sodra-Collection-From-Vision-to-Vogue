import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className='flex justify-center flex-col sm:flex-row items-center bg-[#71c1f6] text-black p-4 h-28'>
      <div className='flex flex-col justify-center items-center pr-6'> 
      <p className='text-xl font-bold'>Sodra Collection</p>
      <p className='text-sm font-semibold'>From Vision to Vogue </p>
      </div>
      <div className='flex items-center mt-2'>
        <p> Copyright &copy; {currentYear}</p>
        <p className='mx-2'>|</p>
        <p>All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer
