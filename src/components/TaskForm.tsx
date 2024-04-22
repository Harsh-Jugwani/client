import React, { useRef, useState } from 'react';
import { X } from 'lucide-react';//cross symbol
import {useMyContext} from '../App';//context of central data

interface TaskFormProps {
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose }) => {
  const { key, alldata, updateData } = useMyContext();
  let temp = [...alldata];
  const [Title, setTitle] = useState<string>('');
  const [Description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<string>(temp[key - 1].columns[0].name);
  const [val, setVal] = useState<string[]>([]);
  const modelRef = useRef<HTMLDivElement>(null);
  //  To add the value 
  const handleAdd = () => {
    const value = [...val, ''];
    setVal(value);
  };
   
  const handleChange = (onChangeVal: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const inputData = [...val];
    inputData[i] = onChangeVal.target.value;
    setVal(inputData);
  };

  const handleDelete = (i: number) => {
    const deleteVal = [...val];
    deleteVal.splice(i, 1);
    setVal(deleteVal);
  };
  // To close a form when someone click other than form area.
  const closeModel = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modelRef.current === e.target) onClose();
  };
  // Action after submitting the code
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClose();

    const res = {
      Title: Title,
      Description: Description,
      subTask: val,
      status: status,
    };

    let index = temp[key - 1].columns.findIndex((subTask) => subTask.name === status);//finding index of column having given status name
    temp[key - 1].columns[index].subTasks.push(res);
    updateData([...temp]);//Updating the original data
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
          <h1 className='font-bold text-xl dark:text-white'>Add a New Task</h1>
          <form action='' onSubmit={handleSubmit}>
            <label className='text-[#828FA3] dark:text-white'>Title</label> <br />
            <input
              className='border border-black w-full p-1 dark:bg-[#2B2C37] dark:border-[#828FA3]'
              type='text'
              placeholder='e.g Shopping'
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <br />
            <label className='text-[#828FA3] dark:text-white'>Description(optional)</label> <br />
            <textarea
              placeholder='Enter the descriptions...'
              className='border border-black w-full p-1 dark:bg-[#2B2C37] dark:border-[#828FA3]'
              rows={3}
              cols={70}
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label className='text-[#828FA3] dark:text-white'>Subtasks</label>
            <br />
            {val.map((data, i) => (
              <div key={i} className='mb-3'>
                <input
                  className='border border-black w-[380px] h-[40px] px-1 rounded-md'
                  type='text'
                  value={data}
                  onChange={(e) => handleChange(e, i)}
                  required
                />
                <button onClick={() => handleDelete(i)}>
                  <X size={20} />
                </button>
                <br />
              </div>
            ))}
            <button
              onClick={() => handleAdd()}
              className='bg-[#E4EBFA] text-[#635FC7] p-1 rounded-3xl w-full'
            >
              + Add New Task
            </button>
            <br />
            <label className='text-[#828FA3] dark:text-white'>Status</label>
            <select
              className='border border-black w-full p-1 dark:bg-[#2B2C37] dark:border-[#828FA3] dark:text-white'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {alldata &&
                alldata[key - 1].columns.map((c, index) => (
                  <option key={index} value={c.name}>
                    {c.name}
                  </option>
                ))}
            </select>
            <br />
            <button className='bg-[#635FC7] text-white p-1 rounded-3xl w-full mt-3' type='submit'>
              Create Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
