import React from 'react';
import './PostsView.css';

class PostView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            text: ""
        }

        this.itemClicked = this.itemClicked.bind(this);
    }

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ text: res.express }))
            .catch(err => console.log(err));

        this.testDb()
            .then(res => this.setState({ list: res }))
            .catch(err => console.log(err));

    }

    callApi = async () => {
        const res = await fetch('/api/hello');
        const body = await res.json();
        if (res.status !== 200) throw Error(body.message);

        return body;
    };

    testDb = async () => {
        const res = await fetch('/api/test');
        const body = await res.json();

        if (res.status !== 200) throw Error(body.message);
        return body;
    }

    itemClicked(event) {
        console.log(event.target.value);
    }

    render() {
        return (
            <div>
                <h2>{this.state.text}</h2>
                <ul>
                    {
                        this.state.list.map((item) => {
                            return (
                                <li key={item.id}
                                    value={item.id}
                                    onClick={this.itemClicked}>
                                    {item.msg}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default PostView;