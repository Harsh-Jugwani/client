import React, { useRef, useState } from 'react';
import { X } from 'lucide-react';


const BoardForm = ({onClose,data,title,Save}) => {
  console.log(data[0]);  
    
    const modelRef = useRef();
    const [val, setVal] = useState([]);
    const [inputs, setInputs] = useState({});
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
    const handleSubmit = (e) =>{
        e.preventDefault();
       console.log(inputs);
    }
    const handleRes = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
  return (
    <div ref={modelRef} onClick={closeModel} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
        <div className='mt-10 flex flex-col gap-4 text-black w-[480px]'>
            <button onClick={onClose} className='place-self-end'><X size={30}/></button>
            <div className='bg-white rounded-xl flex flex-col gap-5 px-6 py-10 mx-4 '>
            <h1 className='font-bold text-xl'>{title}</h1>
            <form onSubmit={handleSubmit}>
                <label className='text-[#828FA3]'>Board name</label> <br />
                <input className='border border-black w-[396px] rounded-md h-[40px] px-1' type="text" name='name' value={inputs.name||""} onChange={handleRes} placeholder='e.g Shopping' required/><br />
                <label className='text-[#828FA3]'>Board Column</label><br />
                {data[0].columns.map((e)=>{
                    return(<div className='mb-3'>
                        <input className='border border-black w-[380px] h-[40px] px-1 rounded-md' name='column' value={inputs.column||[""]} onChange={handleRes}/>
                        <button ><X size = {20}/></button>
                        </div>
                    );
                })}
                {val.map((data,i)=>{
                    return(<div className='mb-3'>
                        <input className='border border-black w-[380px] h-[40px] px-1 rounded-md' type="text" onChange={(e)=>{handleChange(e,i)}} />
                        <button onClick={()=>handleDelete(i)}><X size = {20}/></button>
                        <br />
                        </div>
                    )
                })}
            <button onClick={()=>handleAdd()} className='bg-[#E4EBFA] w-full mb-4 text-[#635FC7] p-1 rounded-3xl'>+ Add New Column</button>
            <button type='submit' className='bg-[#635FC7] w-full text-white p-1 rounded-3xl'>{Save}</button>
            </form>
            </div>
        </div>
    </div>
  )
}

export default BoardForm