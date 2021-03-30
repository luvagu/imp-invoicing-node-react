import { useState } from 'react'
import { Redirect, useHistory, useLocation } from 'react-router-dom'
import { useAuth } from "../hooks/useAuth"

import Input from '../components/Input'

export default function LogIn() {
    const [credentials, setCredentials] = useState({ user: '', password: ''})
	const history = useHistory()
	const location = useLocation()
	const auth = useAuth()

    // Redirect to the path it was called from or fallback to '/'
	const { from } = location.state || { from: { pathname: '/' } }

    const { user, password } = credentials

    const handleChange = (e) => {
        const { value, name } = e.target
        setCredentials({ ...credentials, [name]: value })
    }

	const handleLogin = () => {
        if (!user || !password) return
        auth.signIn(credentials, () => { history.replace(from) })
    }

	return auth.token ? (<Redirect to={from} />) : (
		<div className="container sm:sm-mw md:md-mw lg:lg-mw mx-auto px-4 md:px-6 py-4 md:py-6">
            <h3 className="text-black text-3xl font-medium">Entrar</h3>

            <div className="flex flex-col mt-6">
                <p className="mb-4">Debes iniciar sesión para ir a {from.pathname}</p>

                <div className="w-full sm:w-64 mb-4">
                    <Input extraClass='mb-4' name='user' placeholder='Usuario' onChange={handleChange} />
                    <Input extraClass='mb-4' type='password' name='password' placeholder='Contraseña' onChange={handleChange} />
                    <button
                        type="button"
                        className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-4 border border-indigo-600 rounded shadow-sm"
                        onClick={handleLogin}
                    >
                        Entrar
                    </button>
                </div>
            </div>
        </div>
	)
}