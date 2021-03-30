import { useState, useEffect, useContext, createContext } from 'react'
import { createToken, deleteToken, renewToken } from '../api/helpers'
import useLocalStorage from './useLocalStorage'

const AuthProvider = createContext()

// Provider component, child components can call useAuth()
export function ProvideAuth({ children }) {
	const auth = useProvideAuth()
	return (<AuthProvider.Provider value={auth}>{children}</AuthProvider.Provider>)
}

// Hook auth object to re-render child when it changes
export const useAuth = () => {
	return useContext(AuthProvider)
}

// Provider hook that creates an auth object and handles state
function useProvideAuth() {
	const [errorMsg, setErrorMsg] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [localToken, setLocalToken] = useLocalStorage('impSessionToken')
	const [token, setToken] = useState(null)
	const [expiresIn, setExpiresIn] = useState(0)

	// Save token to state and redirect
	const signIn = async (credentials, redirect) => {
		setIsLoading(true)
		try {
			const token = await createToken(credentials)
			setLocalToken(token)
			setToken(token)
			setExpiresIn(token.expires)
			redirect()
		} catch (error) {
			console.error(error.response?.data.error)
		}
		setIsLoading(false)
	}

	// Destroy token, localToken, server token and redirect
	const signOut = async (redirect) => {
		try {
			await deleteToken(token.id)
		} catch (error) {
			console.error(error.response?.data.error)
		} finally {
			setToken(null)
			setLocalToken('')
			setExpiresIn(0)
			redirect()
		}
	}

	// Renew token 1 min before it expires
	useEffect(() => {
		if (expiresIn === 0 || expiresIn < Date.now() || !token) return

		const interval = setInterval(() => {
			// console.log('This will run every >>>!', expiresIn - (1000 * 60) - Date.now())

			// renewToken({ id: token.id, extend: true })
			// 	.then((newToken) => {
			// 		setLocalToken(newToken)
			// 		setToken(newToken)
			// 		setExpiresIn(newToken.expires)
			// 	})
			// 	.catch((error) => {
			// 		console.error(error.response?.data.error)
			// 		setLocalToken('')
			// 	})

			// Renew token api call
			(async () => {
				try {
					const newToken = await renewToken({ id: token.id, extend: true })
					setLocalToken(newToken)
					setToken(newToken)
					setExpiresIn(newToken.expires)
				} catch (error) {
					console.error(error.response?.data.error)
					setToken(null)
					setLocalToken('')
					setExpiresIn(0)
				}
			})()

		}, expiresIn - (1000 * 60) - Date.now())

		return () => clearInterval(interval)
	}, [expiresIn, token])

	// Try auto login if localToken exists
	useEffect(() => {
		if (!localToken) return
		
		const unsubscribe = renewToken({ id: localToken.id, extend: true })
			.then((newToken) => {
				if (newToken) {
					setToken(newToken)
					setExpiresIn(newToken.expires)
				} else {
					setToken(null)
				}
			})
			.catch((error) => {
				console.error(error.response?.data.error)
				setLocalToken('')
			})

		return () => unsubscribe
	}, [])

	// Return the auth object, auth methods and related state
	return { errorMsg, isLoading, token, signIn, signOut }
}
