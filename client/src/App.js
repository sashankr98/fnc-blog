import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';

import HomePage from './components/HomePage';
import PostEditor from './components/PostEditor';
import './App.css';

class App extends React.Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Switch>
						<Route path="/editor" component={PostEditor} />
						<Route path="/" component={HomePage} />
					</Switch>
				</div>
			</Router>
		)
	}
}

export default App;
