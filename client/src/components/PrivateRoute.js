import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// import { AuthContext } from './utils/auth';

class PrivateRoute extends React.Component {
	render() {
		const { component: Component, ...rest } = this.props;
		const isLoggedIn = true;
		return (
			<Route
				{...rest}
				render={props => isLoggedIn ? (<Component {...props} />) : (<Redirect to="/" />)} />
		)
	}
}

// PrivateRoute.contextType = AuthContext;

export default PrivateRoute;