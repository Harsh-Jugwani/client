import React, { useState } from "react";
import show from "../utils/Shape.svg";
import unshow from "../utils/eye-slash.1.svg";
import noteIcon from "../utils/fluent_board-split-24-regular.svg";
import BoardForm from "./BoardForm";
import sun from '../utils/110801_sun_icon.svg';
import moon from '../utils/Combined Shape.svg'
import Switch from "./Switch";


const SideBar = () => {
  const [toggle, setToggle] = useState(true);
  const [list, setList] = useState(null);
  const [showBoardForm, setShowBoardForm] = useState(false);
  const obj = {
    "data":[{
    "id":1,
    "name":"Todo",
    "columns": [
        {
          "name": "ToDo",
          "subTasks": [
            { "name": "Task 1" },
            { "name": "Task 2" }
          ]
        },
        {
          "name": "In Progress",
          "subTasks": [
            { "name": "Task 3" }
          ]
        }
      ]
    },
    {
        "id":2,
        "name":"Todo2",
        "columns": [
            {
              "name": "To Do2",
              "subTasks": [
                { "name": "Task 1" },
                { "name": "Task 2" }
              ]
            },
            {
              "name": "In Progress",
              "subTasks": [
                { "name": "Task 3" }
              ]
            }
          ]
        }
    ]

}

  return (
    <>
      {toggle && (
        <div className=" w-[300px] bg-[#FFFFFF] h-screen rounded-sm border border-l-[#E4EBFA]  ">
          <div className="">
            <h1 className="text-[#828FA3] text-[17px] ml-[32px] mb-2">ALL BOARDS ({obj.data.length})</h1>
            {obj.data.map((e)=>{
              return(
                <div className="w-[226px] h-[48px] mb-2 rounded-r-3xl bg-[#635FC7] text-white flex justify-center items-center">{e.name}</div>
              );
            })}
            <button
              onClick={() => setShowBoardForm(true)}
              className="flex py-1 px-2 rounded-sm text-center  h-[19px]"
            >
              <img src={noteIcon} alt="" className=" mt-2" /> <h1 className="text-[19px] text-[#635FC7]">+Create New Board</h1>
            </button>
          </div>
          <Switch/>
          <button
            onClick={() => setToggle(!toggle)}
            className="absolute flex text-[#828FA3] bottom-12 ml-4 w-[276px] pl-[31px] h-[19px]"
          >  
          <img src={unshow} className="pt-[2px]" alt="" /><h1 className="h-[19px] w-[94px] ml-[13px]">Hide Sidebar</h1>
          </button>
        </div>
      )}
      {!toggle && (
        <button
          onClick={() => setToggle(!toggle)}
          className="absolute bg-[#635FC7] flex bottom-7 w-[56px] h-[48px] rounded-r-3xl"
        >
          {" "}
          <img src={show} className="pl-[18px] pt-[19px]" alt="" />{" "}
        </button>
      )}
      {showBoardForm && <BoardForm onClose={() => setShowBoardForm(false)} data = {obj.data} title='Add New Board' Save='Create New Board' />}
      
    </>
  );
};

export default SideBar;
