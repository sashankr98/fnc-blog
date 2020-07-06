import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';

import HomePage from './components/HomePage';
import PrivateRoute from './components/PrivateRoute'
import PostEditor from './components/PostEditor';
import AuthForm from './components/AuthForm';
import { AuthContext } from './components/utils/auth';
import './App.css';

class App extends React.Component {
	render() {
		return (
			<AuthContext.Provider value={false}>
				<Router>
					<div className="App">
						<Switch>
							<PrivateRoute path="/editor" component={PostEditor} />
							<Route path="/login" component={() => <AuthForm use="Login" />} />
							<Route path="/signup" component={() => <AuthForm use="Sign Up" />} />
							<Route path="/" component={HomePage} />
						</Switch>
					</div>
				</Router>
			</AuthContext.Provider>
		)
	}
}



export default App;
