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

import { ProvideAuth, useAuth } from '../hooks/useAuth'

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
		<ProvideAuth>
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
						<Route path="/ingresar">
							<LoginPage />
						</Route>
						<PrivateRoute path="/protected">
							<ProtectedPage />
						</PrivateRoute>
					</Switch>
				</div>
			</Router>
		</ProvideAuth>
	)
}

/** For more details on
 * `authContext`, `AuthProvider`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */



function AuthButton() {
	let history = useHistory()
	let auth = useAuth()

	console.log(auth)

	return auth.token ? (
		<p>
			Welcome!{' '}
			<button
				onClick={() => {
					auth.signOut(() => history.push('/'))
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

	console.log(auth)

	return (
		<Route
			{...rest}
			render={({ location }) => auth.token 
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

	console.log(auth)

	let { from } = location.state || { from: { pathname: '/' } }
	let login = () => auth.signIn('admin', '9792', () => { history.replace(from) })

	return (
		<div>
			<p>You must log in to view the page at {from.pathname}</p>
			<button onClick={login}>Log in</button>
		</div>
	)
}
