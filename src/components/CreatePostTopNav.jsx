import React from 'react'

const CreatePostTopNav = () => {
  return (
    <nav className='sticky top-0 w-full h-2 px-9 py-6 border-b border-gray-border  text-white flex justify-between items-center z-10'>
      <div className='flex items-center justify-between gap-4 lg:w-[65dvw] w-full'>
      <div>
        <h1 className='hidden lg:block text-2xl font-bold'>CodeMastery Community</h1>
        <p>create post</p>
      </div>
      {/* options */}
      <div className='flex gap-4'>
        <button className=''>Edit</button>  
        <button>preview</button>
        <button className='lg:hidden' id="close-btn">&#10006;</button>
      </div>
      </div>
      <button className='hidden lg:block' id="close-btn">&#10006;</button>
    </nav>
  )
}

export default CreatePostTopNav;