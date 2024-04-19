import React, { useState } from 'react'
import BoardForm from './BoardForm';

const MainContainer = ({obj}) => {
  const [edit, setEditForm] = useState(false)
  
  return (
    <div className='bg-[#f4f7fd] w-full flex p-4 h-screen'>
      {obj[0].columns.map((e)=>{
        return(
          <div className='w-[280px]'>
            {e.name}
          </div>
        );
      })}
      <div onClick={()=>setEditForm(!edit)} className='w-[280px] py-1 border bg-[#f1f5fc] text-[#828FA3] text-center pt-[23%] text-xl cursor-pointer'>
        + New Column
      </div>
      {edit && <BoardForm onClose={() => setEditForm(false)} data = {obj} title = "Edit Board" Save = 'Save Changes'/>}
      
      
    </div>
  )
}

export default MainContainer