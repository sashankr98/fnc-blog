import React from 'react';
import './App.css';

import Navbar from './components/Navbar';
import PageView from './components/PageView';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'About'
    };
  }

  handlePageClick(page) {
    this.setState({
      view: page
    });
  }

  render() {
    var self = this;
    return (
      <div className="App">
        <header className="App-header">
          <Navbar pages={['Posts', 'About']} focused={this.state.view} onPageClick={self.handlePageClick.bind(self)} />
        </header>
        <PageView page={this.state.view} />
      </div>
    )
  }
}

export default App;
