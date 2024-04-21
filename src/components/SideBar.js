import React, { useState } from "react";
import show from "../utils/Shape.svg";
import unshow from "../utils/eye-slash.1.svg";
import noteIcon from "../utils/fluent_board-split-24-regular.svg";
import BoardForm from "./BoardForm";
import Switch from "./Switch";
import MainContainer from "./MainContainer";
import { useMyContext } from "../App";
import BoardIcon from "../utils/BoardIcon.svg";

const SideBar = () => {
  const { updateValue, key, alldata, updateData } = useMyContext();
  const [highlightedIndex, setHighlightedIndex] = useState(1);
  const [toggle, setToggle] = useState(true);
  const [showBoardForm, setShowBoardForm] = useState(false);

  const handleDivClick = (index) => {
    setHighlightedIndex(index);
  };

  return (
    <>
      {toggle && (
        <div className=" dark:bg-[#2B2C37] w-[300px] bg-[#FFFFFF] h-screen rounded-sm border border-l-[#E4EBFA] dark:border-gray-700  ">
          <div className="">
            <h1 className="text-[#828FA3] text-[15px] ml-[32px] mb-2 p-2">
              ALL BOARDS ({alldata.length})
            </h1>
            {alldata &&
              alldata.map((e) => {
                return (
                  <div
                    id="mainColor"
                    onClick={() => {
                      handleDivClick(e.id);
                      updateValue(e.id);
                    }}
                    className={` ${
                      highlightedIndex === e.id
                        ? "bg-[#635FC7] w-[226px]  h-[48px] mb-2 rounded-r-3xl  text-white flex items-center cursor-pointer"
                        : "w-[226px] h-[48px] mb-2 rounded-r-3xl hover:text-[#635FC7]  text-[#828FA3] hover:bg-[#f1f5fc] hover:dark:bg-white flex  items-center cursor-pointer"
                    }`}
                  >
                    <img className="ml-4" src={BoardIcon} alt="" />
                    <h1 className="ml-2">{e.name}</h1>
                  </div>
                );
              })}
            <button
              onClick={() => setShowBoardForm(true)}
              className="flex py-1 px-2 rounded-sm text-center  h-[19px]"
            >
              <img src={noteIcon} alt="" className=" mt-2 ml-2" />{" "}
              <h1 className="text-[19px] ml-1 text-[#635FC7]">
                +Create New Board
              </h1>
            </button>
          </div>
          <Switch />
          <button
            onClick={() => setToggle(!toggle)}
            className="absolute flex text-[#828FA3] bottom-12 ml-4 w-[276px] pl-[31px] h-[19px]"
          >
            <img src={unshow} className="pt-[4px]" alt="" />
            <h1 className="h-[19px] w-full mr-[100px]">Hide Sidebar</h1>
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
      {showBoardForm && (
        <BoardForm
          setAllData={updateData}
          alldata={alldata}
          onClose={() => setShowBoardForm(false)}
          data=""
          title="Add New Board"
          Save="Create New Board"
        />
      )}
      {key && <MainContainer />}
    </>
  );
};

export default SideBar;
