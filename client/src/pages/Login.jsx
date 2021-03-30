import { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useAuth } from "../hooks/useAuth"

import Input from '../components/Input'

export default function Login() {
    const [credentials, setCredentials] = useState({ user: '', password: ''})
	const history = useHistory()
	const location = useLocation()
	const auth = useAuth()

	const { from } = location.state || { from: { pathname: '/' } }

    const { user, password } = credentials

	const handleLogin = () => {
        if (!user || !password) return
        auth.signIn(user, password, () => { history.replace(from) })
    }

    const handleChange = (e) => {
        const { value, name } = e.target
        setCredentials({ ...credentials, [name]: value })
    }

    console.log(credentials)

	return (
		<div>
			<p>You must log in to view the page at {from.pathname}</p>
            <Input name='user' placeholder='Usuario' onClick={handleChange} />
            <Input name='password' placeholder='Contraseña' onClick={handleChange} />
			<button onClick={handleLogin}>Entrar</button>
		</div>
	)
}