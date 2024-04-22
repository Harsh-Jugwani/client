import React, { useState } from "react";
import logo from "../utils/Group 15.svg";
import threeDot from "../utils/Group 5.svg";
import TaskForm from "./TaskForm";
import Menu from "./Menu";
import { useMyContext } from "../App";

const Header: React.FC = () => {
  const { key, alldata } = useMyContext();//getting the data from App.tsx with useContext

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [menu, setMenu] = useState(false);

  return (
    <div className="h-[100px] border-b-[1px] dark:bg-[#2B2C37] dark:border-gray-700">
      <div className="flex justify-between">
        <div className="flex">
          <img className="pl-[32.78px] pt-[20px]" src={logo} alt="logo" />
          <h1 className="pl-[15.76px] pt-[28.78px] text-3xl font-extrabold dark:text-white">
            Kanban
          </h1>
          <h1 className="mt-11 text-3xl ml-24 w-full font-bold dark:text-white">
            {alldata[key - 1].name}
          </h1>
        </div>

        <div className="flex">
          <button
            onClick={() => setShowTaskForm(true)}
            className="mt-[24px] w-[164px] h-[48px] bg-[#635FC7] rounded-3xl text-white font-bold hover:bg-indigo-400"
          >
            +Add new task
          </button>
          <img
            src={threeDot}
            className="mt-[33px] pr-[37px] pl-[40px] cursor-pointer h-[30px]"
            alt=""
            onClick={() => setMenu(!menu)}
          />
        </div>
      </div>

      {showTaskForm && <TaskForm onClose={() => setShowTaskForm(false)} />}
      {menu && <Menu onClose={() => setMenu(false)} />}
    </div>
  );
};

export default Header;

