import React, { useRef, useState } from 'react'
import { X } from 'lucide-react';

const TaskForm = ({onClose}) => {
    const modelRef = useRef();
    const [val, setVal] = useState([]);
    const handleAdd = () =>{
        const value = [...val,[]]
        setVal(value)
    }
    const handleChange = (onChangeVal,i) =>{
        const inputData = [...val]
        inputData[i]=onChangeVal.target.value;
        setVal(inputData)
    }
    const handleDelete = (i) =>{
        const deleteVal = [...val]
        deleteVal.splice(i,1)
        setVal(deleteVal)
    }
    const closeModel = (e) =>{
        if(modelRef.current===e.target) onClose();
    }
  return (
    <div ref={modelRef} onClick={closeModel} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
        <div className='mt-10 flex flex-col gap-4 text-black w-[480px]'>
            <button onClick={onClose} className='place-self-end'><X size={30}/></button>
            <div className='bg-white rounded-xl flex flex-col gap-5 px-6 py-10 mx-4 '>
            <h1 className='font-bold text-xl'>Add a New Task</h1>
            <form action="">
                <label className='text-[#828FA3]'>Title</label> <br />
                <input className='border border-black w-full p-1' type="text" placeholder='e.g Shopping' required/><br />
                <label className='text-[#828FA3]'>Description(optional)</label> <br />
                <textarea placeholder='Enter the descriptions...' className='border border-black w-full p-1' rows="3" cols="70"></textarea>
                <label className='text-[#828FA3]'>Subtasks</label><br />
                <select className='border border-black w-full p-1' name="" id="">
                <option value=""></option>
                <option value=""></option>
                </select>
                {val.map((data,i)=>{
                    return(<>
                        <input className='border border-black w-[485px] p-1 my-2' type="text" onChange={(e)=>{handleChange(e,i)}} />
                        <button className='pt-1' onClick={()=>handleDelete(i)}><X size = {20}/></button>
                        <br />
                        </>
                    )
                })}
            </form>
            <button onClick={()=>handleAdd()} className='bg-[#E4EBFA] text-[#635FC7] p-1 rounded-3xl '>+ Add New Column</button>
            <label className='text-[#828FA3]'>Status</label>
            <select className='border border-black w-full p-1' name="" id="">
                <option value=""></option>
                <option value=""></option>
            </select>
            <button className='bg-[#635FC7] text-white p-1 rounded-3xl'>Create New Board</button>
            </div>
        </div>
    </div>
  )
}

export default TaskForm