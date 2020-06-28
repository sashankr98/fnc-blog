import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect
} from 'react-router-dom';

import AboutView from './components/AboutView';
import PostEditor from './components/PostEditor';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			view: 'Posts'
		};

		this.setFocus = this.setFocus.bind(this);
	}

	setFocus(event) {
		this.setState({
			view: event.target.innerText
		});
	}

	render() {
		return (
			<Router>
				<div className="App">
					<header className="App-header">
						<h1>Friendly Neighbourhood Cucumber</h1>
						<ul id="pages">
							<li value="Posts">
								<Link
									to="/posts"
									className={this.state.view === 'Posts' ? 'focused' : null}
									onClick={this.setFocus}>Posts</Link>
							</li>
							<li value="About">
								<Link
									to="/about"
									className={this.state.view === 'About' ? 'focused' : null}
									onClick={this.setFocus}>About</Link>
							</li>
						</ul>
					</header>

					<Switch>
						<Redirect exact from="/" to="/posts" />
						<Route path="/posts">
							<h2>Posts Selected</h2>
						</Route>
						<Route path="/about">
							<AboutView />
						</Route>
						<Route path="/editor">
							<PostEditor />
						</Route>
					</Switch>
				</div>
			</Router>
		)
	}
}

export default App;
