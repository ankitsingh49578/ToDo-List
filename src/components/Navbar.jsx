import React from 'react'
import NotesIcon from '@mui/icons-material/Notes';

function Navbar() {
  return (
    <nav className='flex below-1024:justify-evenly justify-between p-3.5 bg-[#716c6cdd] text-white'>
        <div className='logo'>
            <span className='font-bold text-xl above-1024:ml-20'><NotesIcon></NotesIcon> ToDo</span>
        </div>
        <ul className="flex gap-14 text-[18px] above-1024:mr-20">
            <li className='cursor-pointer hover:font-bold transition-all duration-50'><a href="#">Home</a></li>
            <li className='cursor-pointer hover:font-bold transition-all duration-50'><a href="#">My Tasks</a></li>
        </ul>
    </nav>
  )
}

export default Navbar