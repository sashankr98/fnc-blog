import React from 'react';
import './styles/PostsView.css';

class PostView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }

        this.itemClicked = this.itemClicked.bind(this);
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

    itemClicked(event) {
        console.log(event.target.value);
    }

    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.list.map((item) => {
                            return (
                                <li key={item.pid}
                                    value={item.pid}
                                    onClick={this.itemClicked}>
                                    {item.title}, {item.date_created.split("T")[0]}
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