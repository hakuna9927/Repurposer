import React from 'react'

const Navbar = () => {
  return (
    <div>
      <div className='flex justify-between p-10'>
        <div className='text-bold'>LOGO</div>
        <div className='bg-blue-600 text-white px-2 py-1 rounded-md cursor-pointer'>Login</div>
      </div>
    </div>
  )
}

export default Navbar
