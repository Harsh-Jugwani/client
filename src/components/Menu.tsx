import React, {useState} from "react";
import BoardModification from "./BoardModification";
import TaskForm from "./TaskForm";

interface MenuProps {
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ onClose }) => {
  const [editBoard, setEditBoard] = useState(false);
  const [clearBoard, setClearBoard] = useState(false);
  const [deleteBoard, setDeleteBoard] = useState(false);
  const [resetBoard, setResetBoard] = useState(false);
  



  return (
    <div >
      <div className="absolute flex flex-col right-3 top-[105px] bg-white rounded-lg w-40 p-2 dark:bg-[#2B2C37] shadow-lg">
        <ul className="cursor-pointer py-2">
          <li onClick={() => setEditBoard(true)} className="text-[#828FA3] hover:text-black pb-1">
            Edit Board
          </li>
          <li onClick={() => setClearBoard(true)} className="text-[#828FA3] hover:text-black pb-1">
            Clear Board
          </li>
          <li onClick={() => setDeleteBoard(true)} className="text-red-400 hover:text-red-600 pb-1">
            Delete Board
          </li>
          <li onClick={() => setResetBoard(true)} className="text-red-400 hover:text-red-600 pb-1">
            Reset Board
          </li>
        </ul>
      </div>

      {editBoard && <TaskForm onClose={() => setEditBoard(false)} />}
      {deleteBoard && (
        <BoardModification
          onClose={() => setDeleteBoard(false)}
          Title="Delete this Task?"
          Para="Are you sure you want to delete this board? This action will remove all columns and tasks and cannot be reversed."
          Action="Delete"
        />
      )}
      {clearBoard && (
        <BoardModification
          onClose={() => setClearBoard(false)}
          Title="Clear this Board?"
          Para="Are you sure you want to clear this board? This action will remove all columns and tasks and cannot be reversed."
          Action="Clear"
        />
      )}
      {resetBoard && (
        <BoardModification
          onClose={() => setResetBoard(false)}
          Title="Reset all Boards?"
          Para="Are you sure you want to reset all boards? This action will remove all boards, columns, tasks etc which were created by you. This action cannot be reversed."
          Action="Reset"
        />
      )}
    </div>
  );
};

export default Menu;
