import React from 'react'
import { useState } from 'react'
import { IoIosAddCircleOutline } from 'react-icons/io'

export const NewTodo = ({handleAdd}) => {
    const [newTask, setnewTask] = useState("")
console.log(newTask);

const handleSubmit=()=>{
    if(!newTask.trim()) return
    handleAdd(newTask)
    setnewTask("")
}

  return (
    <div className='flex max-w-md m-auto'>
        <input type="text" 
            placeholder='új feladat...'
            value={newTask}
            className='border rounded p-3 flex-1'
            onChange={(e)=>setnewTask(e.target.value)}
        />
        <button onClick={handleSubmit}>
            <IoIosAddCircleOutline  style={{fontSize:'2rem',color:'blue',cursor:'pointer'}}/>
        </button>
    </div>
  )
}

