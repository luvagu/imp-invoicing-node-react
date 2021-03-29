import { useContext, createContext, useState } from 'react'

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect,
	useHistory,
	useLocation,
} from 'react-router-dom'

// This example has 3 pages: a public page, a protected
// page, and a login screen. In order to see the protected
// page, you must first login. Pretty standard stuff.
//
// First, visit the public page. Then, visit the protected
// page. You're not yet logged in, so you are redirected
// to the login page. After you login, you are redirected
// back to the protected page.
//
// Notice the URL change each time. If you click the back
// button at this point, would you expect to go back to the
// login page? No! You're already logged in. Try it out,
// and you'll see you go back to the page you visited
// just *before* logging in, the public page.

export default function AuthExample() {
	return (
		<AuthProvider>
			<Router>
				<div>
					<AuthButton />

					<ul>
						<li>
							<Link to="/public">Public Page</Link>
						</li>
						<li>
							<Link to="/protected">Protected Page</Link>
						</li>
					</ul>

					<Switch>
						<Route path="/public">
							<PublicPage />
						</Route>
						<Route path="/login">
							<LoginPage />
						</Route>
						<PrivateRoute path="/protected">
							<ProtectedPage />
						</PrivateRoute>
					</Switch>
				</div>
			</Router>
		</AuthProvider>
	)
}

const fakeAuth = {
	isAuthenticated: false,
	signin(cb) {
		fakeAuth.isAuthenticated = true
		setTimeout(cb, 100) // fake async
	},
	signout(cb) {
		fakeAuth.isAuthenticated = false
		setTimeout(cb, 100)
	},
}

/** For more details on
 * `authContext`, `AuthProvider`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
const AuthContext = createContext()

function AuthProvider({ children }) {
	const auth = useProvideAuth()
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

function useAuth() {
	return useContext(AuthContext)
}

function useProvideAuth() {
	const [user, setUser] = useState(null)

	const signin = (cb) => {
		return fakeAuth.signin(() => {
			setUser('user')
			cb()
		})
	}

	const signout = (cb) => {
		return fakeAuth.signout(() => {
			setUser(null)
			cb()
		})
	}

	return { user, signin, signout }
}

function AuthButton() {
	let history = useHistory()
	let auth = useAuth()

	return auth.user ? (
		<p>
			Welcome!{' '}
			<button
				onClick={() => {
					auth.signout(() => history.push('/'))
				}}
			>
				Sign out
			</button>
		</p>
	) : (
		<p>You are not logged in.</p>
	)
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
	let auth = useAuth()
	return (
		<Route
			{...rest}
			render={({ location }) => auth.user 
                ? (children) 
                : (<Redirect to={{ pathname: '/ingresar', state: { from: location } }} />)
			}
		/>
	)
}

function PublicPage() {
	return <h3>Public</h3>
}

function ProtectedPage() {
	return <h3>Protected</h3>
}

function LoginPage() {
	let history = useHistory()
	let location = useLocation()
	let auth = useAuth()

	let { from } = location.state || { from: { pathname: '/' } }
	let login = () => {
		auth.signin(() => { history.replace(from) })
	}

	return (
		<div>
			<p>You must log in to view the page at {from.pathname}</p>
			<button onClick={login}>Log in</button>
		</div>
	)
}
