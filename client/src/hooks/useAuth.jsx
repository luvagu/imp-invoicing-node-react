import { useState, useEffect, useContext, createContext } from 'react'
import { createToken, deleteToken, renewToken } from '../api/helpers'
import useLocalStorage from './useLocalStorage'

const AuthProvider = createContext()

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
	const auth = useProvideAuth()
	return <AuthProvider.Provider value={auth}>{children}</AuthProvider.Provider>
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
	return useContext(AuthProvider)
}

// Provider hook that creates auth object and handles state
function useProvideAuth() {
	const [localToken, setLocalToken] = useLocalStorage('impSessionToken')
	const [token, setToken] = useState(localToken ? localToken : null)
	const [expiresIn, setExpiresIn] = useState(0)

	// Wrap any auth methods we want to use making sure ...
	// ... to save the user to state.
	const signIn = (user, password, cb) => {
		return createToken({ user, password })
			.then(token => {
				setLocalToken(token)
				setToken(token)
				setExpiresIn(token.expires)
				cb()
				return token
			})
			.catch(error => console.log(error.response?.data.error))
	}

	const signOut = (cb) => {
		return deleteToken(token.id)
			.then(res => console.log(res))
			.catch(error => console.log(error.response?.data.error))
			.finally(() => {
				cb()
				setToken(null)
				setLocalToken('')
				setExpiresIn(0)
			})
	}


	// Auto login if local token is valid
	useEffect(() => {
		if (!localToken) return

		const unsubscribe = renewToken({ id: localToken.id, extend: false })
			.then(token => {
				console.log('renewToken', token)
				setLocalToken(token)
				// setToken(token)
				setExpiresIn(token.expires)
			})

		return () => unsubscribe()
	}, [localToken])

	useEffect(() => {
		if (expiresIn === 0) return
		const interval = setInterval(() => {
		  console.log('This will run every >>>!', expiresIn)
		}, (expiresIn - (1000 * 60)) - Date.now())
		return () => clearInterval(interval)
	  }, [expiresIn])

	// Return the user object and auth methods
	return { token, signIn, signOut }
}
