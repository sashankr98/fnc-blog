import React from 'react';
import { NavLink, Switch } from 'react-router-dom';
import './styles/NavBar.css';
import PostList from './PostList';
import PostEditor from './PostEditor';
import PrivateRoute from './PrivateRoute';

class AdminPage extends React.Component {
    render() {
        const url = this.props.match.url;
        const path = this.props.match.path;
        return (
            <div className="admin-page">
                <header className="nav-bar">
                    <h1>Admin Page</h1>
                    <ul className="pages">
                        <li value="posts">
                            <NavLink
                                to={`${url}/posts`}
                                activeClassName='focused'>
                                Posts
                        </NavLink>
                        </li>
                        <li value="editor">
                            <NavLink
                                to={`${url}/editor`}
                                activeClassName='focused'>
                                Editor
                        </NavLink>
                        </li>
                    </ul>
                </header>
                <Switch>
                    <PrivateRoute
                        path={`${path}/posts`}
                        component={(props) => <PostList {...props} admin={true} />} />
                    <PrivateRoute path={`${path}/editor`} component={PostEditor} />
                </Switch>

            </div>
        )
    }
}

export default AdminPage;