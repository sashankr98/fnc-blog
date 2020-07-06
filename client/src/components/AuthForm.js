import React from 'react';

import './styles/AuthForm.css';

class AuthForm extends React.Component {
    render() {
        return (
            <div className="auth-form">
                <h2>{this.props.use}</h2>
                <form className="auth-inputs">
                    <input type="text" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default AuthForm;