import React, { useState, useEffect, useContext, createContext } from 'react'

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
	const [user, setUser] = useState(null)

	// Wrap any auth methods we want to use making sure ...
	// ... to save the user to state.
	const signin = (email, password) => {
		return firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((response) => {
				setUser(response.user)
				return response.user
			})
	}

	const signout = () => {
		return firebase
			.auth()
			.signOut()
			.then(() => {
				setUser(false)
			})
	}


	// Subscribe to user on mount
	// Because this sets state in the callback it will cause any ...
	// ... component that utilizes this hook to re-render with the ...
	// ... latest auth object.
	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				setUser(user)
			} else {
				setUser(false)
			}
		})

		// Cleanup subscription on unmount
		return () => unsubscribe()
	}, [])

	// Return the user object and auth methods
	return { user, signin, signout }
}
