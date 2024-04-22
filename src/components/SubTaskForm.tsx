import React, { useRef, useState } from 'react';
import { useMyContext } from '../App';
import { X} from 'lucide-react';
import threeDot from '../utils/Group 5.svg';
import SubTaskMenu from './SubTaskMenu';

interface SubTaskFormProps {
  data: {
    Title: string;
    Description: string;
    subTask: string[];
  };
  columnName: string;
  onClose: () => void;
}

const SubTaskForm: React.FC<SubTaskFormProps> = ({ data, columnName, onClose }) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [showSubTaskForm, setShowSubTaskForm] = useState(false);
  const { key, alldata, updateData } = useMyContext();
  const [status, setStatus] = useState(alldata[key-1]?.columns[0]?.name);//getting default status of data
  const modelRef = useRef<HTMLDivElement>(null);//ref. to entire comp.

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {//to handle the multiple checkbox input
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckedItems([...checkedItems, value]);
    } else {
      setCheckedItems(checkedItems.filter((item) => item !== value));
    }
  };
   // For Closing the form when someone click other than form area.
  const closeModel = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modelRef.current === e.target) onClose();
  };
  //To handle the form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose();

    let dummy = [...alldata];//Creating the copy of original data
    let doneColumn = dummy[key - 1].columns.filter((column) => column.name === columnName);
    let filterSubtask = doneColumn[0].subTasks.filter((subTask) => subTask.Title === data.Title);
    let s = doneColumn[0].subTasks.findIndex((subTask) => subTask.Title === data.Title);
    const ReplaceCol = dummy[key - 1].columns.filter((column) => column.name === status);
    let result = data.subTask.filter((x) => !checkedItems.includes(x));
    const res = {
      Title: data.Title,
      Description: data.Description,
      subTask: result,
      status: status,
    };
    filterSubtask[0] = res;//manipulating the data

    if (status !== columnName) {
      ReplaceCol[0].subTasks.push(res);
      doneColumn[0].subTasks.splice(s, 1);
    }

    updateData([...dummy]);//Updating the original data
  };

  return (
    <div
      ref={modelRef}
      onClick={closeModel}
      className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'
    >
      <div className='mt-10 flex flex-col gap-4 text-black w-[480px]'>
        <button onClick={onClose} className='place-self-end'>
          <X size={30} />
        </button>
        <div className='bg-white rounded-xl flex flex-col gap-5 px-6 py-10 mx-4 dark:bg-[#2B2C37]'>
          <div className='flex justify-between'>
            <h1 className='font-bold text-xl dark:text-white'>{data.Title}</h1>
            <img
              onClick={() => setShowSubTaskForm(!showSubTaskForm)}
              src={threeDot}
              className='pt-[5px] pr-[20px]  cursor-pointer'
              alt=''
            />
            {showSubTaskForm && <SubTaskMenu onClose={() => setShowSubTaskForm(false)} />}
          </div>
          <h1 className='font-bold text-[#828FA3 text-sm dark:text-white'>{data.Description}</h1>
          <form action='' onSubmit={handleSubmit}>
            <label className='text-[#828FA3] dark:text-white'>Subtasks</label>
            <br />
            {data.subTask.map((x) => (
              <div
                key={x}
                className={`flex mb-2 p-2 rounded-md dark:bg-[#2B2C37] dark:text-white dark:border-[#828FA3] ${
                  checkedItems.includes(x) ? 'bg-[#D1D0EF]' : 'bg-white'
                }`}
              >
                <input
                  className='mr-2'
                  type='checkbox'
                  onChange={handleCheckboxChange}
                  value={x}
                  name=''
                  id=''
                />
                {checkedItems.includes(x) ? <s>{x}</s> : <h2 className='font-semibold'>{x}</h2>}
              </div>
            ))}
            <br />
            <label className='text-[#828FA3] dark:text-white'>Current Status</label>
            <select
              className='border border-black w-full p-1 dark:bg-[#2B2C37] dark:text-white dark:border-[#828FA3]'
              name=''
              id=''
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {alldata &&
                alldata[key - 1].columns.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
            </select>
            <br />
            <button className='bg-[#635FC7] text-white p-1 rounded-3xl w-full mt-3' type='submit'>
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubTaskForm;
