import { useState, useEffect, useContext, createContext } from 'react'
import { createToken, deleteToken, renewToken } from '../api/helpers'
import useLocalStorage from './useLocalStorage'

const AuthProvider = createContext()

// Provider component that wraps your app and makes auth object
// available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
	const auth = useProvideAuth()
	return <AuthProvider.Provider value={auth}>{children}</AuthProvider.Provider>
}

// Hook for child components to get the auth object and re-render when it changes.
export const useAuth = () => {
	return useContext(AuthProvider)
}

// Provider hook that creates auth object and handles state
function useProvideAuth() {
	const [localToken, setLocalToken] = useLocalStorage('impSessionToken')
	// const [token, setToken] = useState(localToken ? localToken : null)
	const [token, setToken] = useState(null)
	const [expiresIn, setExpiresIn] = useState(0)

	// Wrap any auth methods we want to use making sure ...
	// ... to save the user to state.
	const signIn = async (user, password, cb) => {
		try {
			const token = await createToken({ user, password })
			setLocalToken(token)
			setToken(token)
			setExpiresIn(token.expires)
			cb()
		} catch (error) {
			console.log(error.response?.data.error)
		}
	}

	const signOut = async (cb) => {
		try {
			await deleteToken(token.id)
		} catch (error) {
			console.log(error.response?.data.error)
		} finally {
			setToken(null)
			setLocalToken('')
			setExpiresIn(0)
			cb()
		}
	}

	// const tokenRenewal = async (token) => {
	// 	try {
	// 		const newToken = await renewToken({ id: token.id, extend: true })
	// 		console.log('renewToken', newToken)
	// 		setLocalToken(newToken)
	// 		setToken(newToken)
	// 		setExpiresIn(newToken.expires)
	// 	} catch (error) {
	// 		console.log(error.response?.data.error)
	// 		setLocalToken('')
	// 	}
	// }

	// Renew token 1 min before it expires
	useEffect(() => {
		if (expiresIn === 0 || expiresIn < Date.now()) return

		const interval = setInterval(() => {
			console.log('This will run every >>>!', (expiresIn - (1000 * 60)) - Date.now())
			console.log('token', token)
			// tokenRenewal(token)
			renewToken({ id: token.id, extend: true })
				.then(newToken => {
					console.log('newToken', newToken)
					setLocalToken(newToken)
					setToken(newToken)
					setExpiresIn(newToken.expires)
				})
				.catch(error => {
					console.log(error.response?.data.error)
					setLocalToken('')
				})
		}, (expiresIn - (1000 * 60)) - Date.now())

		return () => clearInterval(interval)
	  }, [expiresIn, token])

	  // Auto login if local token is valid
	useEffect(() => {
		if (!localToken) return

		console.log('localToken', localToken)
		console.log('token', token)
		const unsubscribe = renewToken({ id: localToken.id, extend: true })
			.then(newToken => {
				console.log('newToken', newToken)
				// setLocalToken(newToken)
				if (newToken) {
					setToken(newToken)
					setExpiresIn(newToken.expires)
				} else {
					setToken(null)
					setExpiresIn(0)
				}
			})
			.catch(error => {
				console.log(error.response?.data.error)
				setLocalToken('')
			})

		return () => unsubscribe
	}, [])

	// Return the user object and auth methods
	return { token, signIn, signOut }
}
