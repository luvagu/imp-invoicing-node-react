import { Route, Redirect } from 'react-router-dom'
import { useAuth } from "../hooks/useAuth"

export default function PrivateRoute({ component: Component, ...rest }) {
	const auth = useAuth()

	return (
		<Route
			{...rest}
			render={(props) => auth.token
                ? (<Component {...props} user={auth.token.displayName} />) 
                : (<Redirect to={{ pathname: '/entrar', state: { from: props.location } }} />)
			}
		/>
	)
}
