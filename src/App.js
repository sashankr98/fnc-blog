import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import HomePage from './components/HomePage';
import './App.css';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Switch>
                        <Redirect exact path="/" to="/blog" />
                        <Route path="/blog" component={HomePage} />
                    </Switch>
                </div>
            </Router>
        )
    }
}



export default App;
