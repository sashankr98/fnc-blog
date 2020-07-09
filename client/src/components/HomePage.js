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
import './styles/HomePage.css';

class HomePage extends React.Component {
    render() {
        return (
            <div className="home-page">
                <header className="nav-bar">
                    <Link
                        className="home-link"
                        to="/">
                        <h1>Friendly Neighbourhood Cucumber</h1>
                    </Link>

                    <ul id="pages">
                        <li value="Posts">
                            <NavLink
                                to="/posts"
                                // to={`${this.props.match.url}/posts`}
                                activeClassName='focused'>
                                Posts
                                </NavLink>
                        </li>
                        <li value="About">
                            <NavLink
                                to="/about"
                                // to={`${this.props.match.url}/about`}
                                activeClassName='focused'>
                                About
                                </NavLink>
                        </li>
                    </ul>
                </header>
                <Switch>
                    <Redirect exact from="/" to="/posts" />
                    <Route path="/posts" component={PostList} />
                    <Route path="/about" component={AboutView} />
                </Switch>
            </div>
        );
    }
}

export default HomePage;