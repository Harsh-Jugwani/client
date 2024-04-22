import React, { useRef } from "react";
import { X } from "lucide-react";
import {useMyContext} from "../App";

interface BoardModificationProps {// defining type of data
  onClose: () => void;
  Title: string;
  Para: string;
  Action: string;
}

const BoardModification: React.FC<BoardModificationProps> = ({
  onClose,
  Title,
  Para,
  Action,
}) => {
  const { key, alldata, updateData } = useMyContext();

  const modelRef = useRef<HTMLDivElement>(null);
  const closeModel = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modelRef.current === e.target) onClose();
  };
  const handleAction = (action: string) => {//handling Action of specific input
    const dumy = [...alldata];
    onClose();

    if (action === "Clear") {
      dumy[key - 1].columns.length = 0;
      updateData([...dumy]);
    }
    if (action === "Delete") {
      dumy.splice(key - 1, 1);
      updateData([...dumy]);
    }
    if (action === "Reset") {
      window.location.reload();//for reset the page.
    }
  };
  return (
    <div
      ref={modelRef}
      onClick={closeModel}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="mt-10 flex flex-col gap-4 text-black w-[480px]">
        <button onClick={onClose} className="place-self-end">
          <X size={30} />
        </button>
        <div className="bg-white rounded-xl flex flex-col gap-5 px-6 py-10 mx-4 dark:bg-[#2B2C37]">
          <h1 className="font-bold text-xl text-red-600 dark:text-white">
            {Title}
          </h1>
          <p className="dark:bg-[#2B2C37]">{Para}</p>
          <div className="flex">
            <button
              onClick={() => handleAction(Action)}
              className="bg-red-500 px-16 rounded-3xl py-2 text-white mr-3"
            >
              {Action}
            </button>
            <button className="bg-[#b5cdff] px-16 rounded-3xl py-2 text-blue-800 ml-5">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardModification;

