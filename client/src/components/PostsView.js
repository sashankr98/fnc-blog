import React from 'react';
import './PostsView.css';

class PostView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            text: ""
        }
    }

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ text: res.express }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const res = await fetch('/api/hello');
        const body = await res.json();
        if (res.status !== 200) throw Error(body.message);

        return body;
    };
    render() {
        return (
            <h2>{this.state.text}</h2>
        );
    }
}

export default PostView;