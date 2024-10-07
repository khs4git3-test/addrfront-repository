import { Snackbar, Stack } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { REST_URL } from '../constants'
import AddressList from './Addresslist'

function Login(){
    const [open, setOpen] = useState(false)

    const [user, setUser] = useState( {username: '', password: ''} )
    const changeHandler = e => {
        setUser({...user, [e.target.name]:e.target.value})
    } 

    const [auth, setAuth] = useState(false)
    const login = () => {
        fetch(REST_URL + 'login', {
            method: 'POST', 
            headers: {'Content-Type':'application/json'}, 
            body: JSON.stringify(user)
        })
        .then(response => {
            const jwtToken = response.headers.get('Authorization')
            //console.log(`jwtToken ${jwtToken}`)
            if(jwtToken !== null){
                sessionStorage.setItem('jwt', jwtToken)
                setAuth(true)
            }else{
                setOpen(true)
            }
        })
        .catch(err => {
            console.log(err)
            setOpen(true)    
        })
    }

    const logout = () => { //추가 
        sessionStorage.removeItem("jwt")
        setAuth(false) 
    }
    if(auth){
        return <AddressList logout={()=>logout} username={user.username}/>    
    }else{
        return(
            <div>
            <Stack spacing={2} alignItems='center' mt={2}>
            <TextField label='아이디' name = 'username' onChange={changeHandler}/>
            <TextField type='password' label='비밀번호' name='password' onChange={changeHandler}/>
            <Button color='primary' variant='outlined' onClick={login}>로그인</Button>
            </Stack>
            <Snackbar open={open}
                autoHideDuration={3000}
                onClose={()=>setOpen(false)}
                message='로그인 실패! 아이디나 비밀번호를 확인해보세요'/>
            </div>
        )     
    }
}
export default Login