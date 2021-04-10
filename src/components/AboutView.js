import React from 'react';

import './styles/AboutView.css';
import facebook from './icons/facebook.svg';
import twitter from './icons/twitter.svg';
import github from './icons/github.svg';
import linkedin from './icons/linkedin.svg';
import instagram from './icons/instagram.svg';


class AboutView extends React.Component {
	render() {
		return (
			<div className='About'>
				<p>I started this blog because I wanted to become a better writer but it wasn't just for that. There are quite a few random things that I'd talk to my friends about. We'd analyze arbitrary topics to death and I always enoyed those analyses. The second reason I started this blog was to try and have such discussions with myself and write it all down. Hopefully, people enjoy reading it as much as I enjoyed creating it.</p>
				<p>The name <em>Friendly Neighbourhood Cucumber</em> was just the name I decided for my twitter account. There isn't any backstory to it.</p>
				<p id='social-intro'>You can find me on any of these social media</p>
				<footer>
					<ul id='social'>
						<li>
							<a href='https://www.facebook.com/sashank.ramachandran'>
								<img src={facebook} alt='facebook logo' />
							</a>
						</li>
						<li>
							<a href='https://www.instagram.com/sashanktho/'>
								<img src={instagram} alt='instagram logo' />
							</a>
						</li>
						<li>
							<a href='https://twitter.com/sashorcard'>
								<img src={twitter} alt='twitter logo' />
							</a>
						</li>
						<li>
							<a href='https://github.com/sashankr98'>
								<img src={github} alt='github logo' />
							</a>
						</li>
						<li>
							<a href='https://www.linkedin.com/in/sashank-ramachandran-1096b313a/'>
								<img src={linkedin} alt='linkedin logo' />
							</a>
						</li>
					</ul>
					<div id='credit'>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
				</footer>
			</div>
		)
	}
}

export default AboutView;