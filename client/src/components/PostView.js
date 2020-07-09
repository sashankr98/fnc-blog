import React from 'react';
import ReactMarkdown from 'react-markdown';
import './styles/PostView.css';

class PostView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tite: "",
            content: ""
        }
    }

    componentDidMount() {
        this.getPost()
            .then(res => this.setState({
                title: res[0].title,
                content: res[0].body
            }))
            .catch(err => console.log(err));
    }

    getPost = async () => {
        const url = `/api/getPost?pid=${this.props.match.params.pid}`;
        const res = await fetch(url);
        const resBody = res.json();

        if (res.status !== 200) throw Error(resBody.message);

        return resBody;
    }

    render() {
        return (
            <div className="post-view">
                <h1>{this.state.title}</h1>
                <ReactMarkdown>{this.state.content}</ReactMarkdown>
            </div>
        );
    }
}

export default PostView;