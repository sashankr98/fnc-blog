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
        const path = `/blog/posts/${this.props.match.params.pid}.md`;
        this.getPost(path)
            .then(res => this.setState({
                title: res[0].title,
                content: res
            }))
            .catch(err => console.log(err));
    }

    getPost = async (path) => {
        const res = await fetch(path);
        const resBody = res.text();

        if (res.status !== 200) throw Error(resBody.message);

        return resBody;
    }

    render() {
        return (
        <div className="post-view">
            <h1>{this.state.title}</h1>
            <ReactMarkdown transformImageUri={(src) => `${process.env.PUBLIC_URL}/blog/images/${src}`}>
                {this.state.content}
            </ReactMarkdown>
            <hr />
        </div>)
    }
}
export default PostView;