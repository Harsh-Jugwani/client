import React, { useRef, useState } from 'react';
import TaskForm from './TaskForm';

interface SubTaskMenuProps {
  onClose: () => void;
}

const SubTaskMenu: React.FC<SubTaskMenuProps> = ({ onClose }) => {
  const [showTaskiForm, setShowTaskiForm] = useState(false);
  const modelRef = useRef<HTMLDivElement>(null);//getting ref. of entire comp.
  // For Closing the form when someone click other than form area.
  const closeModel = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modelRef.current === e.target) onClose();
  };

  const handleClick = () => {
    setShowTaskiForm(!showTaskiForm);
  };

  const handleDeleteTask = () => {
    onClose();
  };

  return (
    <>
      <div ref={modelRef} onClick={closeModel} className='dark:bg-[#2B2C37] absolute flex flex-col ml-64 mt-10 bg-white shadow-lg rounded-lg  w-40 p-2'>
        <ul className='cursor-pointer py-2'>
          <li onClick={handleClick} className='text-[#828FA3] hover:text-black'>
            Edit Task
          </li>
          <li onClick={handleDeleteTask} className='text-red-400 hover:text-red-600'>
            Delete Task
          </li>
        </ul>
      </div>
      {showTaskiForm && <TaskForm onClose={() => setShowTaskiForm(false)} />}
    </>
  );
};

export default SubTaskMenu;
