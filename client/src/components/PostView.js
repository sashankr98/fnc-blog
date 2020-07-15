import React from 'react';
import ReactMarkdown from 'react-markdown';
import Toast from './Toast';
import './styles/PostView.css';

class PostView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tite: "",
			content: "",
			message: ""
		}

		this.deleteClicked = this.deleteClicked.bind(this);
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

	getPost = async () => {
		const url = `/api/getPost?pid=${this.props.match.params.pid}`;
		const res = await fetch(url);
		const resBody = res.json();

		if (res.status !== 200) throw Error(resBody.message);

		return resBody;
	}

	deletePost = async () => {
		const url = '/api/deletePost';
		const data = {
			pid: this.props.match.params.pid
		};

		const response = await fetch(url, {
			method: 'DELETE',
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify(data)
		});
		const body = await response.json();
		console.log(body);
	}

	deleteClicked() {
		if (window.confirm(`Are you sure you want to delete post with pid: ${this.props.match.params.pid}?`)) {
			this.deletePost().then(() => {
				this.setState({
					message: "Post deleted"
				});
			});
		}
	}

	shareClicked() {
		navigator.clipboard.writeText(window.location.href);
		this.setState({
			message: "URL copied to clipboard"
		});
	}

	render() {
		return (
			<div className="post-view">
				<h1>{this.state.title}</h1>
				<ReactMarkdown>{this.state.content}</ReactMarkdown>
				<hr />
				<div className="actions">
					{
						this.props.admin ? (
							<ul className="actions-list">
								<li onClick={this.deleteClicked}>Delete</li>
							</ul>)
							: (<ul className="actions-list">
								<li onClick={this.shareClicked}>Share</li>
							</ul>)
					}
					<Toast message={this.state.message} />
				</div>
			</div>
		);
	}
}

PostView.defaultProps = {
	admin: false
}

export default PostView;