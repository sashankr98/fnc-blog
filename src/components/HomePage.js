import React from 'react';
import {
	Switch,
	Route,
	Link,
	NavLink,
	Redirect
} from 'react-router-dom';

import PostList from './PostList';
import AboutView from './AboutView';
import './styles/NavBar.css';

class HomePage extends React.Component {
	render() {
		const url = this.props.match.url;
		const path = this.props.match.path;
		return (
			<div className="home-page">
				<header className="nav-bar">
					<Link className="head-link" to="/">
						<h1>Stormy Escarpment</h1>
					</Link>
					<ul className="pages">
						<li value="posts">
							<NavLink
								to={`${url}/posts`}
								activeClassName='focused'>
								Posts
								</NavLink>
						</li>
						<li value="about">
							<NavLink
								to={`${url}/about`}
								activeClassName='focused'>
								About
								</NavLink>
						</li>
					</ul>
				</header>
				<Switch>
					<Redirect exact from={`${path}`} to={`${path}/posts`} />
					<Route path={`${path}/posts`} component={PostList} />
					<Route path={`${path}/about`} component={AboutView} />
				</Switch>
			</div>
		);
	}
}

export default HomePage;