import React from 'react'
import { useState } from 'react'
import { todosData } from '../data.js'
import { Button } from '@heroui/react'
import { FaTrash } from 'react-icons/fa'
import { MdDoneOutline } from 'react-icons/md'
import { NewTodo } from './NewTodo'

export const MyTodos = ({ setIsLoggedIn }) => {
  const [todos, setTodos] = useState(todosData)
  console.log(todos);

  console.log('Backend:',import.meta.env.VITE_API_URL)

  const handleDelete = (id) => {
    console.log(id);
    setTodos(prev => prev.filter(obj => obj.id != id))
  }

  const handleDone = (id) => {
    setTodos(prev => prev.map(obj => obj.id == id ? { ...obj, done: !obj.done } : obj))
  }
  const handleAdd = (descr) => {
    const newTodo = {
      id: Date.now(),
      descr,
      done: false
    }
    setTodos(prev => [...prev, newTodo])
  }

  return (
    <div className='w-full'>
      <Button variant='danger' className='absolute top-5 right-5' onClick={()=> setIsLoggedIn(false)}>Kijelentkezés</Button>
      <div className='w-full max-w-[1200px] bg-white p-10 rounded-4xl shadow-2xl mx-auto'>
        <h2 className='flex items-center flex-col p-3 max-w-3xl m-auto font-bold text-3xl'>My Todos</h2>
        <NewTodo handleAdd={handleAdd} />
        <ul className='flex flex-col gap-3 shadow-md max-w-3xl m-auto'>
          {todos.map(({ id, descr, done }) =>
            <li key={id} className='flex justify-between p-5 border-b-2'>
              <Button isIconOnly variant="tertiary" onClick={() => handleDone(id)}>
                <MdDoneOutline style={{ color: done ? 'green' : 'gray' }} />
              </Button>

              <div style={{ textDecoration: done ? "line-through" : "" }}>{descr}</div>

              <Button isIconOnly aria-label="Delete" variant="danger" onClick={() => handleDelete(id)}>
                <FaTrash />
              </Button>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}


