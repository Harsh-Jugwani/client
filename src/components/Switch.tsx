import React, { useEffect, useState } from 'react';
import sun from '../utils/sun2.svg';
import moon from '../utils/Combined Shape.svg';

const Switch: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check if dark mode is enabled in local storage, default to false if not found
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    // Save dark mode preference to local storage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));

    // Apply dark mode class to the body element
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleMode = () => {
    setDarkMode((prevMode:any) => !prevMode);
  };

  return (
    <div className='dark:bg-[#20212C] absolute flex text-[#828FA3] bottom-24 bg-[#F4F7FD] w-[196px] pl-[38px] h-[48px] border mx-[24px] items-center dark:border-gray-700'>
      <img src={sun} className='h-[20px] w-[20px] mt-[2px] mr-1' alt='' />
      <button
        onClick={toggleMode}
        className='bg-[#635FC7] w-10 h-6 rounded-full p-1 duration-300 ease-in-out'
      >
        <div
          className={`bg-white dark:bg-gray-600 w-4 h-4 rounded-full shadow-md transform ${
            darkMode ? 'translate-x-4' : ''
          }`}
        ></div>
      </button>
      <img src={moon} alt='' className='ml-1 h-[20px] w-[20px]' />
    </div>
  );
};

export default Switch;
