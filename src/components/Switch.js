
import React, { useState } from 'react'
import sun from '../utils/110801_sun_icon.svg';
import moon from '../utils/Combined Shape.svg'
import classNames from 'classnames';

const Switch = () => {
   
    const [isSelected, setIsSelected] = useState(false)
    localStorage.setItem("dark",isSelected)
  return (
    <div className='absolute flex  text-[#828FA3] bottom-24 bg-[#F4F7FD]  w-[196px] pl-[38px] h-[48px] border mx-[24px] items-center'>
        <img src={sun} className='h-[20px] w-[20px] mt-[2px] mr-1 ' alt="" />
    <div className='flex w-10 h-5 bg-[#635FC7] rounded-full transition-all duration-500'>
        <span onClick={()=>{setIsSelected(!isSelected)
            localStorage.setItem("dark",isSelected)}}  className={classNames('h-4 mt-[1.5px] w-4  bg-white rounded-full transition-all duration-500 cursor-pointer',{'ml-5':isSelected})}></span>
    </div>
    <img src={moon} alt="" className='ml-1 h-[20px] w-[20px] '  />
    </div>
  )
}

export default Switch