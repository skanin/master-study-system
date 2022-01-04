import {React, useEffect} from 'react'
import { useSubject } from '../../hooks'
import { isAuthenticated, fetch } from './AuthHelperMethods'

const Login = () => {
    const [subject, setSubject] = useSubject();

    useEffect(() => {
        fetch('get', '/login', subject);
    });

    return (
        <h1>Login</h1>
    )
}

export default Login;