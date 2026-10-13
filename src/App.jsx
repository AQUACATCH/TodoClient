import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { MyTodos } from './components/MyTodos'
import './App.css'
import { Login } from './components/Login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  return (
    <div className='flex items-center justify-center h-screen bg-purple-900'>
      {isLoggedIn ? <MyTodos setIsLoggedIn={setIsLoggedIn} className='min-w-[calc(100%-20px)]' /> : <Login setIsLoggedIn={setIsLoggedIn}/>}
    </div>
  )
}

export default App
