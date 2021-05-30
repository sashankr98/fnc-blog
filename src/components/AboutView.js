import React from 'react';
import ReactMarkdown from 'react-markdown'

import './styles/AboutView.css';

class AboutView extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			about: ""
		}
	}

	componentDidMount() {
		fetch('/about.md')
		.then(res => res.text())
		.then(text => this.setState({ about: text }))
		.catch(err => console.error(err));
	}

	render() {
		return (
			<div className='about'>
				<ReactMarkdown>{this.state.about}</ReactMarkdown>
			</div>
		)
	}
}

export default AboutView;