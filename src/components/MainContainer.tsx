import React, { useState } from "react";
import BoardForm from "./BoardForm";
import {useMyContext} from "../App";
import SubTaskForm from "./SubTaskForm";

interface Column {
  name: string;
  subTasks: Array<{
    Title: string;
    subTask: any[]; // You might want to replace `any[]` with a more specific type
  }>;
}

const MainContainer: React.FC = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [columnName, setColumnName] = useState<string | undefined>();
  const [data, setData] = useState<any>(); // You might want to replace `any` with a more specific type
  const { key, alldata } = useMyContext();
  const [edit, setEditForm] = useState<boolean>(false);
  
  const handleClick = (val: any, e: Column) => {//setting the state 
    setColumnName(e.name);
    setData(val);
    setIsClicked(true);
  };


  return (
    <div className="bg-[#f4f7fd] w-full flex p-4 h-screen dark:bg-[#20212C]">
      {alldata[key - 1].columns.map((e: Column) => (
        <div className="w-[280px]" key={e.name}>
          <h1 className="text-[#828FA3]">
            {e.name}({e.subTasks.length})
          </h1>
          <div>
            {e.subTasks.map((c) => (
              <div
                key={c.Title}
                onClick={() => {
                  handleClick(c, e);
                }}
                className="dark:bg-[#2B2C37] w-[260px] text-black bg-[#ffff] my-4 rounded-md p-4 cursor-pointer"
              >
                <h1 className="font-semibold dark:text-white">{c.Title}</h1>
                <p className="text-[#828FA3] text-sm">
                  0 of {c.subTask.length} subtasks
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div
        onClick={() => setEditForm(!edit)}
        className="dark:bg-[#2B2C37] w-[280px] py-1 border-[#E4EBFA] bg-[#f1f5fc] font-bold h-full text-[#828FA3] text-center pt-[23%] text-2xl cursor-pointer"
      >
        + New Column
      </div>
      {edit && (
        <BoardForm
          onClose={() => setEditForm(false)}
          data=""
          title="Edit Board"
          Save="Save Changes"
          setAllData={()=>{}}
          alldata={[]}
        />
      )}
      {isClicked && (
        <SubTaskForm
          data={data}
          columnName={columnName || ""}
          onClose={() => setIsClicked(false)}
        />
      )}
    </div>
  );
};

export default MainContainer;
