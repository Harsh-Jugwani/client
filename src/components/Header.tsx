import React, { useState } from 'react';
import logo from '../utils/Group 16.svg';
import threeDot from '../utils/Group 5.svg'
import TaskForm from './TaskForm';

const handleMenu = () =>{

}

const Header = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [menu, setMenu] = useState()
  return (
    <div className='h-[100px] border-b-[1px]'>
    <div className='flex justify-between'>
        <div className='flex'>
        <img className='pl-[32.78px] pt-[20px]' src={logo} alt="logo" />
        </div>
        <div className=''>
            <h1 className='mt-6'></h1>
        </div>
        <div className='flex'>
            <button onClick={() => setShowTaskForm(true)} className='mt-[24px] w-[164px] h-[48px] bg-[#635FC7] rounded-3xl text-white hover:bg-indigo-400'>+Add new task</button>
            <img src={threeDot} className='pt-[24px] pr-[37px] pl-[40px] cursor-pointer' alt="" onClick={handleMenu}/>
        </div>
        
    </div>
    {showTaskForm && <TaskForm onClose={() => setShowTaskForm(false)} />}
    </div>
  )
}

export default Header