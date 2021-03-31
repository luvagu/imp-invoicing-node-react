import { useState } from 'react'
import { Redirect, useHistory, useLocation } from 'react-router-dom'
import { useAuth } from "../hooks/useAuth"

import Input from '../components/Input'
import Spinner from '../components/Spinner'

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

	const handleLogin = (e) => {
        e.preventDefault()

        if (!user || !password) return
        auth.signIn(credentials, () => { history.replace(from) })
    }

	return auth.token ? (<Redirect to={from} />) : (
		<div className="container sm:sm-mw md:md-mw lg:lg-mw mx-auto px-4 md:px-6 py-4 md:py-6">
            <h3 className="text-black text-3xl font-medium">Entrar</h3>

            <div className="flex flex-col mt-6">
                <p className="mb-4">Debes iniciar sesión para ir a {from.pathname}</p>

                <form 
                    className="w-full sm:w-64 mb-4"
                    onSubmit={handleLogin}
                >
                    <Input extraClass='mb-4' name='user' placeholder='Usuario' onChange={handleChange} />
                    <Input extraClass='mb-4' type='password' name='password' placeholder='Contraseña' onChange={handleChange} />
                    <div className="flex items-center">
                       <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-4 border border-indigo-600 rounded shadow-sm"
                        >
                            Entrar
                        </button>
                        {auth.isLoading && <div className="ml-4"><Spinner /></div>} 
                    </div>
                </form>

                {auth.errorMsg && (<div className="mt-6 px-4 text-center text-sm text-red-600 font-semibold uppercase">{auth.errorMsg}</div>)}
            </div>
        </div>
	)
}
