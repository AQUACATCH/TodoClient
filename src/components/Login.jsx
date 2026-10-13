import { TextField } from '@heroui/react'
import { Button } from '@heroui/react'
import { Form } from '@heroui/react'
import { Label } from '@heroui/react'
import { Link } from '@heroui/react'
import { Input } from '@heroui/react'
import { Card } from '@heroui/react'
import React from 'react'
import { useState } from 'react'

export const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [Error, setError] = useState('')
    //Temp
    const MyUsers = [
        {username: 'Fecaa', password: 'asd12345'},
        {username: 'Bedex', password: 'asd12345'}
    ]

    const handleLogin=()=> {
        const currentUser = MyUsers.find((obj) => obj.username== username)
        if(currentUser != null){
            if(currentUser.password == password){
                setIsLoggedIn(true)
            }else{
                setError('** Wrong Password!')
            }
        } else{
            setError('** Wrong Username!')
        }


    }
    return (
        <Card className="w-full max-w-md">
            <Card.Header>
                <Card.Title className='text-xl text-center'>Login</Card.Title>
                <Card.Description className='text-red-500'>{Error}</Card.Description>
            </Card.Header>
                <Card.Content>
                    <div className="flex flex-col gap-4">
                        <TextField name="username" type="username">
                            <Label>Username</Label>
                            <Input placeholder="Example" variant="secondary" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                        </TextField>
                        <TextField name="password" type="password">
                            <Label>Password</Label>
                            <Input placeholder="••••••••" value={password} onChange={(e)=> setPassword(e.target.value)} variant="secondary" />
                        </TextField>
                    </div>
                </Card.Content>
                <Card.Footer className="mt-4 flex flex-col gap-2">
                    <Button className="w-full" type="submit" onClick={()=> handleLogin()}>
                        Sign In
                    </Button>
                    <Link isDisabled={true} className="text-center text-sm" href="#">
                        Forgot password?
                    </Link>
                </Card.Footer>
        </Card>
    )
}
