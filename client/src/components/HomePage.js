import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';

import PostsView from './PostsView';
import AboutView from './AboutView';
import './styles/HomePage.css';

class HomePage extends React.Component {
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
                <div className="home-page">
                    <header className="nav-bar">
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
                        <Route path="/posts" component={PostsView} />
                        <Route path="/about" component={AboutView} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default HomePage;