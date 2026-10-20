import axios from "axios"

const baseURL = import.meta.env.VITE_API_URL

export const login = async (username, password)=>{
    const response = await axios.post(baseURL+'/todos/login', {username, password})
    return response.data
}

export const readTodos= async ()=> {
    const response=await axios.get(baseURL+"/todos")
    return response.data
}

export const addTodo = async (task)=> {
    const response = await axios.post(baseURL+"/todos", {task})
    return response.data
}

export const deleteTodo = async (id)=>{
    const response = await axios.delete(baseURL+"/todos/"+id)
    return response.data
}

export const completeTodo = async (id)=>{
    const response = await axios.patch(baseURL+"/todos/"+id)
    return response.data
}