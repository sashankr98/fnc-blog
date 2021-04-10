import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast, Slide } from 'react-toastify';
import toastOptions from './utils/ToastOptions';
import './styles/PostView.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles/Toasts.css';

class PostView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tite: "",
            content: ""
        }
        // this.deleteClicked = this.deleteClicked.bind(this);
        this.shareClicked = this.shareClicked.bind(this);
    }

    componentDidMount() {
        this.getPost()
            .then(res => this.setState({
                title: res[0].title,
                content: res[0].body
            }))
            .catch(err => console.log(err));
    }

    // getPost = async () => {
    //     const url = `/api/getPost?pid=${this.props.match.params.pid}`;
    //     const res = await fetch(url);
    //     const resBody = res.json();

    //     if (res.status !== 200) throw Error(resBody.message);

    //     return resBody;
    // }

    // deletePost = async () => {
    //     const url = '/api/deletePost';
    //     const data = {
    //         pid: this.props.match.params.pid
    //     };

    //     const response = await fetch(url, {
    //         method: 'DELETE',
    //         headers: {
    //             "content-type": "application/json"
    //         },
    //         body: JSON.stringify(data)
    //     });
    //     return response;
    // }

    // deleteClicked() {
    //     if (window.confirm(`Are you sure you want to delete post with pid: ${this.props.match.params.pid}?`)) {
    //         this.deletePost().then((response) => {
    //             if (response.status === 200) {
    //                 history.go(-1);
    //             } else {
    //                 toast('Unable to delete post', {
    //                     ...toastOptions.ERROR,
    //                     toastId: 'delete-fail-toast'
    //                 })
    //             }
    //         });
    //     }
    // }

    shareClicked() {
        navigator.clipboard.writeText(window.location.href);
        toast("URL copied to clipboard", {
            ...toastOptions.DEFAULT,
            toastId: 'share-toast'
        });
    }

    render() {
        return (
            <Switch>
                <Route exact path={`${this.props.match.path}`}
                    render={() => (
                        <div className="post-view">
                            <h1>{this.state.title}</h1>
                            <ReactMarkdown>{this.state.content}</ReactMarkdown>
                            <hr />
                            <div className="actions">
                                {
                                    this.props.admin ? (
                                        <ul className="actions-list">
                                            <li onClick={this.editClicked}>
                                                <Link to={`${this.props.match.url}/edit`}>
                                                    Edit
                                                </Link>
                                            </li>
                                            <li onClick={this.deleteClicked}>Delete</li>
                                        </ul>)
                                        : (<ul className="actions-list">
                                            <li onClick={this.shareClicked}>Share</li>
                                        </ul>)
                                }
                            </div>
                            <ToastContainer transition={Slide} />
                        </div>
                    )} />
            </Switch>
        );
    }
}

PostView.defaultProps = {
    admin: false
}

export default PostView;