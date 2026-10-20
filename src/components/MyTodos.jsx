import React from 'react'
import { useState } from 'react'
// import { todosData } from '../data.js'
import { Button } from '@heroui/react'
import { FaTrash } from 'react-icons/fa'
import { MdDoneOutline } from 'react-icons/md'
import { NewTodo } from './NewTodo'
import { addTodo, completeTodo, deleteTodo, readTodos } from '../api'
import { useEffect } from 'react'
import { Alert } from '@heroui/react'
import { CloseButton } from '@heroui/react'
import { motion } from "motion/react"

export const MyTodos = ({ setIsLoggedIn }) => {
  const [todos, setTodos] = useState(null)
  const [msg, setMsg] = useState('')
  const [remaining, setRemaining] = useState(0)
  const [icon, setIcon] = useState(null)
  const [msgvisible, setmsgvisible] = useState(false)

  useEffect(() => {
    if (!todos) return
    const count = todos.filter(({ complete }) => !complete).length
    setRemaining(count)
  }, [todos])


  useEffect(() => {
    readTodos().then(setTodos)
  }, [])

  const handleDelete = async (id) => {
    console.log(id);
    //setTodos(prev => prev.filter(obj => obj.id != id))
    const data = await deleteTodo(id)
    setMsg(data.msg)
    setTodos(prev => prev.filter(obj => obj.id != id))
    setIcon("danger")
    setmsgvisible(true)
  }

  const handleDone = async (id) => {
    console.log(id)
    //setTodos(prev => prev.map(obj => obj.id == id ? { ...obj, done: !obj.done } : obj))
    const data = await completeTodo(id)
    setMsg(data.msg)
    setTodos(prev => prev.map(obj => obj.id == id ? { ...obj, complete: !obj.complete } : obj))
    setIcon("accent")
    setmsgvisible(true)
  }
  const handleAdd = async (task) => {
    /*const newTodo = {
      id: Date.now(),
      descr,
      done: false
    }*/
    //setTodos(prev => [...prev, newTodo])
    const data = await addTodo(task)
    readTodos().then(setTodos)
    setMsg(data.msg)
    setIcon("success")
    setmsgvisible(true)
  }

  return (
    <div className='w-full'>
      <motion.div style={{ transform: `translate(-50%, -50%)`, display: `${msgvisible ? 'block' : 'none'}` }} className='absolute left-[50%] right-[50%] top-15 w-full max-w-[400px]' initial={{ top: -100 }}
        animate={{ top: 40 }}
        transition={{duration: 2}}
        >
        <Alert className='max-w-full' status={icon}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{msg}</Alert.Title>
          </Alert.Content>
          <CloseButton />
        </Alert>
      </motion.div>
      <Button variant='danger' className='absolute top-5 right-5' onClick={() => setIsLoggedIn(false)}>Kijelentkezés</Button>
      <div className='w-full max-w-[1200px] bg-white p-10 rounded-4xl shadow-2xl mx-auto'>
        <h2 className='flex items-center flex-col p-3 max-w-3xl m-auto font-bold text-3xl'>My Todos</h2>
        <NewTodo handleAdd={handleAdd} />
        <ul className='flex flex-col gap-3 shadow-md max-w-3xl m-auto'>
          {todos && todos.map(({ id, task, complete }) =>
            <li key={id} className='flex justify-between p-5 border-b-2'>
              <Button isIconOnly variant="tertiary" onClick={() => handleDone(id)}>
                <MdDoneOutline style={{ color: complete ? 'green' : 'gray' }} />
              </Button>

              <div style={{ textDecoration: complete ? "line-through" : "" }}>{task}</div>

              <Button isIconOnly aria-label="Delete" variant="danger" onClick={() => handleDelete(id)}>
                <FaTrash />
              </Button>
            </li>
          )}
        </ul>
        <h3 className='text-center font-bold mt-5'>{remaining == 0 ? "No reamining todos left!" : `${remaining} Todos left!`}</h3>
      </div>
    </div>
  )
}


