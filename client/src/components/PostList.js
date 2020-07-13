import React from 'react';
import {
    Link,
    Switch,
    Route
} from 'react-router-dom'
import './styles/PostList.css';
import PostView from './PostView';
import PrivateRoute from './PrivateRoute';

class PostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        this.getPostList()
            .then(res => this.setState({ list: res }))
            .catch(err => console.log(err));
    }

    getPostList = async () => {
        const res = await fetch('/api/getPostList');
        const body = await res.json();

        if (res.status !== 200) throw Error(body.message);
        return body;
    }

    render() {
        return (
            <Switch>
                <Route
                    exact
                    path={`${this.props.match.url}`}
                    render={() => (
                        this.state.list.map((item) => {
                            const date = new Date(item.date_created);
                            const dateFormat = new Intl.DateTimeFormat('en', {
                                year: 'numeric',
                                month: 'long',
                                day: '2-digit'
                            });
                            const displayDate = dateFormat.format(date);
                            return (
                                <Link
                                    className="post-link"
                                    to={`${this.props.match.url}/${item.pid}`}
                                    value={item.pid}
                                    key={item.pid}>
                                    <span
                                        className="box"
                                        key={item.pid}
                                        value={item.pid}>
                                        <h2>{item.title}</h2>
                                        {displayDate}
                                    </span>
                                </Link>
                            );
                        })
                    )} />
                {
                    this.props.admin ? (
                        <PrivateRoute
                            path={`${this.props.match.path}/:pid`}
                            component={(props) => <PostView {...props} admin={this.props.admin} />} />)
                        : (<Route
                            path={`${this.props.match.path}/:pid`}
                            component={PostView} />)
                }

            </Switch>
        );
    }
}

PostList.defaultProps = {
    admin: false
}

export default PostList;