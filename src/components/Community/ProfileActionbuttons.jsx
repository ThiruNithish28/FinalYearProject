import { Mail } from 'lucide-react'
import React from 'react'

const ProfileActionbuttons = () => {
  return (
    <div className='flex gap-3 px-4 w-full justify-end'>
      <button
      className='capitalize bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg'
      >
        follow
      </button>
      <button
      className='bg-gray-text-30 text-white font-semibold py-3 px-4 rounded-lg'
      >
        <Mail size={20}/>
      </button>
    </div>
  )
}

export default ProfileActionbuttons