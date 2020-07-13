import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

class App extends React.Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Switch>
						<Redirect exact path="/" to="/blog" />
						<Route path="/blog" component={HomePage} />
						<PrivateRoute path="/admin" component={AdminPage} />
					</Switch>
				</div>
			</Router>
		)
	}
}



export default App;
